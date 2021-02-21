import React from "react";
import styles from "./styles.module.scss";
import { PatientList } from "./components/PatientList";
import { SubHeader } from "../../components/SubHeader";
export const Patients = () => (
  <div className={styles.main}>
    <SubHeader />
    <PatientList />
  </div>
);
