
```

DICOM_WEB_URL
https://pacs-server.dev-sean.hyperfine-research-dev.com:8443/pacs/dicom-web/studies
PMR_SERIAL_NUMBERS
HG23030011,HG23080015,HG23080016,HG23350055
```
# Building lambda layer:


1. cd lambda_layer/
2. python3 -m venv lambda
3. source lambda/bin/activate
4. pip install -r requirements.txt -t ./python
5. zip -r pacs_upload.zip python/
