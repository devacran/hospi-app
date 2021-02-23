import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  Close,
  Check,
  Create,
  RemoveCircleOutlineOutlined,
} from "@material-ui/icons";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export function rowCreator<T>(
  rowValues: T[]
): Record<string | typeof [], JSX.Element | T> {
  const actions = (
    <>
      <Close />
      <Create />
      <RemoveCircleOutlineOutlined />
      <Check />
    </>
  );
  return { ...rowValues, actions };
}
type rowCreator = {
  actions: JSX.Element;
};

export function columnCreator(columnValue: string) {
  return <TableCell align="right">columnValue</TableCell>;
}

const rows = [
  rowCreator<string | number>(["Frozen yoghurt", "asda", 45, 45, 54]),
];

type VitalSignsProps = {
  rows: [];
};
export const VitalSigns = ({
  rows,
  cols,
  onDelete,
  onCancel,
  onConfirm,
  onAdd,
}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {cols.map((name) => (
              <TableCell align="right">Name</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.date}>
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.glucose}</TableCell>
              <TableCell align="right">{row.heartRate}</TableCell>
              <TableCell align="right">{row.bloodPressure}</TableCell>
              <TableCell align="right">{row.actions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
