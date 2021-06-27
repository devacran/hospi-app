import React, { FC } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "./pages/Login";
import { Patients } from "./pages/Patients";
import { Layout } from "./components/Layout";
import { PatientDashboard } from "./pages/PatientDashboard";
import VitalSigns from "./pages/VitalSigns";
import { BillAccount } from "./pages/BillAccount";
import Prescriptions from "./pages/Prescriptions";
const App: FC = () => {
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
            <Route
              exact
              path="/app/patients/:id/prescriptions"
              component={Prescriptions}
            />
            <Route
              exact
              path="/app/patients/:id/bill-account"
              component={BillAccount}
            />
          </Route>
        </Layout>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
