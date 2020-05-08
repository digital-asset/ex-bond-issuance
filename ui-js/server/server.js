/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
const express = require('express')
const proxy = require('express-http-proxy');

const app = express();
app.use(express.static('public'));
app.use('/v1', proxy('http://localhost:7575', { proxyReqPathResolver: req => '/v1' + req.url }));

// const router = express.Router();
// router.get('/api/hello', (req, res, next) => { res.json('World'); });
// app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => console.log(`Server listening on port: ${port}`));
