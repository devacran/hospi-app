import React, { useState } from "react";
import {
  TableBuilder,
  rowCreator,
  RowCreator,
} from "../../components/TableBuilder";
import { SubHeader } from "../../components/SubHeader";
import { Button, Modal } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import Select from "react-select/async";
import { RemoveCircleOutlineOutlined } from "@material-ui/icons";
import classes from "./styles.module.scss";

type MedicineType = {
  id: number;
  compound: string;
  unitPrice: number;
  concentration: string;
};
export const Prescriptions = () => {
  const [modal, setModal] = useState(false);
  const [rowElements, setRowElements] = useState<RowCreator[]>([]);

  const [selectedItems, setSelectedItems] = useState<MedicineType[]>([]);
  const options = [
    { id: 1, compound: "Paracetamol", unitPrice: 123, concentration: "23/g" },
    { id: 2, compound: "Otra medicina", unitPrice: 123, concentration: "23/g" },
    { id: 3, compound: "Otra mas", unitPrice: 123, concentration: "23/g" },
  ];
  const handleChange = (item: any) => {
    setSelectedItems([...selectedItems, item]);
  };
  const handleRemoveItem = (item: any) => {
    const i = selectedItems.findIndex((item) => item.id === 1);
    const newSelectedItems = selectedItems.splice(i + 1, 1);
    console.log(i, newSelectedItems);
    setSelectedItems(newSelectedItems);
  };
  const handleAddItems = () => {
    setModal(false);
    const rows = selectedItems.map((i) =>
      rowCreator([
        i.id,
        i.compound + " " + i.concentration,
        "---",
        "---",
        "---",
      ])
    );
    setRowElements([...rowElements, ...rows]);
    setSelectedItems([]);
  };
  console.log(selectedItems);
  return (
    <>
      <SubHeader>
        <div></div>
        <Button onClick={() => setModal(true)}>Añadir Registro</Button>
      </SubHeader>
      <TableBuilder
        hasActions={true}
        rowsData={rowElements}
        cols={["Clave", "Medicamento", "Dosis", "Via Admin", "Frecuencia"]}
        onDelete={() => {}}
        onAdd={() => {}}
        onCancel={() => {}}
        onConfirm={() => {}}
      />
      <Modal
        show={modal}
        onHide={() => setModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Administracion de Medicamentos</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Select
            onChange={handleChange}
            placeholder={"Ingresa el nombre del medicamento"}
            loadOptions={() => Promise.resolve(options)}
          />
          <ListGroup>
            {selectedItems.map((i) => {
              return (
                <ListGroup.Item>
                  <span>
                    <Button onClick={() => handleRemoveItem(i)}>
                      <RemoveCircleOutlineOutlined />
                    </Button>
                  </span>
                  {i.compound}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModal(false)}>
            Close
          </Button>
          <Button onClick={handleAddItems} variant="primary">
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
