import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Welcome from "./components/Mainpage";
import Chooserobot from "./components/Chooserobot";
import Myreservations from "./components/Myreservations";
import AdminDashboard from "./components/AdminDashboard";
import Reservation from "./components/TimeBooking"
import AdminReservationManagement from "./components/AdminReservationManagement"
import RManagment from "./components/RobotManagment";
import UserManagement from "./components/UserManagement";
import Header from './components/Heading';


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
        <Header/>
        <Switch>
          <Route
            path="/admin/robot-management"
            render={routerProps => (
              <RManagment {...routerProps} example_state={this.state.example_state} />
            )}
          />
          <Route
            path="/admin/user-management"
            render={routerProps => (
              <UserManagement {...routerProps} example_state={this.state.example_state} />
            )}
          />
          <Route
            path="/admin/dashboard"
            render={routerProps => (
              <AdminDashboard {...routerProps} example_state={this.state.example_state} />
            )}
          />
          <Route
            path="/admin/reservation-management">
            <AdminReservationManagement />
          </Route>
          <Route
            path="/user/reservation"
            render={routerProps => (
              <Reservation {...routerProps} example_state={this.state.example_state} />
            )}
          />
          <Route
            path="/user/myreservations"
            render={routerProps => (
              <Myreservations {...routerProps} example_state={this.state.example_state} />
            )}
          />
          <Route
            path="/user/robots"
            render={routerProps => (
              <Chooserobot {...routerProps} example_state={this.state.example_state} />
            )}
          />
          <Route
            path="/Login"
            render={routerProps => (
              <Login {...routerProps} example_state={this.state.example_state} />
            )}
          />
          <Route
            path="/"
            render={routerProps => (
              <Welcome {...routerProps} example_state={this.state.example_state} />
            )}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}
