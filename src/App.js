import React from "react";
import "./App.css";

import { BrowserRouter, Switch, Redirect, Router } from "react-router-dom";
import { SRoute, PrivateRoute } from "./base/CustomRoutes";
import Home from "./components/customer/Home";

import Login from "./containers/customer/AccountContainers/Login";
import Register from "./components/customer/AccountComponents/Register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <SRoute path="/home" exact component={Home}></SRoute>
          <SRoute path="/login" exact component={Login}></SRoute>
          <SRoute path="/register" exact component={Register}></SRoute>
          <Redirect to="/home"></Redirect>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
