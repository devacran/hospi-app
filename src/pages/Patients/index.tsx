import React from "react";
import classes from "./styles.module.scss";
import { InputGroup, Button, FormControl } from "react-bootstrap";

import { PatientList } from "./components/PatientList";
import { SubHeader } from "../../components/SubHeader";
export const Patients = () => (
  <div className={classes.main}>
    <SubHeader>
      <InputGroup className={classes.search}>
        <FormControl aria-describedby="basic-addon1" />
        <InputGroup.Prepend>
          <Button variant="outline-secondary">Button</Button>
        </InputGroup.Prepend>
      </InputGroup>
      <Button>Añadir Registro</Button>
    </SubHeader>
    <PatientList />
  </div>
);
