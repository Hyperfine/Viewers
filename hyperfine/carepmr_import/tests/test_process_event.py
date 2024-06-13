import json
import math
import os
import shutil
import tempfile
from contextlib import contextmanager
from io import BytesIO

import boto3
import moto
import pytest
import pydicom
from tests.utils import store_sample_files_in_mock_s3, get_file_from_s3
from import_handler_lambda import get_dicom_from_event, is_carepmr_image

TEST_BUCKET = "TEST_BUCKET"
DICOM_DATA = "tests/data/2.25.127421887010676750942174422891255180378.dcm"
TEST_EVENT = "tests/data/s3_lambda_event.json"


def test_parse_dicom(aws_session):
    store_sample_files_in_mock_s3(aws_session, TEST_BUCKET, DICOM_DATA)

    with open(TEST_EVENT) as aws_event:
        event = json.load(aws_event)
        event["Records"][0]["s3"]["object"]["key"] = DICOM_DATA
        event["Records"][0]["s3"]["bucket"]["name"] = TEST_BUCKET
    with moto.mock_aws():
        s3_client = aws_session.client("s3")
        ds = get_dicom_from_event(s3_client, event)
    assert 'PixelData' in ds

def test_is_carepmr_study():
    ds = pydicom.dcmread(DICOM_DATA)
    carepmr_approved_serial_numbers = "A1,A2,A3"
    os.environ["PMR_SERIAL_NUMBERS"] = carepmr_approved_serial_numbers
    approved_serial_numbers = carepmr_approved_serial_numbers.split(",")
    for approved_serial_number in approved_serial_numbers:
        ds.DeviceSerialNumber = approved_serial_number
        assert is_carepmr_image(ds)

    ds.DeviceSerialNumber = "A4"
    assert not is_carepmr_image(ds)
