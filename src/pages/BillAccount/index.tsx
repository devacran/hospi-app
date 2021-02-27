import { TableBuilder, rowCreator } from "../../components/TableBuilder";
export const BillAccount = () => {
  const rows = [
    rowCreator(["1523", "12312312", "12313", "123123"]),
    rowCreator(["1523", "12312312", "12313", "123123"]),
  ];

  return (
    <>
      <TableBuilder
        rowsData={rows}
        cols={["Cantidad", "Concepto", "Costo", "Costo Total"]}
        onDelete={() => {}}
        onAdd={() => {}}
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    </>
  );
};
