/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.util;

import com.daml.ledger.rxjava.TimeClient;
import java.time.*;

/** Utility to obtain the current ledger time */
public class TimeManager {

  private Clock clock;

  private TimeManager(Clock clock) {
    this.clock = clock;
  }

  public static TimeManager getWallclockTimeManager() {
    return new TimeManager(Clock.systemUTC());
  }

  public static TimeManager getStaticTimeManager() {
    return new TimeManager(Clock.fixed(Instant.EPOCH, ZoneId.systemDefault()));
  }

  public static TimeManager getTimeClientBasedTimeManager(TimeClient timeClient) {
    TimeManager tm = getStaticTimeManager();
    timeClient.getTime().forEach(t -> tm.clock = Clock.fixed(t, ZoneId.systemDefault()));
    return tm;
  }

  public Instant getTime() {
    return clock.instant();
  }

  public LocalDate getLocalDate() {
    return getTime().atOffset(ZoneOffset.UTC).toLocalDate();
  }
}
