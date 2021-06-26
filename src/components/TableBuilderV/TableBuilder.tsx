import React, { FC, useState, useEffect } from "react";
import { clone } from "ramda";
import classes from "./styles.module.scss";
import { Table, TextField } from "@material-ui/core";
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
import swal from "sweetalert";

export type RowObject = {
  data: ColValue[];
  editData: ColValue[];
  rowId: number;
  isNew: boolean;
  isEdit: boolean;
};
export type ColValue = {
  value: string | number;
  editable: boolean;
  name: string;
};

export function rowCreator(rowData: {
  data: ColValue[];
  isEdit: boolean;
  isNew: boolean;
  rowId: number;
}): RowObject {
  return { ...rowData, editData: [...rowData.data] };
}

type TableBuilderProps = {
  rows: RowObject[];
  setRows: (rows: RowObject[]) => void;
  cols: string[];
  onDelete: (rowId: number) => Promise<number>;
  onUpdate: (values: CurrentRowType, rowId: number) => Promise<number | null>;
  onAdd: (currentRow: CurrentRowType) => Promise<number>;
  hasActions: boolean;
};

type CurrentRowType = Record<string, string | number>;

const TableBuilder = ({
  rows,
  setRows,
  cols,
  onDelete,
  onUpdate,
  onAdd,
  hasActions,
}: TableBuilderProps): JSX.Element => {
  const handleSave = async (rowData: RowObject) => {
    const isUpdate = !rowData.isNew;
    const dataToSave = rowData.editData.reduce(
      (dataToSave, { name, value }, i) => {
        return { ...dataToSave, [name]: value };
      },
      {}
    );
    try {
      const index = rows.findIndex((x) => x.rowId === rowData.rowId);
      const newRowsToShow = clone(rows);
      if (isUpdate) {
        await onUpdate(dataToSave, rowData.rowId);
        newRowsToShow[index].isEdit = false;
        newRowsToShow[index].data = newRowsToShow[index].editData;
      } else {
        const newRowId = await onAdd(dataToSave);
        newRowsToShow[index].rowId = newRowId;
        newRowsToShow[index].isNew = false;
        newRowsToShow[index].isEdit = false;
        newRowsToShow[index].data = newRowsToShow[index].editData;
      }
      setRows(newRowsToShow);
    } catch (error) {
      swal({
        title: "Error",
        text: "Ups parece que hubo un error",
        icon: "error",
        buttons: { confirm: true },
      });
    }
  };

  const handleEdit = (rowData: RowObject): void => {
    const newRowsToShow = clone(rows);
    const index = rows.findIndex((x) => x.rowId === rowData.rowId);
    newRowsToShow[index].isEdit = true;
    setRows(newRowsToShow);
  };

  const handleDelete = async (rowId: number) => {
    try {
      await onDelete(rowId);
      const newRowsToShow = clone(rows);
      const i = newRowsToShow.findIndex((x) => x.rowId === rowId);
      newRowsToShow.splice(i, 1);
      setRows(newRowsToShow);
    } catch (e) {
      swal({
        title: "Error",
        text: "Ups parece que hubo un error",
        icon: "error",
        buttons: { confirm: true },
      });
    }
  };

  const handleCancel = (rowData: RowObject, rowIndex: number) => {
    const newRowsToShow = clone(rows);
    if (rowData.isNew) {
      newRowsToShow.splice(rowIndex, 1);
    } else {
      const originalData = rows.find((x) => x.rowId === rowData.rowId);
      if (originalData) {
        newRowsToShow[rowIndex].editData = originalData.data;
        newRowsToShow[rowIndex].isEdit = false;
      }
    }
    setRows(newRowsToShow);
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    const newRowsToShow = clone(rows);
    const currentValue = newRowsToShow[rowIndex].data[colIndex];
    const newValue = { ...currentValue, value: e.target.value };
    newRowsToShow[rowIndex].editData[colIndex] = newValue;
    setRows(newRowsToShow);
  };

  const getInputValue = (
    rowData: RowObject,
    rowIndex: number,
    colIndex: number
  ) => {
    if (rowData.isEdit) {
      return rows[rowIndex].editData[colIndex].value;
    } else {
      return rows[rowIndex].data[colIndex].value;
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {cols.map((name, i) => (
              <TableCell key={i} align="right">
                {name}
              </TableCell>
            ))}
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((rowData: RowObject, rowIndex: number) => (
            <TableRow key={rowData.rowId}>
              {rowData.data.map((value, colIndex) => (
                <TableCell align="right">
                  {value.editable && rowData.isEdit ? (
                    <TextField
                      name={value.name}
                      value={getInputValue(rowData, rowIndex, colIndex)}
                      onChange={(e) => onInputChange(e, rowIndex, colIndex)}
                    />
                  ) : (
                    value.value
                  )}
                </TableCell>
              ))}
              <TableCell align="right">
                {hasActions && (
                  <>
                    {rowData.isEdit && (
                      <>
                        <button
                          className={classes.actionBtns}
                          onClick={() => handleCancel(rowData, rowIndex)}
                        >
                          <Close />
                        </button>
                        <button
                          className={classes.actionBtns}
                          onClick={() => handleSave(rowData)}
                        >
                          <Check />
                        </button>
                      </>
                    )}
                    {!rowData.isEdit && (
                      <button
                        className={classes.actionBtns}
                        onClick={() => handleEdit(rowData)}
                      >
                        <Create />
                      </button>
                    )}
                  </>
                )}
                {!rowData.isNew && (
                  <button
                    className={classes.actionBtns}
                    onClick={() => {
                      handleDelete(rowData.rowId);
                    }}
                  >
                    <RemoveCircleOutlineOutlined />
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TableBuilder;
