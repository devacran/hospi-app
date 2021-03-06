import React, { FC, useState, useEffect } from "react";
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

export type RowCreator = {
  cols: ColValue[];
  options: any;
  rowId: string | number;
};
export type ColValue =
  | string
  | number
  | { value: string | number; editable: boolean };

export function rowCreator(
  colValues: ColValue[],
  options: any = {},
  rowId: number | string
): RowCreator {
  return { cols: [...colValues], options, rowId };
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
  const [rowsToShow, setRowsToShow] = useState<RowCreator[]>([]);
  const [currentField, setCurrentField] = useState<{
    inputName: string;
    value: any;
  }>({ inputName: "", value: "" });

  useEffect(() => {
    setRowsToShow(rowsData);
  }, [rowsData]);

  const handleAdd = (value: any) => {
    console.log(value);
    console.log(rowsData);
  };
  // const updateRegistry = ()=>{
  //   send({
  //     registriId: //rowId,
  //     eachFieldData
  //   })
  // }

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowId: string | number,
    colPosition: number
  ) => {
    setCurrentField({ inputName: e.target.name, value: e.target.value });
  };

  const getInputValue = (value: any, fieldName: string) => {
    if (currentField.inputName === fieldName) {
      return currentField.value;
    } else {
      return value;
    }
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
            <TableRow key={data.rowId}>
              {data.cols.map((value, key) => (
                <TableCell align="right">
                  <input
                    name="Mi nombre"
                    value={
                      typeof value === "object"
                        ? getInputValue(value.value, "Mi nombre")
                        : value
                    }
                    onChange={(e) => onInputChange(e, data.rowId, key)}
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
