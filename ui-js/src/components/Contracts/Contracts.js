import React, { useState } from "react";
import ReactJson from "react-json-view";
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, Grid, Table, TableHead, TableRow, TableCell, TableBody, TextField, Button } from "@material-ui/core";
import { useStyles } from "./styles";

export function field(name, fieldType, items, itemNames) {
  return {
    "name": name,
    "type": items ? "menu" : fieldType,
    "items": items,
    "itemNames" : itemNames || items
  };
}

export default function Contracts({ contracts, columns, actions=[], dialogs=[] }) {

  actions = actions ? actions : [];
  const isDefault = !columns;
  columns = columns ? columns : [ [ "TemplateId", "templateId" ], [ "ContractId", "contractId" ] ];
  dialogs = dialogs ? dialogs : [];

  const classes = useStyles();

  var [state, setState] = useState({});
  const handleChange = name => (event => { setState({ ...state, [name]: event.target.value }); });

  const dialogOpenStateName = "%isOpen"
  function setDialogState(name1, name2, value) {
    const lvl2 = {...state[name1], [name2]: value };
    setState({ ...state, [name1]: lvl2 });
  }

  function getDialogState(name1, name2, defaultValue) {
    if (state[name1] === undefined) {
      state[name1] = {};
    }
    const value = state[name1][name2];
    if (value === undefined) {
      state[name1][name2] = defaultValue;
      return defaultValue;
    } else {
      return value;
    }
  }

  function getByPath(data, path) {
    if (path.length === 0) return data;
    if (data[path[0]] === undefined) throw new Error("Object doesn't have key '" + path[0] + "': " + JSON.stringify(data));
    const value = getByPath(data[path[0]], path.slice(1));
    return value;
  }

  function getValue(data, path) {
    const split = typeof path === "string" && path !== "" ? path.split(".") : [];
    return getByPath(data, split);
  }

  function setDialogOpen(name, value) {
    setDialogState(name, dialogOpenStateName, value);
  }

  function getDialogOpen(name) {
    return (state[name] && state[name][dialogOpenStateName]) || false;
  }

  function doDialogAction(name, action, contract) {
    const payload = { ...state[name] };
    delete payload[dialogOpenStateName];
    action(contract, payload);
    setDialogOpen(name, false);
  }

  function addFormFields(name, dialogFieldSpec) {
    return (
      <>
      {dialogFieldSpec.map(spec =>
       <Grid item key={spec["name"]} className={classes.marginB}>
       {(spec["type"] === "menu")
        ?
          <FormControl className={classes.formControl} key={spec["name"]} fullWidth={true}>
          <InputLabel>{spec["name"]}</InputLabel>
          <Select value={getDialogState(name, spec["name"], spec["items"][0])} defaultValue={spec["items"][0]} onChange={(event) => setDialogState(name, spec["name"], event.target.value)}>
            {
              spec["items"].map((item, i) =>
                <MenuItem key={item} value={item}>{spec["itemNames"][i]}</MenuItem>
              )
            }
          </Select>
          </FormControl>
        : <TextField
            required
            autoFocus
            fullWidth={true}
            key={spec["name"]}
            label={spec["name"]}
            type={spec["type"]}
            onChange={(event) => setDialogState(name, spec["name"], event.target.value)}
            />}
      </Grid>
      )}
      </>
      );
  }

  return (
    <>
      <Grid container spacing={4}>
      <Grid item xs={12}>
        <Table size="small">
          <TableHead>
            <TableRow className={classes.tableRow}>
              { columns.map(col =>    (<TableCell className={classes.tableCell} key={col[0]}>{col[0]}</TableCell>)) }
              { isDefault ?           (<TableCell className={classes.tableCell} key="payload">Payload</TableCell>) : <></>}
              { actions.map(action => (<TableCell className={classes.tableCell} key={action[0]}>{action[0]}</TableCell>)) }
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts.map((c, i) => (
              <TableRow key={i} className={classes.tableRow}>
                { columns.map(col => (<TableCell key={col[0]} className={classes.tableCell}>{getValue(c, col[1])}</TableCell>)) }
                { isDefault
                    ? (<TableCell key="payload" className={classes.tableCell}>
                        <ReactJson src={c.payload} name={false} collapsed={true} enableClipboard={false}/>
                      </TableCell>)
                    : <></> }
                { actions.map(action => (
                  <TableCell key={action[0]} className={classes.tableCell}>
                      { action.length > 2
                        ? <TextField
                            InputProps={{ classes: { underline: classes.textFieldUnderline, input: classes.textField } }}
                            onChange={handleChange(action[2])}
                            onKeyDown={e => {
                              if (e.key === "Enter") {
                                action[1](c, state[action[2]]);
                                e.target.value = "";
                              }
                            }}
                            placeholder={action[2]}
                          />
                        : <></> }
                      <Button
                        color="primary"
                        size="small"
                        className="px-2"
                        variant="contained"
                        onClick={() => action[1](c, state[action[2]])}
                      >
                        {action[0]}
                      </Button>
                    </TableCell>)
                )}
                { dialogs.map(dialog => (
                  <TableCell key={dialog[0]} className={classes.tableCell}>
                      <Button
                        color="primary"
                        size="small"
                        className="px-2"
                        variant="contained"
                        onClick={() => setDialogOpen(dialog[0], true)}
                      >
                        {dialog[0]}
                      </Button>
                    <Dialog open={getDialogOpen(dialog[0])} onClose={() => ({})} maxWidth="sm" fullWidth>
                      <DialogTitle>
                        {dialog[0]}
                      </DialogTitle>
                      <DialogContent>
                        <Grid>
                        <form className={classes.root}>
                          {addFormFields(dialog[0], dialog[1])}
                        </form>
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setDialogOpen(dialog[0], false)} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={() => doDialogAction(dialog[0], dialog[2], c) } color="primary">
                          Okay
                        </Button>
                      </DialogActions>
                    </Dialog>
                </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Grid>
      </Grid>
    </>
  );
}
