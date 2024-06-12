import json
import logging
import os
import urllib.parse
from io import BufferedRandom, BytesIO

import boto3
from pydicom import dcmread
from pydicom.dataset import Dataset
from pynetdicom import AE, StoragePresentationContexts

root = logging.getLogger()
if root.handlers:
    for handler in root.handlers:
        root.removeHandler(handler)
logging.basicConfig(format="%(asctime)s %(message)s", level=logging.INFO)

logger = logging.getLogger(__name__)

s3 = boto3.client("s3")

ASSOCIATION_TIMEOUT_SECONDS = 10
DIMSE_TIMEOUT_SECONDS = 20

CSTORE_CALLED_AET = "CSTORE_CALLED_AET"
CSTORE_CALLING_AET = "CSTORE_CALLING_AET"
CSTORE_PORT = "CSTORE_PORT"
CSTORE_HOST = "CSTORE_HOST"

PMR_SERIAL_NUMBERS = "PMR_SERIAL_NUMBERS"
serial_number_dictionary = os.getenv(PMR_SERIAL_NUMBERS, "").split(",")


def create_association(calling_aet, addr, port, called_aet):
    logger.info(
        f"Creating DIMSE Association {calling_aet}, {called_aet}, {addr}, {port}"
    )
    ae = AE(ae_title=calling_aet)
    ae.connection_timeout = ASSOCIATION_TIMEOUT_SECONDS
    ae.network_timeout = ASSOCIATION_TIMEOUT_SECONDS
    ae.requested_contexts = StoragePresentationContexts

    # Request association with remote
    ae.dimse_timeout = DIMSE_TIMEOUT_SECONDS

    try:
        assoc = ae.associate(addr=addr, port=port, ae_title=called_aet)
    except Exception as err:
        logger.error(err)
        raise err

    return assoc


def send_dataset(dataset, assoc) -> Dataset:
    """Sends DICOM object over specified DICOM association.
    Limited to a single DICOM object in the transaction.

    Args:
        dataset (_type_): _description_
        assoc (_type_): _description_

    Returns:
        Dataset: pydicom dataset containing status information
    """
    status = assoc.send_c_store(dataset)
    assoc.release()
    return status


def cstore(dataset, *, calling_aet, addr, port, called_aet):
    """CSTORE specified dataset to specified DICOM target

    Args:
        dataset (_type_): _description_
        calling_aet (_type_): _description_
        addr (_type_): _description_
        port (_type_): _description_
        called_aet (_type_): _description_

    Returns:
        _type_: _description_
    """

    if not addr:
        raise RuntimeError("No server address specified")
    if port < 1:
        raise RuntimeError(f"Invalid DICOM port {port}")
    if not called_aet:
        raise RuntimeError("No CALLED AET specified")
    if not calling_aet:
        raise RuntimeError("No CALLING AET specified")
    assoc = create_association(calling_aet, addr, port, called_aet)

    if assoc.is_established:
        logger.info("Associate connection is established for c-store")
        return send_dataset(dataset, assoc)
    else:
        logger.error(
            f"Associate connection is NOT established for c-store {assoc}"
        )
        raise RuntimeError(
            f"DICOM association failed {calling_aet} {addr} {port} {called_aet}"
        )


def cstore_study(ds: Dataset) -> Dataset:
    called_aet = os.getenv(CSTORE_CALLED_AET, None)
    calling_aet = os.getenv(CSTORE_CALLING_AET, None)
    cstore_port = int(os.getenv(CSTORE_PORT, 0))
    cstore_host = os.getenv(CSTORE_HOST, None)
    result = cstore(
        ds,
        calling_aet=calling_aet,
        called_aet=called_aet,
        addr=cstore_host,
        port=cstore_port,
    )
    return result


def read_dcm_from_memory(in_memory_file: BufferedRandom) -> Dataset:
    """Returns a pydicom Dataset from an in-memory file buffer.

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


def lambda_handler(event, context):
    # print("Received event: " + json.dumps(event, indent=2))

    # Get the object from the event and show its content type
    bucket = event["Records"][0]["s3"]["bucket"]["name"]
    key = urllib.parse.unquote_plus(
        event["Records"][0]["s3"]["object"]["key"], encoding="utf-8"
    )
    try:
        s3_object = s3.get_object(Bucket=bucket, Key=key)

        file_content = s3_object["Body"].read()
        ds = read_dcm_from_memory(file_content)
        serial_number = ds.DeviceSerialNumber
        logger.info(f"DeviceSerialNumber = {serial_number}")
        care_pmr_study = False
        if serial_number in serial_number_dictionary:
            logger.info("Match - this is a CarePMR study")
            care_pmr_study = True
            result = cstore_study(ds)
            logger.info(f"cstore resul {result.Status}")
            return str(result.Status)
        else:
            logger.info("This is not a CarePMR study")

        # Test for ds.DeviceSerialNumber. Is it in the serial_number_dictionary?
        # If match - then CSTORE.
        return str(care_pmr_study)
    except Exception as e:
        print(e)
        print(
            "Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.".format(
                key, bucket
            )
        )
        raise e
