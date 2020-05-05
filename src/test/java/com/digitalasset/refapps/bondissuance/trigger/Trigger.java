/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.trigger;

import org.junit.rules.ExternalResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Trigger extends ExternalResource {
  private final Logger logger = LoggerFactory.getLogger(getClass().getCanonicalName());

  private final ProcessBuilder processBuilder;

  private Process trigger;

  Trigger(ProcessBuilder processBuilder) {
    this.processBuilder = processBuilder;
  }

  public static Builder builder() {
    return new Builder();
  }

  public void start() throws Throwable {
    logger.debug("Executing: {}", String.join(" ", processBuilder.command()));
    trigger = processBuilder.start();
    logger.info("Started.");
  }

  public void stop() {
    try {
      trigger.destroyForcibly().waitFor();
    } catch (InterruptedException e) {
      logger.error("Could not stop trigger.", e);
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
