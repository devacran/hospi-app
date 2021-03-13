import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import classes from "./styles.module.scss";
import { ChargesList } from "./components/ChargesList";

export const BillAccount = () => {
  return (
    <>
      <ChargesList />
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
