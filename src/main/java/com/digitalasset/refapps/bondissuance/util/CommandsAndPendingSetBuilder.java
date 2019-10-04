/**
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
package com.digitalasset.refapps.bondissuance.util;

import com.daml.ledger.javaapi.data.Command;
import com.daml.ledger.javaapi.data.ExerciseCommand;
import com.daml.ledger.javaapi.data.Identifier;
import com.daml.ledger.javaapi.data.SubmitCommandsRequest;
import com.daml.ledger.rxjava.components.helpers.CommandsAndPendingSet;
import io.reactivex.Flowable;
import io.reactivex.Maybe;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import org.pcollections.HashTreePMap;
import org.pcollections.HashTreePSet;
import org.pcollections.PSet;

/** Utility to manage the pending set of commands after creating new commands. */
public class CommandsAndPendingSetBuilder {
  private final String appId;
  private final String party;
  private final String workflowId;
  private final TimeManager timeManager;

  public CommandsAndPendingSetBuilder(
      String appId, String party, String workflowId, TimeManager timeManager) {
    this.appId = appId;
    this.party = party;
    this.workflowId = workflowId;
    this.timeManager = timeManager;
  }

  public Builder newBuilder() {
    return new Builder();
  }

  public final class Builder {
    private List<Command> commands = new ArrayList<>();
    private Map<Identifier, PSet<String>> pendingContractIds = new HashMap<>();

    public void addCommand(Command cmd) {
      commands.add(cmd);
      if (cmd instanceof ExerciseCommand) {
        ExerciseCommand ecmd = (ExerciseCommand) cmd;
        pendingContractIds.compute(
            ecmd.getTemplateId(),
            (k, v) ->
                (v == null)
                    ? HashTreePSet.singleton(ecmd.getContractId())
                    : v.plus(ecmd.getContractId()));
      }
    }

    public Optional<CommandsAndPendingSet> build() {
      if (commands.isEmpty() && pendingContractIds.isEmpty()) {
        return Optional.empty();
      } else {
        Instant time = timeManager.getTime();
        SubmitCommandsRequest commandsRequest =
            new SubmitCommandsRequest(
                workflowId,
                appId,
                UUID.randomUUID().toString(),
                party,
                time,
                time.plusSeconds(30),
                commands);
        return Optional.of(
            new CommandsAndPendingSet(commandsRequest, HashTreePMap.from(pendingContractIds)));
      }
    }

    public Flowable<CommandsAndPendingSet> buildFlowable() {
      return build().map(Maybe::just).orElse(Maybe.empty()).toFlowable();
    }
  }
}
