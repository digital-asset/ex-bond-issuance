#
# Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0
#

# Produces dar file by fetching the source and building it.
# Arguments: daml_sdk_version path_to_dar

from io import BytesIO
from urllib import urlopen
from zipfile import ZipFile
import logging
import os
import shutil
import sys
import subprocess
import tempfile

# Currently there is no release yet, so use master
url = 'https://github.com/digital-asset/lib-finance/archive/master.zip'


def get_source(url, tmp_directory):
    logging.info('Unzipping {url}'.format(url=url))
    resp = urlopen(url)
    with ZipFile(BytesIO(resp.read())) as zipfile:
        zipfile.extractall(tmp_directory)


def build_dar(daml_sdk_version, path_to_dar, tmp_directory):
    extracted_directory = 'lib-finance-master'
    build_command = 'daml build --project-root {tmp_directory}/{extracted_directory}/ -o {path_to_dar}'.format(
        tmp_directory=tmp_directory, extracted_directory=extracted_directory, path_to_dar=path_to_dar)
    logging.info('Executing {build_command} with DAML_SDK_VERSION={daml_sdk_version}')
    os.environ['DAML_SDK_VERSION'] = daml_sdk_version
    subprocess.call(build_command.split(' '))


logging.basicConfig(level=logging.DEBUG)

daml_sdk_version = sys.argv[1]
path_to_dar = sys.argv[2]

if os.path.exists(path_to_dar):
    logging.info('{path_to_dar} already exists, nothing to do'.format(path_to_dar=path_to_dar))
    exit(0)
else:
    logging.info('{path_to_dar} will be created'.format(path_to_dar=path_to_dar))

tmp_directory = tempfile.mkdtemp()
logging.debug('Working in {tmp_directory}'.format(tmp_directory=tmp_directory))

get_source(url, tmp_directory)

build_dar(daml_sdk_version, path_to_dar, tmp_directory)

logging.debug('Removing {tmp_directory}'.format(tmp_directory=tmp_directory))
shutil.rmtree(tmp_directory)
