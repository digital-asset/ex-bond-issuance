#!/usr/bin/env python
#
# Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0
#

# Produces dar file `target/finlib-master-sdk-{daml_sdk_version}.dar' by fetching the source and building it.
# Arguments: daml_sdk_version

from io import BytesIO
from os import environ, getcwd, path
from os.path import expanduser
from shutil import rmtree
from subprocess import call
from sys import argv
from tempfile import mkdtemp
from zipfile import ZipFile
import logging


# based on 'Cheat Sheet: Writing Python 2-3 compatible code'
# from https://python-future.org/compatible_idioms.html
try:
    from urllib.request import urlopen
except ImportError:
    from urllib2 import urlopen

# Currently there is no release yet, so use master
url = 'https://github.com/digital-asset/lib-finance/archive/master.zip'


def get_source(url, tmp_directory):
    logging.info('Unzipping {url}'.format(url=url))
    resp = urlopen(url)
    with ZipFile(BytesIO(resp.read())) as zipfile:
        zipfile.extractall(tmp_directory)


def build_dar(daml_sdk_version, full_path_to_dar, tmp_directory):
    daml_full_path = "{home}/.daml/bin/daml".format(home=expanduser("~"))
    extracted_directory = 'lib-finance-master'
    project_root = "{tmp_directory}/{extracted_directory}/".format(
                        tmp_directory=tmp_directory,
                        extracted_directory=extracted_directory)
    build_command = [daml_full_path, "build", "--project-root", project_root, "-o", full_path_to_dar]
    logging.info(
        'Executing {build_command} with DAML_SDK_VERSION={daml_sdk_version}'.format(
            build_command=" ".join(build_command), daml_sdk_version=daml_sdk_version))
    environ['DAML_SDK_VERSION'] = daml_sdk_version
    call(build_command)


logging.basicConfig(level=logging.INFO)

daml_sdk_version = argv[1]
full_path_to_dar = '{pwd}/target/finlib-master-sdk-{daml_sdk_version}.dar'.format(
    pwd=getcwd(), daml_sdk_version=daml_sdk_version)

if path.exists(full_path_to_dar):
    logging.info('{full_path_to_dar} already exists, nothing to do'.format(full_path_to_dar=full_path_to_dar))
    exit(0)
else:
    logging.info('{full_path_to_dar} will be created'.format(full_path_to_dar=full_path_to_dar))

tmp_directory = mkdtemp()
logging.debug('Working in {tmp_directory}'.format(tmp_directory=tmp_directory))

get_source(url, tmp_directory)

build_dar(daml_sdk_version, full_path_to_dar, tmp_directory)

logging.debug('Removing {tmp_directory}'.format(tmp_directory=tmp_directory))
rmtree(tmp_directory)
