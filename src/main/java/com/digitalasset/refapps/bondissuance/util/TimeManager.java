/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.util;

import java.time.*;

/** Utility to obtain the current ledger time */
public class TimeManager {

  private final Clock clock;

  private TimeManager(Clock clock) {
    this.clock = clock;
  }

  public static TimeManager getWallclockTimeManager() {
    return new TimeManager(Clock.systemUTC());
  }

  public static TimeManager getStaticTimeManager() {
    return new TimeManager(Clock.fixed(Instant.EPOCH, ZoneId.systemDefault()));
  }

  public Instant getTime() {
    return clock.instant();
  }

  public LocalDate getLocalDate() {
    return getTime().atOffset(ZoneOffset.UTC).toLocalDate();
  }
}
