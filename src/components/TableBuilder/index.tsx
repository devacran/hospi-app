import React, { FC, useState } from "react";
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

export type RowCreator = { rows: RowValue[]; options: any };
export type RowValue =
  | string
  | number
  | { value: string | number; editable: boolean };
export function rowCreator(
  rowValues: RowValue[],
  options: any = {}
): RowCreator {
  return { rows: [...rowValues], options };
}

type TableBuilderProps = {
  rowsData: RowCreator[];
  cols: string[];
  onDelete: () => void;
  onCancel: () => void;
  onUpdate: () => void;
  onAdd: () => void;
  hasActions: boolean;
};

export const TableBuilder: FC<TableBuilderProps> = ({
  rowsData,
  cols,
  onDelete,
  onCancel,
  onUpdate,
  onAdd,
  hasActions,
}) => {
  const classes = useStyles();
  const [currentRow, setCurrentRow] = useState([]);

  const handleAdd = (value: any) => {
    console.log(value);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {cols.map((name) => (
              <TableCell align="right">{name}</TableCell>
            ))}
            {hasActions && <TableCell align="right">Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData.map((data: RowCreator) => (
            <TableRow>
              {data.rows.map((value) => (
                <TableCell align="right">
                  <input
                    value={typeof value === "object" ? value.value : value}
                    onChange={onInputChange}
                  />
                </TableCell>
              ))}
              {hasActions && (
                <TableCell align="right">
                  {data.options.edit && (
                    <button onClick={() => handleAdd(data)}>
                      <Check />
                    </button>
                  )}
                  {data.options.update && (
                    <>
                      <Close />
                      <Check />
                    </>
                  )}
                  {!data.options.edit && !data.options.update && <Create />}
                  <RemoveCircleOutlineOutlined />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
