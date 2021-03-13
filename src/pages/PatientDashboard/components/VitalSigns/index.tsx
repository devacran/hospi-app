import React from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import cx from "classnames";
export const VitalSigns = () => {
  const { id: patientId } = useParams<{ id: string }>();

  return (
    <Card className="pb-10">
      <div className={cx(styles.header)}>
        <div>Viernes 30 de Diciembre</div>
        <div>
          <Button>
            <Link to={`${patientId}/vital-signs`}>
              Historico de Signos Vitales
            </Link>
          </Button>
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
