import { TableBuilder, rowCreator } from "../../components/TableBuilder";
import { SubHeader } from "../../components/SubHeader";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import classes from "./styles.module.scss";

export const VitalSigns = () => {
  const rows = [
    rowCreator(["1523", "12312312", "12313", "123123"]),
    rowCreator(["1523", "12312312", "12313", "123123"]),
  ];

  return (
    <>
      <SubHeader>
        <div></div>
        <Button>Añadir Registro</Button>
      </SubHeader>
      <TableBuilder
        hasActions={true}
        rowsData={rows}
        cols={[
          "Temp",
          "Nivel de Glucosa",
          "Ritmo Cardiaco",
          "Presion Arterial",
        ]}
        onDelete={() => {}}
        onAdd={() => {}}
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    </>
  );
};
