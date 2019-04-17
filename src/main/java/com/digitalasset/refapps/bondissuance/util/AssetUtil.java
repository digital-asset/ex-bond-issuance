/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.util;

import da.finance.asset.fact.AssetFact;
import da.finance.asset.lock.AssetLockRule;
import da.finance.asset.splitandmerge.AssetSplitAndMergeRule;
import da.finance.asset.transfer.bilateral.AssetTransferRule;
import da.finance.types.InstrumentId;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.slf4j.Logger;

/** Various asset contract handling utility functions. */
public class AssetUtil {
  public static AssetTransferRule.ContractId findTransferRule(
      Map<String, AssetTransferRule> assetTransferRules, String provider, Logger logger) {
    List<AssetTransferRule.ContractId> transferRules =
        assetTransferRules.entrySet().stream()
            .filter(cidWithRule -> cidWithRule.getValue().provider.equals(provider))
            .map(cidWithRule -> new AssetTransferRule.ContractId(cidWithRule.getKey()))
            .collect(Collectors.toList());
    if (transferRules.size() < 1) {
      String msg = "Can't find any Transfer rule";
      logger.error(msg);
      throw new IllegalStateException(msg);
    }
    return transferRules.iterator().next();
  }

  public static AssetSplitAndMergeRule.ContractId findSplitAndMergeRule(
      Map<String, AssetSplitAndMergeRule> assetSplitAndMergeRules, String provider, Logger logger) {
    List<AssetSplitAndMergeRule.ContractId> splitAndMergeRules =
        assetSplitAndMergeRules.entrySet().stream()
            .filter(cidWithRule -> cidWithRule.getValue().provider.equals(provider))
            .map(cidWithRule -> new AssetSplitAndMergeRule.ContractId(cidWithRule.getKey()))
            .collect(Collectors.toList());
    if (splitAndMergeRules.size() < 1) {
      String msg = "Can't find any SplitAndMerge rule";
      logger.error(msg);
      throw new IllegalStateException(msg);
    }
    return splitAndMergeRules.iterator().next();
  }

  public static AssetLockRule.ContractId findLockRule(
      Map<String, AssetLockRule> assetLockRules, String provider, Logger logger) {
    List<AssetLockRule.ContractId> lockRules =
        assetLockRules.entrySet().stream()
            .filter(cidWithRule -> cidWithRule.getValue().provider.equals(provider))
            .map(cidWithRule -> new AssetLockRule.ContractId(cidWithRule.getKey()))
            .collect(Collectors.toList());
    if (lockRules.size() < 1) {
      String msg = "Can't find any Lock rule";
      logger.error(msg);
      throw new IllegalStateException(msg);
    }
    return lockRules.iterator().next();
  }

  public static List<AssetFact.ContractId> findAssetFactCids(
      Map<String, AssetFact> assetFacts, String provider, InstrumentId instrumentId) {
    return assetFacts.entrySet().stream()
        .filter(cidWithAsset -> cidWithAsset.getValue().accountId.provider.equals(provider))
        .filter(cidWithAsset -> cidWithAsset.getValue().assetId.instrumentId.equals(instrumentId))
        .map(cidWithAsset -> new AssetFact.ContractId(cidWithAsset.getKey()))
        .collect(Collectors.toList());
  }
}
