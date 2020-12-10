import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserIcon from "../icons/user-icon.png";
import RobotIcon from "../icons/robot.png";
import CalendarIcon from "../icons/calendar.png";

export default class AdminDashboard extends Component {
    render() {
        const icon = {
            width: "200px",
            height: "200px",
            marginTop: "20px"
        }
        return (
            <div>
                <div className="container mt-5 container2 dashboardMenu ">
                    <div className="row">
                        <div className="col">
                            <Link to="/admin/user-management">
                                <div className="card customCard dashCard">
                                    <img src={UserIcon} style={icon} className="card-img-top mx-auto" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">User Management</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="/admin/robot-management">
                                <div className="card customCard dashCard">
                                    <img src={RobotIcon} style={icon} className="card-img-top mx-auto" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Robot Management</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="/admin/reservation-management">
                                <div className="card customCard dashCard">
                                    <img src={CalendarIcon} style={icon} className="card-img-top mx-auto" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Reservation Management</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
