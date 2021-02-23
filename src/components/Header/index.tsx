import React from "react";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  console.log(location);
  const isRoute = {
    patients: location.pathname === "/app/patients",
    patient: location.pathname === "/app/patient/:id",
    vitalSigns: location.pathname.split("/")[3] === "vital-signs",
  };

  return (
    <div className="m-3">
      <h1 className="h1">
        {isRoute.patients
          ? "Pacientes"
          : isRoute.vitalSigns
          ? "Signos Vitales"
          : ""}
      </h1>
    </div>
  );
};
