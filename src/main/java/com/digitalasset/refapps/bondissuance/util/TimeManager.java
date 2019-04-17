/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.util;

import com.daml.ledger.rxjava.TimeClient;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;

/** Utility to obtain the current ledger time */
public class TimeManager {

  private Instant time;

  public TimeManager(long epochTimeMillis) {
    this.time = Instant.ofEpochMilli(epochTimeMillis);
  }

  public TimeManager(TimeClient timeClient) {
    timeClient.getTime().forEach(t -> time = t);
  }

  public Instant getTime() {
    return time;
  }

  public LocalDate getLocalDate() {
    return time.atOffset(ZoneOffset.UTC).toLocalDate();
  }
}
