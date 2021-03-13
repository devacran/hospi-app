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
export type ColValue = {
  value: string | number;
  editable: boolean;
  name: string;
};

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
  onAdd: (currentRow: CurrentRowType) => void;
  hasActions: boolean;
};

type CurrentRowType = Record<string, string | number>;

export const TableBuilder: FC<TableBuilderProps> = ({
  rowsData,
  cols,
  onDelete,
  onCancel,
  onUpdate,
  onAdd,
  hasActions,
}) => {
  const [rowsToShow, setRowsToShow] = useState<RowCreator[]>([]);
  const [editingRows, setEditingRows] = useState<
    Record<string | number, CurrentRowType>
  >({});

  const setEditingRowData = (rowId?: number | string) => {
    let currentRowData;
    if (rowId) {
      const index = rowsData.findIndex((x) => x.rowId === rowId);
      currentRowData = rowsData[index];
      const reducedRowData = currentRowData?.cols.reduce<
        Record<string, string | number>
      >((a, c) => {
        a[c.name] = c.value;
        return a;
      }, {});
      reducedRowData &&
        setEditingRows({
          ...editingRows,
          [currentRowData.rowId]: reducedRowData,
        });
    } else {
      const rowsToEdit = rowsData.filter((x) => typeof x.rowId === "number");
      if (rowsToEdit) {
        let newEditingRows = {};
        rowsToEdit.forEach((currentRowData) => {
          const reducedRowData = currentRowData?.cols.reduce<
            Record<string, string | number>
          >((a, c) => {
            a[c.name] = c.value;
            return a;
          }, {});

          newEditingRows = {
            ...newEditingRows,
            [currentRowData.rowId]: reducedRowData,
          };
        });
        newEditingRows &&
          setEditingRows({
            ...editingRows,
            ...newEditingRows,
          });
      }
    }
    // else {
    //   console.log("rowsData", rowsData);
    //   currentRowData = rowsData[rowsData.length - 1];
    // }
  };

  const handleAdd = (rowId: string | number) => {
    const data = editingRows[rowId];
    //Send to Api UPDATE if id is string CREATE if iid is number
    //then
    const newEditingRows = { ...editingRows };
    delete newEditingRows[rowId];
    setEditingRows(newEditingRows);

    const index = rowsToShow.findIndex((x) => x.rowId === rowId);
    const updatedCol = rowsToShow[index].cols.map((x) => {
      console.log(x);
      return {
        ...x,
        value: data[x.name],
      };
    });
    const newRowsToShow = [...rowsToShow];
    newRowsToShow[index].cols = updatedCol;
    newRowsToShow[index].rowId = "TU OUTAS";

    setRowsToShow(newRowsToShow);
  };

  const handleDelete = (rowId: string | number) => {
    if (typeof rowId === "string") {
      //do request
    }
    const newRowsToShow = [...rowsToShow];
    const i = newRowsToShow.findIndex((x) => x.rowId === rowId);
    newRowsToShow.splice(i, 1);
    setRowsToShow(newRowsToShow);
  };

  const handleCancel = (rowId: string | number) => {
    const newEditingRows = { ...editingRows };
    delete newEditingRows[rowId];
    setEditingRows(newEditingRows);
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowId: number | string
  ) => {
    if (editingRows[rowId]) {
      editingRows[rowId][e.target.name] = e.target.value;
      setEditingRows({
        ...editingRows,
        [rowId]: { ...editingRows[rowId], [e.target.name]: e.target.value },
      });
    }
    // else {
    //   setEditingRowData(rowId);
    // }
  };

  const getInputValue = (
    value: any,
    fieldName: string,
    rowId: string | number
  ) => {
    if (editingRows[rowId]) {
      return editingRows[rowId][fieldName];
    } else {
      return value;
    }
  };

  useEffect(() => {
    setRowsToShow(rowsData);
    setEditingRowData();
  }, [rowsData]);

  const classes = useStyles();
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
          {rowsToShow.map((data: RowCreator) => (
            <TableRow key={data.rowId}>
              {data.cols.map((value, key) => (
                <TableCell align="right">
                  <input
                    name={value.name}
                    value={getInputValue(value.value, value.name, data.rowId)}
                    onChange={(e) => onInputChange(e, data.rowId)}
                  />
                </TableCell>
              ))}
              {hasActions && (
                <TableCell align="right">
                  {editingRows[data.rowId] && typeof data.rowId === "number" && (
                    <button onClick={() => handleAdd(data.rowId)}>
                      <Check />
                    </button>
                  )}
                  {editingRows[data.rowId] && typeof data.rowId === "string" && (
                    <>
                      <button onClick={() => handleCancel(data.rowId)}>
                        <Close />
                      </button>
                      <button onClick={() => handleAdd(data.rowId)}>
                        <Check />
                      </button>
                    </>
                  )}
                  {!editingRows[data.rowId] && (
                    <button onClick={() => setEditingRowData(data.rowId)}>
                      <Create />
                    </button>
                  )}
                  <button onClick={() => handleDelete(data.rowId)}>
                    <RemoveCircleOutlineOutlined />
                  </button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
