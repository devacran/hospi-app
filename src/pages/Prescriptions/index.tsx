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
import { ListItem } from "react-bootstrap/lib/Media";

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
    setSelectedItems(newSelectedItems);
  };
  const handleAddItems = () => {
    setModal(false);
    const rows = selectedItems.map((i) =>
      rowCreator(
        [
          {
            value: i.compound + " " + i.concentration,
            editable: true,
            name: "compound",
          },
          { value: "---", editable: true, name: "asd" },
          { value: "---", editable: true, name: "sd" },
          { value: "every day", editable: true, name: "shs" },
          { value: "today", editable: false, name: "shs" },
        ],
        {
          edit: true,
          editable: true,
        },
        String(Math.floor(Math.random() * 500000))
      )
    );
    setRowElements([...rowElements, ...rows]);
    setSelectedItems([]);
  };
  return (
    <>
      <SubHeader>
        <div></div>
        <Button onClick={() => setModal(true)}>Añadir Registro</Button>
      </SubHeader>
      <TableBuilder
        hasActions={true}
        rowsData={rowElements}
        cols={["Medicamento", "Dosis", "Via Admin", "Frecuencia", "Fecha"]}
        onDelete={(rowId: number) => Promise.resolve(null)}
        onAdd={() => Promise.reject(null)}
        onCancel={() => {}}
        onUpdate={() => Promise.reject(null)}
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
            getOptionLabel={(o: any) => o.compound}
            noOptionsMessage={() => "Escribe para buscar"}
          />
          <ListGroup>
            {selectedItems.map((i) => {
              return (
                <ListGroup.Item className={classes.listItem}>
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
