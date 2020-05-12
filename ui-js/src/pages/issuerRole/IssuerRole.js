/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import { getValue } from "../../components/Contracts/Contracts";
import { useStyles } from "../../components/Contracts/styles";
import { useQuery, useLedger } from "@daml/react";
import { FormControl, TableHead, InputLabel, MenuItem, Select, TextField, Table, TableBody,TableRow, TableCell, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { IssuerRole } from "@daml.js/bond-issuance-2.0.0/lib/DA/RefApps/Bond/Roles/IssuerRole";

export default function Report() {
  const defaultDate = "2017-05-24";
  const defaultCurrency = "USD";

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [actualContract, setActualContract] = React.useState();
  const ledger = useLedger();
  const classes = useStyles();
  const contracts = useQuery(IssuerRole).contracts;
  const columns =
     [["Contract Id", "contractId"],
      ["Issuer", "payload.issuer"],
      ["Regulators", "payload.regulators"]];

  const doIssuance = async (c) => {
    const payload = {
      issueSize,
      issueDate,
      currency,
      denomination,
      maturityDate,
      couponRate,
      couponDates: []
    };
    await ledger.exercise(IssuerRole.IssuerRole_Issuance, c.contractId, payload);
  }

  const [issueSize, setIssueSize] = React.useState();
  const [issueDate, setIssueDate] = React.useState(defaultDate);
  const [currency, setCurrency] = React.useState(defaultCurrency);
  const [denomination, setDenomination] = React.useState();
  const [couponRate, setCouponRate] = React.useState();
  const [maturityDate, setMaturityDate] = React.useState(defaultDate);

  function handleBondIssuanceClick(c) {
      setActualContract(c);
      setDialogOpen(true);
  }

  return (
    <>
      <Grid container spacing={4}>

      <Dialog open={dialogOpen} onClose={() => ({})} maxWidth="sm" fullWidth>
          <DialogTitle>
            New Issuer
          </DialogTitle>
          <DialogContent>
            <form className={classes.root}>
                <TextField
                  required
                  autoFocus
                  label="Issue size"
                  type="number"
                  onChange={(event) => { setIssueSize(event.target.value); }}
                  />
                <TextField
                  required
                  autoFocus
                  label="Denomination"
                  type="number"
                  onChange={(event) => { setDenomination(event.target.value); }}
                  />
                <TextField
                  required
                  autoFocus
                  label="Issue date"
                  type="date"
                  defaultValue={defaultDate}
                  onChange={(event) => { setIssueDate(event.target.value); }}
                  />
                <TextField
                  required
                  autoFocus
                  label="Maturity date"
                  type="date"
                  defaultValue={defaultDate}
                  onChange={(event) => { console.log(event); setMaturityDate(event.target.value); }}
                  />
                <FormControl className={classes.formControl}>
                  <InputLabel>Currency</InputLabel>
                  <Select defaultValue={defaultCurrency} onChange={(event) => { setCurrency(event.target.value); }}>
                    <MenuItem value={defaultCurrency}>{defaultCurrency}</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  required
                  autoFocus
                  label="Coupon rate"
                  type="number"
                  onChange={(event) => { setCouponRate(event.target.value); }}
                  />

            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => doIssuance(actualContract)} color="primary">
              Issue
            </Button>
          </DialogActions>
        </Dialog>

      <Grid item xs={12}>
        <Table size="small">
          <TableHead>
            <TableRow className={classes.tableRow}>
              { columns.map(col =>    (<TableCell className={classes.tableCell} key={col[0]}>{col[0]}</TableCell>)) }
              <TableCell className={classes.tableCell} key="dialog">Dialog</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts.map((c, i) => (
              <TableRow key={i} className={classes.tableRow}>
                { columns.map(col => (<TableCell key={col[0]} className={classes.tableCell}>{getValue(c, col[1])}</TableCell>)) }
                  <TableCell key="dialog" className={classes.tableCell}>
                      <Button
                        color="primary"
                        size="small"
                        className="px-2"
                        variant="contained"
                        onClick={() => handleBondIssuanceClick(c)}
                      >
                        Bond issuance
                      </Button>
                    </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Grid>
      </Grid>
    </>);
}