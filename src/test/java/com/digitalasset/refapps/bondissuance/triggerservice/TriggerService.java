/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.triggerservice;

import java.io.File;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.function.Supplier;
import org.apache.commons.io.input.Tailer;
import org.apache.commons.io.input.TailerListenerAdapter;
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
    processBuilder.environment().put("JAVA_TOOL_OPTIONS", "-Xmx350m");
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
            ledgerPort.get(),
            "--no-secret-key");
  }

  private void waitForTriggerServiceToStart() throws InterruptedException {
    final CountDownLatch hasStarted = new CountDownLatch(1);
    Tailer tailer =
        new Tailer(
            logFile,
            new TailerListenerAdapter() {
              @Override
              public void handle(String line) {
                if (line != null && line.contains("Server online at")) {
                  hasStarted.countDown();
                } else {
                  logger.debug("Waiting for trigger service...");
                }
              }
            },
            0L,
            true);
    ExecutorService executor = Executors.newSingleThreadExecutor();
    executor.submit(tailer);

    try {
      hasStarted.await(30L, TimeUnit.SECONDS);
    } catch (InterruptedException e) {
      throw new IllegalStateException("Trigger service did not start within timeout.");
    } finally {
      tailer.stop();
      executor.shutdown();
      executor.awaitTermination(10L, TimeUnit.SECONDS);
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
