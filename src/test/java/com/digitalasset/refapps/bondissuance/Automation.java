/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance;

import java.io.File;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.function.Supplier;
import org.junit.rules.ExternalResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Automation extends ExternalResource {
  private final Logger logger;
  private final Supplier<Integer> ledgerPort;
  private final File logFile;
  private final int defaultTimeout = 30;

  private Process triggerService;

  Automation(Supplier<Integer> ledgerPort) {
    this.ledgerPort = ledgerPort;
    this.logger = LoggerFactory.getLogger(getClass().getCanonicalName());
    this.logFile = new File(String.format("integration-test-trigger-service.log"));
  }

  private void start() throws Throwable {
    ProcessBuilder processBuilder = createProcess();
    logger.debug("Executing: {}", String.join(" ", processBuilder.command()));
    triggerService = processBuilder.start();

    waitForTriggerServiceToStart();

    logger.info("Started.");
  }

  private ProcessBuilder createProcess() {
    return command()
        .redirectError(ProcessBuilder.Redirect.appendTo(logFile))
        .redirectOutput(ProcessBuilder.Redirect.appendTo(logFile));
  }

  private ProcessBuilder command() {
    return new ProcessBuilder().command("scripts/startTriggers.py", ledgerPort.get().toString());
  }

  private void waitForTriggerServiceToStart() throws MalformedURLException, InterruptedException {
    int timeout = defaultTimeout;
    while (!isServiceStarted() && timeout > 0) {
      logger.debug("Waiting for trigger service...");
      Thread.sleep(1000);
      timeout--;
    }
    if (timeout == 0) throw new RuntimeException("Timeout for trigger service");
  }

  private boolean isServiceStarted() throws MalformedURLException {
    return isAvailable(new URL("http://localhost:8088/v1/triggers?party=CSD"));
  }

  private boolean isAvailable(URL url) {
    try {
      HttpURLConnection con = (HttpURLConnection) url.openConnection();
      con.connect();
      con.disconnect();
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  private void stop() {
    try {
      triggerService.destroy();
      triggerService.waitFor();
    } catch (InterruptedException e) {
      logger.error("Could not stop trigger service.", e);
    }
  }

  @Override
  protected void before() throws Throwable {
    super.before();
    start();
  }

  @Override
  protected void after() {
    stop();
    super.after();
  }
}
