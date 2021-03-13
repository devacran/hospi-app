import React from "react";
import classes from "./styles.module.scss";
import { Table, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ChargesList = () => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Concepto</th>
            <th>Costo</th>
            <th>Costo Total </th>
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
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td>@twitter</td>
            <td>Normal</td>
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
