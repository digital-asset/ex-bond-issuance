/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.util;

import da.refapps.bond.lock.AssetLockRule;
import da.finance.fact.asset.AssetDeposit;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import da.finance.rule.asset.AssetFungible;
import da.finance.rule.asset.AssetSettlement;
import da.finance.types.Id;
import org.slf4j.Logger;

/** Various asset contract handling utility functions. */
public class AssetUtil {
  
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

}
