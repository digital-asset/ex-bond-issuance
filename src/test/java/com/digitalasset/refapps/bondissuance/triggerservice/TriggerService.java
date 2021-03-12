/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.triggerservice;

import static com.digitalasset.refapps.bondissuance.trigger.Trigger.getStartUrl;

import com.digitalasset.refapps.bondissuance.trigger.HttpClient;
import java.io.File;
import java.net.MalformedURLException;
import java.util.function.Supplier;
import org.junit.rules.ExternalResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TriggerService extends ExternalResource {
  private final Logger logger;

  private final String darPath;
  private final String ledgerHost;
  private final Supplier<String> ledgerPort;
  private final String timeMode;
  private final File logFile;
  private final int defaultTimeout = 30;

  private Process triggerService;

  TriggerService(String darPath, String ledgerHost, Supplier<String> ledgerPort, String timeMode) {
    this.darPath = darPath;
    this.ledgerHost = ledgerHost;
    this.ledgerPort = ledgerPort;
    this.timeMode = timeMode;
    this.logger = LoggerFactory.getLogger(getClass().getCanonicalName());
    this.logFile = new File(String.format("integration-test-trigger-service.log"));
  }

  public static Builder builder() {
    return new Builder();
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
    return new ProcessBuilder()
        .command(
            "daml",
            "trigger-service",
            timeMode,
            "--dar",
            darPath,
            "--ledger-host",
            ledgerHost,
            "--ledger-port",
            ledgerPort.get());
  }

  private void waitForTriggerServiceToStart() throws MalformedURLException, InterruptedException {
    HttpClient httpClient = new HttpClient();
    int timeout = defaultTimeout;
    while (!httpClient.isAvailable(getStartUrl(this.ledgerHost)) && timeout > 0) {
      logger.debug("Waiting for trigger service...");
      Thread.sleep(1000);
      timeout--;
    }
    if (timeout == 0) throw new RuntimeException("Timeout for trigger service");
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
