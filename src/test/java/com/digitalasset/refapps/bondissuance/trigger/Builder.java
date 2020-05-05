/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.trigger;

import com.daml.ledger.javaapi.data.Party;
import java.io.File;
import java.nio.file.Path;

public class Builder {
  private String darPath;
  private String triggerName;
  private String ledgerHost = "localhost";
  private String ledgerPort = "6865";
  private String party;
  private String timeMode = "--static-time";

  public Builder dar(Path path) {
    this.darPath = path.toString();
    return this;
  }

  public Builder triggerName(String triggerName) {
    this.triggerName = triggerName;
    return this;
  }

  public Builder ledgerHost(String ledgerHost) {
    this.ledgerHost = ledgerHost;
    return this;
  }

  public Builder ledgerPort(int ledgerPort) {
    this.ledgerPort = Integer.toString(ledgerPort);
    return this;
  }

  public Builder useWallClockTime() {
    this.timeMode = "--wall-clock-time";
    return this;
  }

  public Builder party(Party party) {
    this.party = party.getValue();
    return this;
  }

  public Trigger build() {
    File logFile = new File(String.format("integration-test-%s.log", triggerName));
    ProcessBuilder processBuilder =
        command()
            .redirectError(ProcessBuilder.Redirect.appendTo(logFile))
            .redirectOutput(ProcessBuilder.Redirect.appendTo(logFile));
    return new Trigger(processBuilder);
  }

  private ProcessBuilder command() {
    return new ProcessBuilder()
        .command(
            "daml",
            "trigger",
            timeMode,
            "--dar",
            darPath,
            "--trigger-name",
            triggerName,
            "--ledger-host",
            ledgerHost,
            "--ledger-port",
            ledgerPort,
            "--ledger-party",
            party);
  }
}
