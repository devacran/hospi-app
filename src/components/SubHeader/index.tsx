import React from "react";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import classes from "./styles.module.scss";
import cx from "classnames";
export const SubHeader = () => {
  return (
    <div className={cx(classes.main, "mt-4", "mb-4")}>
      <InputGroup className={classes.search}>
        <FormControl aria-describedby="basic-addon1" />
        <InputGroup.Prepend>
          <Button variant="outline-secondary">Button</Button>
        </InputGroup.Prepend>
      </InputGroup>
      <Button>Añadir Registro</Button>
    </div>
  );
};
