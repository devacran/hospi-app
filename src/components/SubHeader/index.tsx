import React from "react";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import classes from "./styles.module.scss";
import cx from "classnames";
export const SubHeader = () => {
  const isRoute = {
    patients: window.location.pathname === "/app/patients",
    vitalSigns: window.location.pathname.includes("vital-signs"),
  };
  return (
    <div className={cx(classes.main, "mt-4", "mb-4")}>
      {isRoute.patients ? (
        <InputGroup className={classes.search}>
          <FormControl aria-describedby="basic-addon1" />
          <InputGroup.Prepend>
            <Button variant="outline-secondary">Button</Button>
          </InputGroup.Prepend>
        </InputGroup>
      ) : (
        <div></div>
      )}
      <Button>Añadir Registro</Button>
    </div>
  );
};
