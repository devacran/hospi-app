import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Button, Modal } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { RemoveCircleOutlineOutlined } from "@material-ui/icons";
import Select from "react-select/async";
import swal from "sweetalert";
import TableBuilder from "../../components/TableBuilder";
import {
  rowCreator,
  RowObject,
} from "../../components/TableBuilder/TableBuilder";
import classes from "./styles.module.scss";
import appConfig from "../../config";
import { SubHeader } from "../../components/SubHeader";

type MedicineType = {
  id: number;
  compound: string;
  unitPrice: number;
  concentration: string;
};
const Prescriptions = () => {
  const [modal, setModal] = useState(false);
  const [rowElements, setRowElements] = useState<RowObject[]>([]);

  const [selectedItems, setSelectedItems] = useState<MedicineType[]>([]);
  const options = [
    { id: 1, compound: "Paracetamol", unitPrice: 123, concentration: "23/g" },
    { id: 2, compound: "Otra medicina", unitPrice: 123, concentration: "23/g" },
    { id: 3, compound: "Otra mas", unitPrice: 123, concentration: "23/g" },
  ];
  const { id: patientId } = useParams<{ id: string }>();

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
      rowCreator({
        data: [
          {
            value: i.id,
            editable: false,
            name: "medicine_id",
          },
          {
            value: i.compound + " " + i.concentration,
            editable: false,
            name: "compound",
          },
          { value: "", editable: true, name: "dosis" },
          { value: "", editable: true, name: "via_admin" },
          { value: "every day", editable: true, name: "frequency" },
          {
            value: new Date().toLocaleDateString(),
            editable: false,
            name: "created_at",
          },
        ],
        isNew: true,
        isEdit: true,
        rowId: Math.floor(Math.random() * 500000),
      })
    );
    setRowElements([...rowElements, ...rows]);
    setSelectedItems([]);
  };

  const getMedicines = async () => {
    try {
      const { data } = await axios(`${appConfig.API}/medicines/`);
      const medicines = data.data;
      return medicines;
    } catch (error) {
      console.error(error);
    }
    return options;
  };

  const onSavePrescription = async (
    rowValues: Record<string, string | number>
  ): Promise<number> => {
    const params = { ...rowValues };
    params.doctor_id = 1;
    delete params["created_at"];
    delete params["compound"];
    const data = await axios(
      `${appConfig.API}/patients/${patientId}/prescriptions`,
      { method: "POST", params: params }
    );
    return data.data.id;
  };
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data: prescriptions },
        } = await axios(`${appConfig.API}/patients/${patientId}/prescriptions`);
        const newRowsData: RowObject[] = prescriptions.map(
          (x: any, i: number) => {
            const cols = [
              {
                value: x.prescription_id,
                editable: false,
                name: "prescription_id",
              },
              {
                value: `${x.market_name} ${x.compound} ${x.concentration}`,
                editable: false,
                name: "medicine",
              },
              {
                value: x.dosis,
                editable: false,
                name: "dosis",
              },
              {
                value: x.via_admin,
                editable: false,
                name: "via_admin",
              },
              {
                value: x.frequency,
                editable: false,
                name: "frequency",
              },
              {
                value: new Date(x.created_at).toLocaleDateString(),
                editable: false,
                name: "date",
              },
            ];

            return rowCreator({
              data: cols,
              isEdit: false,
              isNew: false,
              rowId: x.prescription_id,
            });
          }
        );
        setRowElements(newRowsData);
      } catch (e) {
        swal({
          title: "Error",
          text: "Ups parece que hubo un error",
          icon: "error",
          buttons: { confirm: true },
        });
      }
    })();
  }, []);

  const handleDelete = async (rowId: number) => {
    const res = await axios(
      `${appConfig.API}/patients/${patientId}/prescriptions`,
      {
        method: "DELETE",
        params: { id: rowId, patientId },
      }
    );
    return res.data.id;
  };
  console.log(rowElements);
  return (
    <>
      <SubHeader>
        <div></div>
        <Button onClick={() => setModal(true)}>Añadir Registro</Button>
      </SubHeader>
      <TableBuilder
        setRows={setRowElements}
        hasActions={true}
        rows={rowElements}
        cols={[
          "Id",
          "Medicamento",
          "Dosis",
          "Via Admin",
          "Frecuencia",
          "Fecha",
        ]}
        onDelete={handleDelete}
        onAdd={onSavePrescription}
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
            loadOptions={getMedicines}
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
export default Prescriptions;
