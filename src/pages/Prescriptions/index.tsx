import { TableBuilder, rowCreator } from "../../components/TableBuilder";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import { SubHeader } from "../../components/SubHeader";

import classes from "./styles.module.scss";

export const Prescriptions = () => {
  const rows = [
    rowCreator(["1523", "12312312", "12313", "123123", "123123"]),
    rowCreator(["1523", "12312312", "12313", "123123", "123123"]),
  ];

  return (
    <>
      <SubHeader>
        <div></div>
        <Button>Añadir Medicamento</Button>
      </SubHeader>
      <TableBuilder
        rowsData={rows}
        hasActions={true}
        cols={["Clave", "Medicamento", "Dosis", "Via Admin", "Frecuencia"]}
        onDelete={() => {}}
        onAdd={() => {}}
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    </>
  );
};
