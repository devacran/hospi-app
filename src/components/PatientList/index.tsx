import classes from "./styles.module.scss";
import React from "react";
import { Table, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
export const PatientList = () => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#Expediente</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Tipo de Paciente</th>
            <th>Habitacion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <Link to="patients/1">Mark</Link>
            </td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>123</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>234</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td>@twitter</td>
            <td>Normal</td>
            <td>123</td>
          </tr>
        </tbody>
      </Table>
      <div className={classes.pagination}>
        <Pagination>
          <Pagination.Item key={1} active={true}>
            1
          </Pagination.Item>
          <Pagination.Item key={2} active={false}>
            2
          </Pagination.Item>
        </Pagination>
      </div>
    </>
  );
};
