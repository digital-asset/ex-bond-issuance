import { ContractId } from "@daml/types";
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl, Grid, InputLabel, MenuItem, Select, Table,
  TableBody, TableCell, TableHead, TableRow, TextField,
  Tooltip
} from "@material-ui/core";
import React, { useState } from "react";
import ReactJson from "react-json-view";
import { shorten, stringifyObject } from "../Util";
import useStyles from "./styles";

type ColumnAction = {
  name : string
  handle : (c : CreateEventLike<any>, p : string) => void
  paramName : string
  items: string[]
  values: string[]
  shouldDisplay : (c : CreateEventLike<any>) => boolean
}

interface CommonFieldSpec { "kind": "date" | "text" | "number" }
interface MenuFieldSpec { "kind": "menu", "items": string[], values: string[] }

type DialogFieldType = CommonFieldSpec | MenuFieldSpec

type DialogFieldSpec = {
  name : string
  fieldType : DialogFieldType
}

type DialogAction = (c : CreateEventLike<any>, p : {}) => void

type ColumnDialog = {
  name : string
  dialogFields : DialogFieldSpec[]
  action : DialogAction
}

type ContractsColumnDialog = ColumnDialog & {
  shouldDisplay?: (c : CreateEventLike<any>) => boolean
}

type ColumnDefinition = {
  name : string
  path : string
  jsonView? : Boolean
}

export declare type CreateEventLike<T extends object> = {
  contractId: ContractId<T>;
  payload: T;
}

type ContractsProps = {
  contracts : readonly CreateEventLike<any>[]
  columns : ColumnDefinition[]
  actions : ColumnAction[]
  dialogs : ContractsColumnDialog[]
}

export const text: CommonFieldSpec = { "kind": "text" }
export const date: CommonFieldSpec = { "kind": "date" }
export const number: CommonFieldSpec = { "kind": "number" }
export function menu(items: string[], values: any[] = []): MenuFieldSpec {
  return { "kind": "menu", "items": items, "values": values }
}
export function field(name: string, fieldType: DialogFieldType): DialogFieldSpec {
  return { name, fieldType }
}

export function partiesAsDialogOptions(parties: any[]) : MenuFieldSpec {
  return menu(parties.map(p => p.displayName), parties.map(p => p.identifier));
}

function isNotEmpty(arr: any[]): boolean {
  return arr.length !== 0;
}
//
function isNotBlank( name : string): boolean {
  return name.length !== 0;
}

type PerformDialogAction = (dialog: ColumnDialog, payload: any) => void

type RenderDialogProps = {
  dialog: ColumnDialog
  stateKey: string
  performDialogAction: PerformDialogAction
}

export function RenderDialog({ dialog, stateKey, performDialogAction } : RenderDialogProps) {

  const dialogOpenStateName = "%isOpen"
  var [state, setState] = useState<any>({});
  const classes = useStyles();

  function setDialogState(name1 : string, name2 : string, value : any) {
    const lvl2 = {...state[name1], [name2]: value };
    setState({ ...state, [name1]: lvl2 });
  }

  function getDialogState(name1 : string, name2 : string, defaultValue : any) : boolean {
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

  function setDialogOpen(name : string, value : boolean) {
    setDialogState(name, dialogOpenStateName, value);
  }

  function getDialogOpen(name : string) : boolean {
    return (state[name] && state[name][dialogOpenStateName]) || false;
  }

  function doDialogAction(stateKey: string, dialog: ColumnDialog) {
    const payload = { ...state[dialog.name] };
    delete payload[dialogOpenStateName];
    performDialogAction(dialog, payload);
    setDialogOpen(stateKey, false);
  }

  function addFormFields(name : string, dialogFieldSpec : DialogFieldSpec[]) {
    return (
      <>
      {dialogFieldSpec.map(spec =>
       <Grid item key={"grid" + spec["name"]} className={classes.marginB}>
       {(spec.fieldType.kind === "menu")
        ?
          <FormControl key={spec.name} fullWidth={true}>
          <InputLabel>{spec.name}</InputLabel>
          <Select
            value={getDialogState(
              name,
              spec.name,
              isNotEmpty(spec.fieldType.values) ? spec.fieldType.values[0] : spec.fieldType.items[0])}
            defaultValue={
              isNotEmpty(spec.fieldType.values)
              ? spec.fieldType.values[0]
              : spec.fieldType.items[0]}
            onChange={(event) => setDialogState(name, spec.name, event.target.value)}>
            {
              spec.fieldType.items.map((item, j) =>
                <MenuItem
                  key={item}
                  value={
                    isNotEmpty((spec.fieldType as MenuFieldSpec).values)
                    ? (spec.fieldType as MenuFieldSpec).values[j]
                    : item}>
                    {item}
                </MenuItem>
              )
            }
          </Select>
          </FormControl>
        : <TextField
            required
            autoFocus
            fullWidth={true}
            key={spec.name}
            label={spec.name}
            type={spec.fieldType.kind}
            onChange={(event) => setDialogState(name, spec["name"], event.target.value)}
            />}
      </Grid>
      )}
      </>
      );
  }

  return (
    <>
      <Button
        color="primary"
        size="small"
        className="px-2"
        variant="outlined"
        onClick={() => setDialogOpen(stateKey, true)}
      >
        {dialog.name}
      </Button>
      <Dialog open={getDialogOpen(stateKey)} onClose={() => ({})} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialog.name}
        </DialogTitle>
        <DialogContent>
          <Grid>
          <form>
            { addFormFields(dialog.name, dialog.dialogFields) }
          </form>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(stateKey, false) } color="primary">
            Cancel
          </Button>
          <Button onClick={() => doDialogAction(stateKey, dialog) } color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function Contracts({ contracts, columns, actions, dialogs } : ContractsProps) {

  const isDefault = columns.length === 0;
  const cols = isDefault ? [] : columns;

  const classes = useStyles();
  var [state, setState] = useState<any>({});
  const handleChange = (name : string) => (event : any) => { setState({ ...state, [name]: event.target.value }); };

  function getByPath(data : any, path : string[]) : any {
    if (path.length === 0) return data;
    if (data[path[0]] === undefined) throw new Error("Object doesn't have key '" + path[0] + "': " + JSON.stringify(data));
    const value = getByPath(data[path[0]], path.slice(1));
    return value;
  }

  function getValue(data : any, path : string) {
    if(path.includes('/')){
      const [numerator, denominator] = path.split('/').map((piece) => {return getByPath(data, safeSplit(piece.trim())) })
      return numerator/denominator;
    }
    else{
      return getByPath(data, safeSplit(path));
    }
  }

  function safeSplit(path : any): string[]{
    return typeof path === "string" && path !== "" ? path.split(".") : [];
  }

  function paramNameForRow(paramName: string, rowId: string): string {
    return `${paramName}-${rowId}`;
  }

  function getOrDefault(value: any, defaultValue: any): any {
    if (value === undefined) {
      return defaultValue;
    }
    return value;
  }

  return (
    <>
      <Grid container spacing={4} className={classes.scrollable}>
      <Grid item xs={12}>
        <Table size="small">
          <TableHead>
            <TableRow className={classes.tableRow}>
              { cols.map(col =>    (<TableCell className={classes.tableCellHead} key={col.name}>{col.name}</TableCell>)) }
              { isDefault ?           (<TableCell className={classes.tableCellHead} key="payload">Payload</TableCell>) : <></>}
              { actions.map(action => (<TableCell className={classes.tableCellHead} key={action.name}>{`Action: ${action.name}`}</TableCell>)) }
              { dialogs.map(dialog => (<TableCell className={classes.tableCellHead} key={dialog.name}>{`Dialog: ${dialog.name}`}</TableCell>)) }
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts.map((c, i) => (
              <TableRow key={i} className={classes.tableRow}>
                { cols.map(col => (!col.jsonView!) ? (
                  <Tooltip key={`tooltip-${col.name}`} className={classes.tableCell} title={stringifyObject(getValue(c, col.path))}>
                  <TableCell key={col.name} className={classes.tableCell}>
                    {
                      shorten(getValue(c, col.path))
                    }
                  </TableCell>
                  </Tooltip>
                  )
                  :
                     (<TableCell key="payload" className={classes.tableCell}>
                        <ReactJson src={(getValue(c,col.path))} name={false} collapsed={true} enableClipboard={false}/>
                      </TableCell>)
                 ) }
                { isDefault
                    ? (<TableCell key="payload" className={classes.tableCell}>
                        <ReactJson src={c.payload} name={false} collapsed={true} enableClipboard={false}/>
                      </TableCell>)
                    : <></> }
                { actions.map(action => (
                  action.shouldDisplay(c)
                  ? <TableCell key={action.name} className={classes.tableCell}>
                      { action.paramName
                        ? isNotEmpty(action.items)
                          ? <Select
                              id="email"
                              value={getOrDefault(state[paramNameForRow(action.paramName, c.contractId)], action.values[0])}
                              onChange={handleChange(paramNameForRow(action.paramName, c.contractId))}
                              onKeyDown={e => {
                                if (e.key === "Enter") {
                                  action.handle(
                                    c,
                                    getOrDefault(state[paramNameForRow(action.paramName, c.contractId)], action.values[0])
                                    );
                                  (e.target as HTMLInputElement).value = "";
                                }
                              }}
                              fullWidth
                            >
                              {
                                action.items.map((item, i) =>
                                <MenuItem key={item} value={action.values[i]}>{item}</MenuItem>
                                )
                              }
                            </Select>
                          : (isNotBlank(action.paramName))?
                            <TextField
                              InputProps={{ classes: { underline: classes.textFieldUnderline, input: classes.textField } }}
                              onChange={handleChange(paramNameForRow(action.paramName, c.contractId))}
                              onKeyDown={e => {
                                if (e.key === "Enter") {
                                  action.handle(c, state[paramNameForRow(action.paramName, c.contractId)]);
                                  (e.target as HTMLInputElement).value = "";
                                }
                              }}
                              placeholder={action.paramName}
                              value={
                                getOrDefault(state[paramNameForRow(action.paramName, c.contractId)], "")
                              }
                            />
                            :<></>
                        : <></> }
                      <Button
                        color="primary"
                        size="small"
                        className="px-2"
                        variant="contained"
                        onClick={() =>
                          action.handle(c,
                            getOrDefault(state[paramNameForRow(action.paramName, c.contractId)],
                                         (action.values === undefined ? undefined : action.values[0])))}
                      >
                        {action.name}
                      </Button>
                    </TableCell>
                  : <TableCell key={action.name}/>
                  )
                )}
                { dialogs.map(dialog => (
                  <TableCell key={dialog.name} className={classes.tableCell}>
                    { !dialog.shouldDisplay || dialog.shouldDisplay(c)
                      ?
                      <RenderDialog
                        dialog={dialog}
                        stateKey={paramNameForRow(dialog.name, c.contractId)}
                        performDialogAction={(dialog, payload) => dialog.action(c, payload)}
                      />
                      :
                      <></>
                    }
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
