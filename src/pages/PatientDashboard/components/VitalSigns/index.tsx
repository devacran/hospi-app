import React from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./styles.module.scss";

export const VitalSigns = () => {
  return (
    <Card>
      <div className={styles.header}>
        <div>Viernes 30 de Diciembre</div>
        <div>
          <Button>Historico de Signos Vitales</Button>
        </div>
      </div>
      <div className={styles.params}>
        <div>
          <span>
            32<span>g</span>
          </span>
          Sttus 1
        </div>
        <div>
          <span>
            32<span>g</span>
          </span>
          Sttus 1
        </div>
        <div>
          <span>
            32<span>g</span>
          </span>
          Sttus 1
        </div>
        <div>
          <span>
            32<span>g</span>
          </span>
          Sttus 1
        </div>
      </div>
    </Card>
  );
};
