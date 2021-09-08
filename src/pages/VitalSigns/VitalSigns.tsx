import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

import TableBuilder from "../../components/TableBuilder";
import {
  rowCreator,
  RowObject,
} from "../../components/TableBuilder/TableBuilder";
import { Button } from "react-bootstrap";
import { SubHeader } from "../../components/SubHeader";
import appConfig from "../../config";

const VitalSigns: FC = () => {
  const { id: patientId } = useParams<{ id: string }>();

  const [rowElements, setRowElements] = useState<RowObject[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data: vitalSigns } = await axios(
          `${appConfig.API}/patients/${patientId}/vital-signs`
        );
        const newRowsData: RowObject[] = vitalSigns.map((x: any) => {
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
          return rowCreator({
            data: cols,
            rowId: x.id,
            isNew: false,
            isEdit: false,
          });
        });

        setRowElements(newRowsData);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const addRegistry = () => {
    const row = rowCreator({
      data: [
        { value: "", editable: true, name: "glucose_level" },
        { value: "", editable: true, name: "blood_pressureS" },
        { value: "", editable: true, name: "blood_pressureD" },
        { value: "", editable: true, name: "heart_rate" },
        { value: "", editable: true, name: "temp" },
        { value: "24/07/12", editable: false, name: "date" },
      ],
      isNew: true,
      isEdit: true,
      rowId: Math.floor(Math.random() * 500000),
    });
    setRowElements([row, ...rowElements]);
  };

  const handleAdd = async (
    values: Record<string, string | number>
  ): Promise<number> => {
    console.log(values);
    const params = { ...values };
    delete params["created_at"];
    const res = await axios(
      `${appConfig.API}/patients/${patientId}/vital-signs`,
      { method: "POST", params: values }
    );
    return res.data.id;
  };

  const handleUpdate = async (
    values: Record<string, string | number>,
    rowId: number
  ): Promise<number> => {
    const params = { ...values };
    delete params["created_at"];
    const data = await axios(
      `${appConfig.API}/patients/${patientId}/vital-signs`,
      { method: "PUT", params: { ...params, id: rowId } }
    );
    return data.data.id;
  };

  const handleDelete = async (rowId: number) => {
    const res = await axios(
      `${appConfig.API}/patients/${patientId}/vital-signs`,
      {
        method: "DELETE",
        params: { id: rowId, patientId },
      }
    );
    return res.data.id;
  };
  return (
    <>
      <SubHeader>
        <div></div>
        <Button onClick={addRegistry}>Añadir Registro</Button>
      </SubHeader>
      <TableBuilder
        rows={rowElements}
        setRows={setRowElements}
        hasActions={true}
        cols={[
          "Temp",
          "Nivel de Glucosa A",
          "Nivel de Glucosa B",
          "Ritmo Cardiaco",
          "Presion Arterial",
          "Fecha",
        ]}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </>
  );
};

export default VitalSigns;
