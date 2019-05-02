/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.util;

import da.finance.asset.fact.AssetFact;
import da.refapps.bond.lock.AssetLockRule;
import da.finance.asset.splitandmerge.AssetSplitAndMergeRule;
import da.finance.asset.transfer.bilateral.AssetTransferRule;
import da.finance.fact.asset.AssetDeposit;
import da.finance.oldtypes.InstrumentId;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import da.finance.rule.asset.AssetFungible;
import da.finance.rule.asset.AssetSettlement;
import da.finance.types.Account;
import da.finance.types.Id;
import org.slf4j.Logger;

/** Various asset contract handling utility functions. */
public class AssetUtil {
  
  public static AssetTransferRule.ContractId findTransferRule(
      Map<String, AssetTransferRule> assetTransferRules, String provider, Logger logger) {
    List<AssetTransferRule.ContractId> transferRules =
        assetTransferRules.entrySet().stream()
            .filter(cidWithContract -> cidWithContract.getValue().provider.equals(provider))
            .map(cidWithContract -> new AssetTransferRule.ContractId(cidWithContract.getKey()))
            .collect(Collectors.toList());
    if (transferRules.size() < 1) {
      String msg = "Can't find any Transfer rule";
      logger.error(msg);
      throw new IllegalStateException(msg);
    }
    return transferRules.iterator().next();
  }

  public static AssetFungible.ContractId findAssetFungible(
      Map<String, AssetFungible> assetFungibles, String provider, String owner, Logger logger) {
    List<AssetFungible.ContractId> filteredFungibles =
        assetFungibles.entrySet().stream()
            .filter(cidWithContract -> 
                cidWithContract.getValue().account.owner.equals(owner) &&
                cidWithContract.getValue().account.provider.equals(provider))
            .map(cidWithContract -> new AssetFungible.ContractId(cidWithContract.getKey()))
            .collect(Collectors.toList());
    if (filteredFungibles.size() < 1) {
      String msg = "Can't find any AssetFungible contract";
      logger.error(msg);
      throw new IllegalStateException(msg);
    }
    return filteredFungibles.iterator().next();
  }

  public static AssetSettlement.ContractId findAssetSettlement(
      Map<String, AssetSettlement> assetSettlements, String provider, String owner, Logger logger) {
    List<AssetSettlement.ContractId> filteredSettlements =
        assetSettlements.entrySet().stream()
            .filter(cidWithContract -> 
                cidWithContract.getValue().account.owner.equals(owner) &&
                cidWithContract.getValue().account.provider.equals(provider)
            )
            .map(cidWithContract -> new AssetSettlement.ContractId(cidWithContract.getKey()))
            .collect(Collectors.toList());
    if (filteredSettlements.size() < 1) {
      String msg = "Can't find any AssetSettlement contract";
      logger.error(msg);
      throw new IllegalStateException(msg);
    }
    return filteredSettlements.iterator().next();
  }

  public static AssetSplitAndMergeRule.ContractId findSplitAndMergeRule(
      Map<String, AssetSplitAndMergeRule> assetSplitAndMergeRules, String provider, Logger logger) {
    List<AssetSplitAndMergeRule.ContractId> splitAndMergeRules =
        assetSplitAndMergeRules.entrySet().stream()
            .filter(cidWithContract -> cidWithContract.getValue().provider.equals(provider))
            .map(cidWithContract -> new AssetSplitAndMergeRule.ContractId(cidWithContract.getKey()))
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
            .filter(cidWithContract -> cidWithContract.getValue().account.provider.equals(provider))
            .map(cidWithContract -> new AssetLockRule.ContractId(cidWithContract.getKey()))
            .collect(Collectors.toList());
    if (lockRules.size() < 1) {
      String msg = "Can't find any Lock rule";
      logger.error(msg);
      throw new IllegalStateException(msg);
    }
    return lockRules.iterator().next();
  }

  public static List<AssetDeposit.ContractId> findAssetDepositCids(
      Map<String, AssetDeposit> assetDeposits, Id assetId) {
    return assetDeposits.entrySet().stream()
        .filter(cidWithAsset -> cidWithAsset.getValue().asset.id.equals(assetId))
        .map(cidWithAsset -> new AssetDeposit.ContractId(cidWithAsset.getKey()))
        .collect(Collectors.toList());
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
