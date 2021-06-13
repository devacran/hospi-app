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

const VitalSigns = () => {
  const { id: patientId } = useParams<{ id: string }>();

  const [rowElements, setRowElements] = useState<RowCreator[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data: vitalSigns } = await axios(
          `${appConfig.API}/patients/${patientId}/vital-signs`
        );
        console.log(vitalSigns);
        const newRowsData: RowCreator[] = vitalSigns.map(
          (x: any, i: number) => {
            const cols = Object.keys(x.data).map((key) => {
              return {
                value:
                  key === "created_at"
                    ? new Date(x.data[key]).toLocaleDateString()
                    : x.data[key],
                editable: true,
                name: key,
              };
            });
            return { cols, rowId: x.id };
          }
        );

        setRowElements(newRowsData);
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
        { value: "24/07/12", editable: false, name: "date" },
      ],
      {
        edit: true,
        editable: true,
      },
      Math.floor(Math.random() * 500000).toString()
    );
    console.log(row);
    setRowElements([row, ...rowElements]);
  };

  const handleAdd = async (
    rowValues: Record<string, string | number>
  ): Promise<number | null> => {
    try {
      const params = { ...rowValues };
      delete params["created_at"];
      const data = await axios(
        `${appConfig.API}/patients/${patientId}/vital-signs`,
        { method: "POST", params: rowValues }
      );
      return data.data.id;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleUpdate = async (
    rowValues: Record<string, string | number>,
    rowId: number
  ): Promise<number | null> => {
    const params = { ...rowValues };
    console.log(params);
    delete params["created_at"];
    const data = await axios(
      `${appConfig.API}/patients/${patientId}/vital-signs`,
      { method: "PUT", params: { ...params, id: rowId } }
    );
    return data.data.id;
  };

  const handleDelete = async (rowId: number) => {
    await axios(`${appConfig.API}/patients/${patientId}/vital-signs`, {
      method: "DELETE",
      params: { id: rowId, patientId },
    });
    setRowElements(rowElements.filter((row) => row.rowId !== rowId));
  };
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
        onDelete={handleDelete as any}
        onAdd={handleAdd}
        onCancel={() => {}}
        onUpdate={handleUpdate}
      />
    </>
  );
};

export default VitalSigns;
