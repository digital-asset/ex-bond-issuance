/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance;

import com.daml.ledger.javaapi.data.Identifier;
import com.daml.ledger.rxjava.components.LedgerViewFlowable;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;

/** A LedgerTestView that enables one to add contracts to the ledger view. Usable for tests. */
public class LedgerTestView<R> {
  private LedgerViewFlowable.LedgerView ledgerView;
  private final Method addToLedgerViewMethod;

  public LedgerTestView() {
    Class<LedgerViewFlowable.LedgerView> cls = LedgerViewFlowable.LedgerView.class;
    Method mtd =
        Arrays.stream(cls.getDeclaredMethods())
            .filter(m -> m.getName().equals("addActiveContract"))
            .findFirst()
            .get();
    mtd.setAccessible(true);
    this.addToLedgerViewMethod = mtd;
    this.ledgerView = LedgerViewFlowable.LedgerView.create();
  }

  public LedgerTestView<R> addActiveContract(
      Identifier templateId, String contractId, R contractClassInstance)
      throws InvocationTargetException, IllegalAccessException {
    // Call to: LedgerViewFlowable.LedgerView<R> addActiveContract(Identifier templateId, String
    // contractId, R r)
    ledgerView =
        (LedgerViewFlowable.LedgerView)
            addToLedgerViewMethod.invoke(ledgerView, templateId, contractId, contractClassInstance);
    return this;
  }

  public LedgerViewFlowable.LedgerView<R> getRealLedgerView() {
    return ledgerView;
  }
}
