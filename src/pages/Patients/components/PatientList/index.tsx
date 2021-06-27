import React, { FC } from "react";
import classes from "./styles.module.scss";
import { Link } from "react-router-dom";
import {
  TablePagination,
  Table,
  TableFooter,
  TableBody,
} from "@material-ui/core/";

import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

type PatientsListProps = {
  rows: unknown[];
};

export const PatientList: FC<PatientsListProps> = ({ rows }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Expediente</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Apellido</TableCell>
              <TableCell align="right">Tipo de paciente</TableCell>
              <TableCell align="right">Habitacion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="right">{row.nss}</TableCell>
                <TableCell style={{ color: "#3f94c7" }} align="right">
                  <Link to={`patients/${row.id}`}>{row.name}</Link>
                </TableCell>
                <TableCell align="right">{row.last_name}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.room}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={10}
                page={1}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={() => null}
                onChangeRowsPerPage={() => null}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};
