import React, { FC } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss";
export const Login: FC = () => {
  const history = useHistory();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push("/app/patients");
  };
  return (
    <div className={styles.container}>
      <Form onSubmit={onSubmit}>
        <div className="h2">Ingrese sus credenciales</div>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Iniciar Sesion
        </Button>
      </Form>
    </div>
  );
};
