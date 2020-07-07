/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.trigger;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HttpClient {
  private final Logger logger = LoggerFactory.getLogger(getClass());

  public boolean ping(URL url) {
    try {
      HttpURLConnection con = (HttpURLConnection) url.openConnection();
      con.connect();
      con.disconnect();
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  void post(URL url, String body, String authentication) throws Exception {
    try {
      HttpURLConnection con = (HttpURLConnection) url.openConnection();
      con.setRequestMethod("POST");
      con.setRequestProperty("Content-Type", "application/json");
      con.setRequestProperty("Accept", "application/json");
      con.setRequestProperty("Authorization", authentication);
      con.setDoOutput(true);

      sendBody(con, body);
      getResponse(con);

      con.disconnect();
    } catch (Exception e) {
      logger.error("Error in trigger service:", e);
      throw new Exception("Error in trigger service.");
    }
  }

  private void sendBody(HttpURLConnection con, String body) throws IOException {
    try (OutputStream os = con.getOutputStream()) {
      byte[] input = body.getBytes(StandardCharsets.UTF_8);
      os.write(input, 0, input.length);
    }
  }

  private void getResponse(HttpURLConnection con) throws IOException {
    try (BufferedReader br =
        new BufferedReader(new InputStreamReader(con.getInputStream(), StandardCharsets.UTF_8))) {
      StringBuilder response = new StringBuilder();
      String responseLine;
      while ((responseLine = br.readLine()) != null) {
        response.append(responseLine.trim());
      }
      logger.info(String.format("Response: %s", response.toString()));
    }
  }
}
