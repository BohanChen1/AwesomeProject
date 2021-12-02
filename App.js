import React from 'react';
import Dashboard from './Dashboard';
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

export default function App() {
  return (
    <Router>
    <Switch>
      <Route exact path = '/'>
        <Login></Login>
      </Route>
      <Route path='/Dashboard'>
        <Dashboard></Dashboard>
      </Route>
    </Switch>
  </Router>
  );
}