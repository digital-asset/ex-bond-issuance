/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

//  Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
//  SPDX-License-Identifier: Apache-2.0

const fs = require('fs');

fs.readFile('./package.json', 'utf8', function(err, data) {
  if (err) return console.log(`Error with configure script: ${err}`);

  // parse current package.json into an object
  let parsedData = JSON.parse(data);

  // change the proxy to docker endpoint
  let proxy = `http://${process.env.JSON_API}:7575`;
  console.info("Ledger URL: %s", proxy);
  parsedData.proxy = proxy;

  // for package.json formatting
  const spacing = 2;
  let dataString = JSON.stringify(parsedData, null, spacing);

  // overwrite the current package.json
  fs.writeFile('./package.json', dataString, err => {
    if (err) console.error(`Error writing file: ${err}`);
  });
});
