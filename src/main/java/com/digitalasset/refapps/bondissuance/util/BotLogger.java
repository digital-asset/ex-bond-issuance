/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/** Logger with bot-specific info. */
public final class BotLogger {
  public static Logger getLogger(Class<?> cls, String workflowId) {
    String name = cls.getName() + ": " + workflowId;
    return LoggerFactory.getLogger(name);
  }
}
