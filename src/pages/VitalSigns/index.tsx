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

function createData(
  date: string,
  temp: string,
  glucose: number,
  heartRate: number,
  bloodPressure: number
) {
  const actions = (
    <>
      <Close />
      <Create />
      <RemoveCircleOutlineOutlined />
      <Check />
    </>
  );
  return { date, temp, glucose, heartRate, bloodPressure, actions };
}

const rows = [createData("Frozen yoghurt", "asda", 45, 45, 54)];

export const VitalSigns = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell align="right">Temp</TableCell>
            <TableCell align="right">Nivel de Glucosa</TableCell>
            <TableCell align="right">Ritmo Cardiaco</TableCell>
            <TableCell align="right">Presion Arterial</TableCell>
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
