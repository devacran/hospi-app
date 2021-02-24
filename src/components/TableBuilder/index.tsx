import React, { FC } from "react";
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

export type RowCreator = Array<JSX.Element | string | number>;

export function rowCreator(rowValues: Array<string | number>): RowCreator {
  const actions = (
    <>
      <Close />
      <Create />
      <RemoveCircleOutlineOutlined />
      <Check />
    </>
  );
  return [...rowValues, actions];
}

type VitalSignsProps = {
  rowsData: Array<string | number>[];
  cols: Array<string>;
  onDelete: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  onAdd: () => void;
};

export const VitalSigns: FC<VitalSignsProps> = ({
  rowsData,
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
          {rowsData.map((row: Array<string | number>) => (
            <TableRow>
              {row.map((value) => (
                <TableCell align="right">value</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
