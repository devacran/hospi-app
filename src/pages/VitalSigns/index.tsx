import { TableBuilder, rowCreator } from "../../components/TableBuilder";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import { SubHeader } from "../../components/SubHeader";

import classes from "./styles.module.scss";

export const VitalSigns = () => {
  const rows = [
    rowCreator(
      [
        { value: "asd", editable: true, name: "1" },
        { value: "asd", editable: true, name: "1" },
        { value: "asd", editable: true, name: "1" },
        { value: "asd", editable: true, name: "1" },
      ],
      {
        edit: true,
        editable: true,
      },
      Math.floor(Math.random() * 500000)
    ),
  ];

  return (
    <>
      <SubHeader>
        <div></div>
        <Button>Añadir Registro</Button>
      </SubHeader>
      <TableBuilder
        rowsData={rows}
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
