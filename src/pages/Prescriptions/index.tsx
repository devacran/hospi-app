import { TableBuilder, rowCreator } from "../../components/TableBuilder";
export const Prescriptions = () => {
  const rows = [
    rowCreator(["1523", "12312312", "12313", "123123", "123123"]),
    rowCreator(["1523", "12312312", "12313", "123123", "123123"]),
  ];

  return (
    <>
      <TableBuilder
        rowsData={rows}
        cols={[
          "Clave",
          "Medicamento",
          "Dosis",
          "Via Admin",
          "Frecuencia",
          "Acciones",
        ]}
        onDelete={() => {}}
        onAdd={() => {}}
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    </>
  );
};
