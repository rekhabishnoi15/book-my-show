import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../common/Header/Header";
import Home from "./home/Home";
import Details from "./details/Details";
import BookShow from "./bookshow/BookShow";

function Controller() {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <Header />
          <Home />
        </Route>
        <Route path="/book">
          <BookShow />
        </Route>
        <Route path="/movie/:id">
          <Header />
          <Details />
        </Route>
      </Switch>
    </main>
  );
}

export default Controller;
