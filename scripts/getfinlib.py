# Produces dar file by fetching the source and building it.
# Arguments: daml_sdk_version path_to_dar

from io import BytesIO
from zipfile import ZipFile
import logging
import requests
import os
import sys
import subprocess
import tempfile

# Currently there is no release yet, so use master
url = 'https://github.com/digital-asset/lib-finance/archive/master.zip'

def get_source(url, tmp_directory):
    logging.info(f'Unzipping {url}')
    resp = requests.get(url).content
    with ZipFile(BytesIO(resp)) as zipfile:
        zipfile.extractall(tmp_directory)

def build_dar(daml_sdk_version, path_to_dar, tmp_directory):
    extracted_directory = 'lib-finance-master'
    build_command = f'daml build --project-root {tmp_directory}/{extracted_directory}/ -o {path_to_dar}'
    logging.info(f'Executing {build_command} with DAML_SDK_VERSION={daml_sdk_version}')
    os.environ['DAML_SDK_VERSION'] = daml_sdk_version
    subprocess.run(build_command.split(' '))

logging.basicConfig(level=logging.DEBUG)

daml_sdk_version = sys.argv[1]
path_to_dar = sys.argv[2]

if os.path.exists(path_to_dar):
    logging.info(f'{path_to_dar} already exists, nothing to do')
    exit(0)
else:
    logging.info(f'{path_to_dar} will be created')

with tempfile.TemporaryDirectory() as tmp_directory:
    logging.debug(f'Working in {tmp_directory}')
    get_source(url, tmp_directory)
    build_dar(daml_sdk_version, path_to_dar, tmp_directory)
    logging.debug(f'Removing {tmp_directory}')
