import React from "react";
import { Accessibility as AccessibilityIcon } from "@material-ui/icons";
import { Navigation } from "react-minimal-side-navigation";

import classes from "./styles.module.scss";
import Logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router";

export const MainMenu = () => {
  const location = useLocation();
  const history = useHistory();
  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <Link to="/app/patients">
          <img src={Logo} alt="Logo Hospi app" />
        </Link>
      </div>
      <Navigation
        activeItemId={location.pathname}
        onSelect={({ itemId }) => {
          history.push(itemId);
        }}
        items={[
          {
            title: "Mi cuenta",
            itemId: "/",
          },
          {
            title: "Pacientes",
            itemId: "/app/patients",
            elemBefore: () => <AccessibilityIcon />,
            subNav: [
              {
                title: "Projects",
                itemId: "/about/projects",
              },
              {
                title: "Members",
                itemId: "/about/members",
              },
            ],
          },
          {
            title: "Another Tab",
            itemId: "/another",
            subNav: [
              {
                title: "Teams",
                itemId: "/another/teams",
              },
            ],
          },
        ]}
      />
      <div className={classes.footer}>
        <Navigation
          activeItemId={location.pathname}
          items={[
            {
              title: "Cerrar Sesion",
              itemId: "/settings",
            },
          ]}
          onSelect={({ itemId }) => {
            history.push(itemId);
          }}
        />
      </div>
    </div>
  );
};
