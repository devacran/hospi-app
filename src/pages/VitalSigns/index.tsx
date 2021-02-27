import React, { useState } from "react";
import { TableBuilder, rowCreator } from "../../components/TableBuilder";
import { SubHeader } from "../../components/SubHeader";
import { Button, Modal } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import Select from "react-select/async";
import { RemoveCircleOutlineOutlined } from "@material-ui/icons";

import classes from "./styles.module.scss";
export const VitalSigns = () => {
  const [modal, setModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState<
    { value: string; label: string }[]
  >([]);

  const rows = [
    rowCreator(["1523", "12312312", "12313", "123123"]),
    rowCreator(["1523", "12312312", "12313", "123123"]),
  ];
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const handleChange = (item: any) => {
    setSelectedItems([...selectedItems, item]);
  };
  const handleRemoveItem = (item: any) => {
    const i = selectedItems.findIndex((item) => item.label === "Chocolate");
    const newSelectedItems = selectedItems.splice(i + 1, 1);
    console.log(i, newSelectedItems);
    setSelectedItems(newSelectedItems);
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
                  {i.label}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModal(false)}>
            Close
          </Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
