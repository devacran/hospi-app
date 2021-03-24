import React from "react";
import { useLocation } from "react-router-dom";
import classes from "./styles.module.scss";
import cx from "classnames";

export const Header = () => {
  const location = useLocation();
  const patientId = location.pathname.split("/")[3];
  const childRoute = location.pathname.split("/")[4];
  const isRoute = {
    patients: location.pathname === "/app/patients",
    patientDashboard: patientId && !childRoute,
    vitalSigns: childRoute === "vital-signs",
    billAccount: childRoute === "bill-account",
    prescriptions: childRoute === "prescriptions",
  };
  return (
    <div className={cx("m-3", classes.main)}>
      <h1 className="h1">
        {isRoute.patients
          ? "Pacientes"
          : isRoute.vitalSigns
          ? "Signos Vitales"
          : isRoute.patientDashboard
          ? "Informacion del Paciente"
          : isRoute.billAccount
          ? "Estado de Cuenta"
          : isRoute.prescriptions
          ? "Prescripciones"
          : ""}
      </h1>
    </div>
  );
};
