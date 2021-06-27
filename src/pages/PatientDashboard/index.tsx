import React, { FC, useEffect, useState } from "react";
import axios from "axios";

import { Card, Button } from "react-bootstrap";
import cx from "classnames";
import styles from "./styles.module.scss";
import { VitalSigns } from "./components/VitalSigns";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import appConfig from "../../config";
import swal from "sweetalert";

export const PatientDashboard: FC = () => {
  const { id: patientId } = useParams<{ id: string }>();
  const [patientData, setPatientData] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data: patient },
        } = await axios(`${appConfig.API}/patients/${patientId}`);
        setPatientData(patient);
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
  return (
    <div className="container overflow-hidden main">
      <div className="row ">
        <div className="col-8">
          <div className={cx("p-3 border bg-light h-100", styles.card)}>
            <Card>
              <div className={styles.cardContent}>
                <div>
                  <div>
                    <span>Nombre:</span>
                    <span>{patientData?.name}</span>
                  </div>
                  <div>
                    <span>Sexo:</span>
                    <span>{patientData?.genre}</span>
                  </div>
                  <div>
                    <span>Edad:</span>
                    <span>{patientData?.age}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>Apellido:</span>
                    <span>{patientData?.last_name}</span>
                  </div>
                  <div>
                    <span>Medico:</span>
                    <span>Sin asignar</span>
                  </div>
                  <div>
                    <span>Expediente:</span>
                    <span>{patientData?.nss}</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <div className={styles.cardContent}>
                <div>
                  <div>
                    <span>Estatus:</span>
                    <span>Juan Antonio</span>
                  </div>
                  <div>
                    <span>Dias de Hospitalizacion:</span>
                    <span>Juan Antonio</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>Cuenta:</span>
                    <span>Juan Antonio</span>
                  </div>
                  <div>
                    <span>Cama:</span>
                    <span>Juan Antonio</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="col-4">
          <div className={cx("p-3 border bg-light", styles.lateralBtns)}>
            <Button>
              <Link to={`${patientId}/prescriptions`}>Medicamentos</Link>
            </Button>
            <Button disabled>Diagnosticos del Paciente</Button>
            <Button>
              <Link to={`${patientId}/bill-account`}>Estado de Cuenta</Link>
            </Button>
            <Button disabled>Editar Informacion</Button>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 ">
          <div className="p-3 border bg-light">
            <VitalSigns />
          </div>
        </div>
      </div>
    </div>
  );
};
