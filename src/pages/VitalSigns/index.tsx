import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

import {
  TableBuilder,
  rowCreator,
  RowCreator,
} from "../../components/TableBuilder";
import { Button } from "react-bootstrap";
import { SubHeader } from "../../components/SubHeader";
import appConfig from "../../config";

import classes from "./styles.module.scss";

export const VitalSigns = () => {
  const { id: patientId } = useParams<{ id: string }>();

  const [rowElements, setRowElements] = useState<RowCreator[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data: vitalSigns, id: rowId },
        } = await axios(`${appConfig.API}/patients/${patientId}/vital-signs`);
        console.log(vitalSigns);
        const newRowsData: RowCreator[] = vitalSigns.map((x: any) => {
          const cols = Object.keys(x).map((key) => {
            if (key !== "vital_signs_id") {
              return {
                value: x[key],
                editable: true,
                name: key,
              };
            }
          });
          return { cols, rowId };
        });
        console.log(newRowsData);
        // setRowElements(newRowsData);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const addRegistry = () => {
    const row = rowCreator(
      [
        { value: "", editable: true, name: "glucose_level" },
        { value: "", editable: true, name: "blood_pressureS" },
        { value: "", editable: true, name: "blood_pressureD" },
        { value: "", editable: true, name: "heart_rate" },
        { value: "", editable: true, name: "temp" },
        { value: "", editable: true, name: "date" },
      ],
      {
        edit: true,
        editable: true,
      },
      Math.floor(Math.random() * 500000)
    );
    console.log(row);
    setRowElements([row, ...rowElements]);
  };

  const handleAdd = (rowValues: Record<string, string | number>) => {
    try {
      const params = { ...rowValues };
      delete params["created_at"];
      const data = axios(`${appConfig.API}/patients/${patientId}/vital-signs`, {
        params: rowValues,
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(rowElements);
  return (
    <>
      <SubHeader>
        <div></div>
        <Button onClick={addRegistry}>Añadir Registro</Button>
      </SubHeader>
      <TableBuilder
        rowsData={rowElements}
        hasActions={true}
        cols={[
          "Temp",
          "Nivel de Glucosa A",
          "Nivel de Glucosa B",
          "Ritmo Cardiaco",
          "Presion Arterial",
          "Fecha",
        ]}
        onDelete={() => {}}
        onAdd={handleAdd}
        onCancel={() => {}}
        onUpdate={() => {}}
      />
    </>
  );
};
