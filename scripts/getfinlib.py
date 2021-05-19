#!/usr/bin/env python3
#
# Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0
#

# Produces dar file `target/finlib-master-sdk-{daml_sdk_version}.dar' by fetching the source and building it.
# Arguments: daml_sdk_version

import logging
from io import BytesIO
from os import environ, getcwd, path, chdir, chmod, mkdir
from subprocess import call
from sys import argv
from tempfile import mkdtemp
from zipfile import ZipFile
from shutil import copyfile

# based on 'Cheat Sheet: Writing Python 2-3 compatible code'
# from https://python-future.org/compatible_idioms.html
try:
    from urllib.request import urlopen
except ImportError:
    from urllib2 import urlopen

finlib_version = '5d7fc48efcaebc400dd2b98aaee6d4c403264a7e'
url = "https://github.com/digital-asset/lib-finance/archive/{version}.zip".format(version=finlib_version)


def get_source(url, tmp_directory):
    logging.info('Unzipping {url}'.format(url=url))
    resp = urlopen(url)
    with ZipFile(BytesIO(resp.read())) as zipfile:
        zipfile.extractall(tmp_directory)


def build_dar(daml_sdk_version, full_path_to_dar, tmp_directory):
    extracted_directory = "lib-finance-{version}".format(version=finlib_version)
    target_dir = '{pwd}/target/'.format(pwd=getcwd())
    project_root = "{tmp_directory}/{extracted_directory}".format(
        tmp_directory=tmp_directory,
        extracted_directory=extracted_directory)
    build_command = ["./build.sh", "build-dars"]
    logging.info(
        'Executing {build_command} with DAML_SDK_VERSION={daml_sdk_version}'.format(
            build_command=" ".join(build_command), daml_sdk_version=daml_sdk_version))
    logging.info('Setting environment to {sdk}'.format(sdk=daml_sdk_version))
    environ['DAML_SDK_VERSION'] = daml_sdk_version
    logging.info('Calling to {build_command}')
    chdir(project_root)

    chmod('./build.sh', 0o775)
    call(build_command)
    if not path.exists(target_dir):
        mkdir(target_dir)
    logging.info('Copying to {full_path}'.format(full_path=full_path_to_dar))
    copyfile('./model/.daml/dist/finlib-2.0.0.dar', full_path_to_dar)


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
