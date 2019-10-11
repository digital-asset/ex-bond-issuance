/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.bot.marketsetup.data;

class MarketParties {
  private final String operator;
  private final String regulator;
  private final String auctionAgent;
  private final String bank1;
  private final String bank2;
  private final String bank3;
  private final String csd;
  private final String issuer;
  private final String centralBank;

  public MarketParties(
      String operator,
      String regulator,
      String auctionAgent,
      String bank1,
      String bank2,
      String bank3,
      String csd,
      String issuer,
      String centralBank) {
    this.operator = operator;
    this.regulator = regulator;
    this.auctionAgent = auctionAgent;
    this.bank1 = bank1;
    this.bank2 = bank2;
    this.bank3 = bank3;
    this.csd = csd;
    this.issuer = issuer;
    this.centralBank = centralBank;
  }
}
