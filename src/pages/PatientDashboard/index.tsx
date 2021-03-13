import React from "react";
import { Card, Button } from "react-bootstrap";
import cx from "classnames";
import styles from "./styles.module.scss";
import { VitalSigns } from "./components/VitalSigns";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export const PatientDashboard = () => {
  const { id: patientId } = useParams<{ id: string }>();
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
                    <span>Juan Antonio</span>
                  </div>
                  <div>
                    <span>Nombre:</span>
                    <span>Juan Antonio</span>
                  </div>
                  <div>
                    <span>Nombre:</span>
                    <span>Juan Antonio</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>Nombre:</span>
                    <span>Juan Antonio</span>
                  </div>
                  <div>
                    <span>Nombre:</span>
                    <span>Juan Antonio</span>
                  </div>
                  <div>
                    <span>Nombre:</span>
                    <span>Juan Antonio</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <div className={styles.cardContent}>
                <div>
                  <div>
                    <span>Nombre:</span>
                    <span>Juan Antonio</span>
                  </div>
                  <div>
                    <span>Nombre:</span>
                    <span>Juan Antonio</span>
                  </div>
                  <div>
                    <span>Nombre:</span>
                    <span>Juan Antonio</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>Nombre:</span>
                    <span>Juan Antonio</span>
                  </div>
                  <div>
                    <span>Nombre:</span>
                    <span>Juan Antonio</span>
                  </div>
                  <div>
                    <span>Nombre:</span>
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
