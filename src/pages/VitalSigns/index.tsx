import React, { useState } from "react";
import {
  TableBuilder,
  rowCreator,
  RowCreator,
} from "../../components/TableBuilder";
import { Button } from "react-bootstrap";
import { SubHeader } from "../../components/SubHeader";

import classes from "./styles.module.scss";

export const VitalSigns = () => {
  const [rowElements, setRowElements] = useState<RowCreator[]>([]);
  const handleAddItems = () => {
    const row = rowCreator(
      [
        { value: "asd", editable: true, name: "1" },
        { value: "asd", editable: true, name: "2" },
        { value: "asd", editable: true, name: "3" },
        { value: "asd", editable: true, name: "4" },
      ],
      {
        edit: true,
        editable: true,
      },
      Math.floor(Math.random() * 500000)
    );
    setRowElements([row, ...rowElements]);
  };
  return (
    <>
      <SubHeader>
        <div></div>
        <Button onClick={handleAddItems}>Añadir Registro</Button>
      </SubHeader>
      <TableBuilder
        rowsData={rowElements}
        hasActions={true}
        cols={[
          "Temp",
          "Nivel de Glucosa",
          "Ritmo Cardiaco",
          "Presion Arterial",
        ]}
        onDelete={() => {}}
        onAdd={() => {}}
        onCancel={() => {}}
        onUpdate={() => {}}
      />
    </>
  );
};
