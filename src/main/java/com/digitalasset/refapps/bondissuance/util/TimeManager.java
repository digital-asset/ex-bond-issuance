/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.util;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;

/** Utility to obtain the current ledger time */
public class TimeManager {

  public TimeManager() {
  }

  public static TimeManager getTimeClientBasedTimeManager() {
    TimeManager tm = new TimeManager();
    return tm;
  }

  public Instant getTime() {
    return Instant.ofEpochMilli(System.currentTimeMillis());
  }

  public LocalDate getLocalDate() {
    return getTime().atOffset(ZoneOffset.UTC).toLocalDate();
  }
}
