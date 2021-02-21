import React, { FC } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Login } from "./pages/Login";
import { Patients } from "./pages/Patients";
import { Layout } from "./components/Layout";
import { PatientDashboard } from "./pages/PatientDashboard";
import { VitalSigns } from "./pages/VitalSigns";
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Layout>
          <Route>
            <Route exact path="/app/patients" component={Patients} />
            <Route
              exact
              path="/app/patients/:id"
              component={PatientDashboard}
            />
            <Route
              exact
              path="/app/patients/:id/vital-signs"
              component={VitalSigns}
            />
          </Route>
        </Layout>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
