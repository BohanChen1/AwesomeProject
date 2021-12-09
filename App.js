import React from 'react';
import Dashboard from './Dashboard';
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMemoryHistory } from 'history';
import { View, Text } from 'react-native';


export default function App() {
  return (
  //   <Router history={history}>
  //   <Switch>
  //     <Route exact path = '/'>
  //       <Login></Login>
  //     </Route>
  //     <Route path='/Dashboard'>
  //       <Dashboard></Dashboard>
  //     </Route>
  //   </Switch>
  // </Router>
  <Dashboard></Dashboard>
  );
}