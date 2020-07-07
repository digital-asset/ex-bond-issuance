/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.trigger;

import com.daml.ledger.javaapi.data.Party;

public class Builder {
  private String triggerName;
  private String ledgerHost = "localhost";
  private String party;

  public Builder triggerName(String triggerName) {
    this.triggerName = triggerName;
    return this;
  }

  public Builder ledgerHost(String ledgerHost) {
    this.ledgerHost = ledgerHost;
    return this;
  }

  public Builder party(Party party) {
    this.party = party.getValue();
    return this;
  }

  public Trigger build() {
    return new Trigger(triggerName, ledgerHost, party);
  }
}
