import classes from "./styles.module.scss";
import React from "react";
import { Table, Pagination } from "react-bootstrap";

export const PatientList = () => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
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
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
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
