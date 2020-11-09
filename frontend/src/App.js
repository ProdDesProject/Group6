import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Welcome from "./components/Mainpage";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      example_state: "example state string"
    }
  }
  render() {
    return (
      <BrowserRouter>
      <Switch>
      <Route
            path="/"
            render={routerProps => (
              <Login {...routerProps} example_state={this.state.example_state}/>
            )}
          />
      <Route
            path="/"
            render={routerProps => (
              <Welcome {...routerProps} example_state={this.state.example_state}/>
            )}
          />
      </Switch>
    </BrowserRouter>
    )
  }
}
