/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.util;

import com.daml.ledger.javaapi.data.Template;
import java.util.HashMap;
import java.util.Map;
import org.pcollections.PMap;

/** Simple utility to collect the contract info classes of the specified type. */
public class BotUtil {

  /** Collects all template instances for a specific type. Need this method because of PMap... */
  public static <C extends Template> Map<String, C> filterTemplates(
      Class<C> type, PMap<String, ?> contracts) {
    HashMap<String, C> m = new HashMap<>();
    contracts.forEach(
        (s, c) -> {
          if (type.isInstance(c)) m.put(s, type.cast(c));
        });
    return m;
  }
}
