import React from "react";
import { Card, Button } from "react-bootstrap";
import cx from "classnames";
import styles from "./styles.module.scss";
import { VitalSigns } from "./components/VitalSigns";

export const PatientDashboard = () => {
  return (
    <div className="container perro overflow-hidden">
      <div className="row ">
        <div className="col-8">
          <div className={cx("p-3 border bg-light h-100", styles.card)}>
            <Card>
              <div className={styles.cardContent}>
                <div>
                  <div>
                    <span>Nombre:</span>Juan Antonio
                  </div>
                  <div>
                    <span>Sexo:</span> Masculino
                  </div>
                  <div>
                    <span>Edad:</span> 81 años
                  </div>
                </div>
                <div>
                  <div>
                    <span>Medico:</span> Juan Antonio
                  </div>
                  <div>
                    <span>Expediente:</span> Masculino
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <div className={styles.cardContent}>
                <div>
                  <div>Estatus: Juan Antonio</div>
                  <div>Dias de Hospitalizacion: Masculino</div>
                </div>
                <div>
                  <div>No de Cuenta: Juan Antonio</div>
                  <div>No de Cama: Masculino</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="col-4">
          <div className={cx("p-3 border bg-light", styles.lateralBtns)}>
            <Button>Medicamentos</Button>
            <Button>Diagnosticos del Paciente</Button>
            <Button>Estado de cuenta</Button>
            <Button>Editar Informacion</Button>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 p-3 border bg-light">
          <VitalSigns />
        </div>
      </div>
    </div>
  );
};
