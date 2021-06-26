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
  const [realTimeData, setRealTimeData] = useState<any>({});
  const [mySocket, setMySocket] = useState<any>();

  useEffect(() => {
    const setDataFirstTime = async () => {
      try {
        const { data: vitalSigns } = await axios(
          `${appConfig.API}/patients/${patientId}/vital-signs-last`
        );
        setRealTimeData(vitalSigns.data);
      } catch (e) {
        console.error(e);
      }
    };
    setDataFirstTime();
    const socket = io(ENDPOINT);
    socket.emit("suscribeVitalSigns", { patientId });
    setMySocket(socket);
  }, []);

  if (mySocket) {
    //cada vez que este evento se emita se hara la peticion
    mySocket.on("VitalSignsChanged", async () => {
      try {
        const { data: vitalSigns } = await axios(
          `${appConfig.API}/patients/${patientId}/vital-signs-last`
        );
        console.log(vitalSigns.data);
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
            {`${realTimeData?.blood_pressure_d}/${realTimeData?.blood_pressure_s}`}
            <span>mmHg</span>
          </span>
          Presion Arterial
        </div>
        <div>
          <span>
            {realTimeData?.blood_pressure_s}
            <span>bpm</span>
          </span>
          Ritmo Cardiaco
        </div>
        <div>
          <span>
            {realTimeData?.glucose_level}
            <span>mg/dl</span>
          </span>
          Glucosa
        </div>
        <div>
          <span>
            {realTimeData?.heart_rate}
            <span>c°</span>
          </span>
          Temperatura
        </div>
      </div>
    </Card>
  );
};
