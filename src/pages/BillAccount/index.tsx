import React from "react";
import { TableBuilder, rowCreator } from "../../components/TableBuilder";
import { Card, Container, Row, Col } from "react-bootstrap";
import classes from "./styles.module.scss";
export const BillAccount = () => {
  const rows = [
    rowCreator(
      ["1523", "12312312", "12313", "123123"],
      {
        edit: true,
        editable: true,
      },
      Math.floor(Math.random() * 500000)
    ),
    rowCreator(
      ["1523", "12312312", "12313", "123123"],
      {
        edit: true,
        editable: true,
      },
      Math.floor(Math.random() * 500000)
    ),
  ];

  return (
    <>
      <TableBuilder
        rowsData={rows}
        cols={["Cantidad", "Concepto", "Costo", "Costo Total"]}
        onDelete={() => {}}
        onAdd={() => {}}
        onCancel={() => {}}
        onUpdate={() => {}}
        hasActions={false}
      />
      <div className={classes.statusContainer}>
        <Card className={classes.status}>
          <Card.Header className={classes.statusHeader}>
            <div>MAYO 01 -ABR - 15-MAR</div>
            <div>TOTAL A PAGAR</div>
            <div>$1,100.00</div>
          </Card.Header>
          <Card.Body>
            <Container fluid>
              <Row>
                <Col>SubTotal</Col>
                <Col>$800.00</Col>
              </Row>
              <Row>
                <Col>Iva 16%</Col>
                <Col>$300</Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
