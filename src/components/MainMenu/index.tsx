import React from "react";
import { Nav, NavDropdown, NavItem } from "react-bootstrap";
import classes from "./styles.module.scss";
import Logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";

export const MainMenu = () => {
  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <Link to="/app/patients">
          <img src={Logo} alt="Logo Hospi app" />
        </Link>
      </div>
      <Nav defaultActiveKey="/home" className="flex-column">
        <NavDropdown title="Mi Cuenta" id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3">
            Something else here
          </NavDropdown.Item>
          @@@∑
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          title="Pacientes"
          id="nav-dropdown"
          className={classes.item}
        >
          <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3">
            Something else here
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </div>
  );
};
