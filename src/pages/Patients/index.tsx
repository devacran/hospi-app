import React, { useEffect, useState } from "react";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import axios from "axios";
import classes from "./styles.module.scss";
import { PatientList } from "./components/PatientList";
import appConfig from "../../config";
import { SubHeader } from "../../components/SubHeader";

export const Patients = () => {
  const [patientsList, setPatientsList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data: patients },
        } = await axios(`${appConfig.API}/patients`);
        setPatientsList(patients);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
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
      <PatientList rows={patientsList} />
    </div>
  );
};
