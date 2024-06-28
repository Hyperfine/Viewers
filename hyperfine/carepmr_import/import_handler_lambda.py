# Lambda function for uploading DICOM files from S3 to dicom-web target
import logging
import os
import urllib.parse
from io import BufferedRandom, BytesIO
import boto3
import uuid
from typing import Dict
from pydicom import dcmread
from pydicom.dataset import Dataset
import requests


root = logging.getLogger()
if root.handlers:
    for handler in root.handlers:
        root.removeHandler(handler)
logging.basicConfig(format="%(asctime)s %(message)s", level=logging.INFO)
logger = logging.getLogger(__name__)

# log = logging.getLogger("urllib3")
# log.setLevel(logging.DEBUG)


s3 = boto3.client("s3")

PMR_SERIAL_NUMBERS = os.getenv("PMR_SERIAL_NUMBERS", "Missing")
DICOM_WEB_URL = os.getenv("DICOM_WEB_URL", "Missing")

DICOM_RETREIVE_URL_TAG = "00081190"
DICOM_REFERENCED_SOP_SEQUENCE_TAG = "00081199"
DICOM_REFERENCED_SOP_CLASS_UID_TAG = "00081150"
DICOM_REFERENCED_SOP_INSTANCE_UID_TAG = "00081155"


def get_serial_numbers():
    """Returns list of serial numbers which will be pushed
    to DICOM target.
    """
    return PMR_SERIAL_NUMBERS.split(",")


def upload_dicom(ds: Dataset, dicomweb_url: str, access_token: str = None) -> str:
    """Uploads a single DICOM Dataset to the specified dicom-web URL.

    If an access token is specified it is put into HTTP header.

    Args:
        ds (Dataset): Any valid DICOM object
        dicomweb_url (str): http/https url to the dicom-web service.
        access_token (str): Security token for accessing the URL.

    Raises:
        RuntimeError: _description_


    Returns:
        str: SOPInstanceUID of input dataset returned by the server.
    """

    boundary = str(uuid.uuid4())  # The boundary is a random UUID
    body = bytearray()

    with BytesIO() as buffer:

        ds.save_as(buffer, write_like_original=False)
        buffer.seek(0)

        content = buffer.read()
        body += bytearray("--%s\r\n" % boundary, "ascii")
        body += bytearray("Content-Length: %d\r\n" % len(content), "ascii")
        body += bytearray("Content-Type: application/dicom\r\n\r\n", "ascii")
        body += content
        body += bytearray("\r\n", "ascii")
        body += bytearray("--%s--" % boundary, "ascii")

        headers = {
            "Content-Type": "multipart/related; type=application/dicom; boundary=%s"
            % boundary,
            "Accept": "application/json",
        }

        def gen():
            chunkSize = 1024 * 1024

            l = len(body) // chunkSize
            for i in range(l):
                pos = i * chunkSize
                yield body[pos: pos + chunkSize]

            if len(body) % chunkSize != 0:
                yield body[l * chunkSize:]

        response = requests.post(dicomweb_url, data=gen(), headers=headers)
        if response.status_code != 200:
            logger.error(f'Upload to {dicomweb_url} failed {response.status_code} {response.reason} {response.text}')
            raise RuntimeError("Upload failed")
        else:
            return response.json()


def extract_sop_instance_from_response(response: Dict):
    """Returns the uploaded SOPInstanceUID from the server response.

    Assumes there is only one SOPInstanceUID in the upload.

    Args:
        response (Dict): JSON dictionary from server response.

    Returns:
        str: DICOM SOPInstanceUID of upload
    """
    referenced_sop_sequence = response[DICOM_REFERENCED_SOP_SEQUENCE_TAG]['Value']
    referenced_sop_instance_uid = referenced_sop_sequence[0][DICOM_REFERENCED_SOP_INSTANCE_UID_TAG]
    sop_instance_uid = referenced_sop_instance_uid['Value'][0]
    return sop_instance_uid

def read_dcm_from_memory(in_memory_file: BufferedRandom) -> Dataset:
    """Returns a pydicom Dataset from an in-memory buffer.

    Args:
        in_memory_file (BufferedRandom): binary object from S3

    Raises:
        DICOMReadException: If object can not be parsed.

    Returns:
        Dataset: valid pyDICOM dataset.
    """
    try:
        dataset = dcmread(BytesIO(in_memory_file))
        return dataset
    except Exception as err:
        logger.error(f"DICOM read failure for file {in_memory_file}: {err}")
        logger.exception(err)
        raise RuntimeError("DICOM I/O parsing error")


def get_dicom_from_event(s3_client, event) -> Dataset:
    """Returns DICOM object from S3.

    Args:
        s3_client (_type_): S3 Client
        event (_type_): AWS Event generated by S3 trigger.

    Returns:
        Dataset: DICOM Object
    """
    bucket = event["Records"][0]["s3"]["bucket"]["name"]
    key = urllib.parse.unquote_plus(
        event["Records"][0]["s3"]["object"]["key"], encoding="utf-8"
    )
    s3_object = s3_client.get_object(Bucket=bucket, Key=key)
    file_content = s3_object["Body"].read()
    ds = read_dcm_from_memory(file_content)
    return ds


def is_carepmr_image(ds: Dataset) -> bool:
    """Returns True if the object should be forwarded to
    the CarePMR PACS; otherwise False.

    Args:
        ds (Dataset): Candidate DICOM object

    Returns:
        bool: True if the object's device serial number
        matches one of the serial numbers specified
        in an environment variable.
    """
    serial_number = ds.DeviceSerialNumber
    serial_number_dictionary = get_serial_numbers()
    if serial_number in serial_number_dictionary:
        return True
    else:
        return False


def lambda_handler(event, context):

    try:

        ds = get_dicom_from_event(s3, event)
        serial_number = ds.DeviceSerialNumber
        logger.info(f"DeviceSerialNumber = {serial_number}")

        if is_carepmr_image(ds):
            logger.info("Match - this is a CarePMR study")
            response = upload_dicom(ds, DICOM_WEB_URL)
            if not response:
                logger.error("upload_dicom failed")
                return None
            else:
                sop_instance = extract_sop_instance_from_response(response)
                logger.info(f'Uploaded {sop_instance}')
                return {"SOPInstanceUID": sop_instance}
        else:
            logger.info("This is not a CarePMR study")
            return None

    except Exception as e:
        logger.exception(e)
        bucket = event["Records"][0]["s3"]["bucket"]["name"]
        key = urllib.parse.unquote_plus(
            event["Records"][0]["s3"]["object"]["key"], encoding="utf-8"
        )
        logger.error(
            "Error uploading object {} from bucket {} to PACS.".format(key, bucket)
        )
        raise e
    return None


if __name__ == "__main__":  # For local testing only

    filename = "tests/data/2.25.127421887010676750942174422891255180378.dcm"
    filename = "case8_t2.dcm"
    # filename = "tests/data/1.3.6.1.4.1.5962.99.1.2256093408.737520867.1651523567840.64.0.dcm"
    ds = dcmread(filename)
    # server_url = "https://pacs-server.dev-sean.hyperfine-research-dev.com/pacs/dicom-web"
    server_url = "http://127.0.0.1/pacs/dicom-web/studies"
    response = upload_dicom(ds, server_url)
    sop_instance = extract_sop_instance_from_response(response)
    print(f'sop_instance {sop_instance}')




# Below is a sample successful return from dicom-web STOW-RS request.
# {
#         "00080005" :
#         {
#                 "Value" :
#                 [
#                         "ISO_IR 100"
#                 ],
#                 "vr" : "CS"
#         },
#         "00081190" :
#         {
#                 "Value" :
#                 [
#                         "http://127.0.0.1/dicom-web/studies/1.2.826.0.1.3680043.8.498.12023435223600644165424944494788319417"
#                 ],
#                 "vr" : "UR"
#         },
#         "00081198" :
#         {
#                 "vr" : "SQ"
#         },
#         "00081199" :
#         {
#                 "Value" :
#                 [
#                         {
#                                 "00081150" :
#                                 {
#                                         "Value" :
#                                         [
#                                                 "1.2.840.10008.5.1.4.1.1.4.1"
#                                         ],
#                                         "vr" : "UI"
#                                 },
#                                 "00081155" :
#                                 {
#                                         "Value" :
#                                         [
#                                                 "1.2.826.0.1.3680043.8.498.59223928071708804422539823962057641315"
#                                         ],
#                                         "vr" : "UI"
#                                 },
#                                 "00081190" :
#                                 {
#                                         "Value" :
#                                         [
#                                                 "http://127.0.0.1/dicom-web/studies/1.2.826.0.1.3680043.8.498.12023435223600644165424944494788319417/series/1.2.826.0.1.3680043.8.498.11114089250946458457808303676827847028/instances/1.2.826.0.1.3680043.8.498.59223928071708804422539823962057641315"
#                                         ],
#                                         "vr" : "UR"
#                                 }
#                         }
#                 ],
#                 "vr" : "SQ"
#         }
# }
