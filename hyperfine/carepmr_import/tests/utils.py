from io import BytesIO
import boto3

def store_sample_files_in_mock_s3(aws_session, bucket_name, raw_data_filename):
    """Routine to place raw data and trigger files in mock S3 buckets.

    Before mock tests can be performed against S3 file sample files need to be uploaded to the mock locations.

    Args:
        aws_session (_type_): _description_
    """
    s3_client = aws_session.client("s3")

    # Create source bucket
    s3_client.create_bucket(Bucket=bucket_name)
    with open(raw_data_filename, "rb") as f:
        stream = BytesIO(f.read())
        s3_client.put_object(
            Bucket=bucket_name, Key=raw_data_filename, Body=stream
        )

def get_file_from_s3(bucket_name, file_name) -> bytes:
    # Get the S3 client
    s3 = boto3.client("s3")
    # Get the S3 object
    s3_object = s3.get_object(Bucket=bucket_name, Key=file_name)
    file_content = s3_object["Body"].read()

    return file_content
