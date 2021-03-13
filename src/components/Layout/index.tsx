import React, { FC } from "react";
import { MainMenu } from "../MainMenu";
import { Header } from "../Header";
import classes from "./styles.module.scss";
import { Container, Row } from "react-bootstrap";

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className={classes.main}>
      <div className={classes.menu}>
        <MainMenu />
      </div>
      <Container fluid className="vh-100 overflow-auto">
        <Row>
          <Header />
        </Row>
        <Row>
          <div className={classes.content}>{children}</div>
        </Row>
      </Container>
    </div>
  );
};
