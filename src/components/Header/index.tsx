import React from "react";
import { useLocation } from "react-router-dom";

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
  console.log(isRoute);
  return (
    <div className="m-3">
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
