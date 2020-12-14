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
      example_state: "example state string",
      isLogin: false,
      isAdmin: false,
      userId: null,
      token: ""
    }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }
  login({ isLogin, isAdmin, userId, token }) {
    console.log("set state triggered")
    this.setState({ isLogin, isAdmin, userId, token })
  }
  logout() {
    console.log("logged out")
    this.setState({ isLogin: false, isAdmin: false })
  }
  render() {
    if (this.state.isLogin === true && this.state.isAdmin === true) {
      return (
        <BrowserRouter>
          <Header isLogin={this.state.isLogin} isAdmin={this.state.isAdmin} logout={this.logout} />
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
              path="/admin/reservation-management"
              render={routerProps => (
                <AdminReservationManagement {...routerProps} token={this.state.token} />
              )}
            />
            <Route
              path="/Login"
              render={routerProps => (
                <Login {...routerProps} login={this.login} isLogin={this.state.isLogin} isAdmin={this.state.isAdmin} />
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
    else if (this.state.isLogin === true && this.state.isAdmin === false) {
      return (
        <BrowserRouter>
          <Header isLogin={this.state.isLogin} isAdmin={this.state.isAdmin} logout={this.logout} />
          <Switch>
            <Route
              path="/user/reservation"
              render={routerProps => (
                <Reservation {...routerProps} example_state={this.state.example_state} />
              )}
            />
            <Route
              path="/user/myreservations"
              render={routerProps => (
                <Myreservations {...routerProps} userId={this.state.userId} token={this.state.token} />
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
                <Login {...routerProps} login={this.login} isLogin={this.state.isLogin} isAdmin={this.state.isAdmin} />
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
    else
      return (
        <BrowserRouter>
          <Header isLogin={this.state.isLogin} isAdmin={this.state.isAdmin} logout={this.logout} />
          <Switch>
            <Route
              path="/Login"
              render={routerProps => (
                <Login {...routerProps} login={this.login} isLogin={this.state.isLogin} isAdmin={this.state.isAdmin} />
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
