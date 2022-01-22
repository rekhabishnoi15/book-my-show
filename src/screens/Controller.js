import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../common/Header/Header";
import Home from "./home/Home";

function Controller() {
  return (
    <main>
      <Header />
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </main>
  );
}

export default Controller;
