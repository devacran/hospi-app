import React, { FC } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Login } from "./pages/Login";
import { Patients } from "./pages/Patients";
import { Layout } from "./components/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Layout>
          <Route>
            <Route path="/app/patients" component={Patients} />
          </Route>
        </Layout>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
