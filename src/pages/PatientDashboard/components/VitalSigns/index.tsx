import React, { useEffect, useState } from "react";
import appConfig from "../../../../config";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import cx from "classnames";
import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:8080";

export const VitalSigns = () => {
  const { id: patientId } = useParams<{ id: string }>();
  const [realTimeData, setRealTimeData] = useState<any>();
  const [mySocket, setMySocket] = useState<any>();

  useEffect(() => {
    const socket = io(ENDPOINT);
    setMySocket(socket);
  }, []);

  if (mySocket) {
    //cada vez que este evento se emita se hara la peticion
    mySocket.on("VitalSignsChanged", async () => {
      try {
        const { data: vitalSigns } = await axios(
          `${appConfig.API}/patients/${patientId}/vital-signs-last`
        );
        setRealTimeData(vitalSigns.data);
      } catch (e) {
        console.error(e);
      }
    });
  }
  //realTimeData con esto renderizas los signos vitales
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
