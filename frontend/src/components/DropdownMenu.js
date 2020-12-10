import React from "react";
import { Link } from 'react-router-dom'

function DropdownItem(props) {
    return (<Link to={props.path} className="menu-item">
        <span className="icon-button">{props.icon}</span>
        {props.children}
    </Link>);
}

function DropdownMenu(props) {

    return (
        props.isAdmin ?
            <div className="dropdownMenu">
                <DropdownItem icon={<i className="fas fa-user"></i>} path="/admin/user-management">&nbsp;User Management</DropdownItem>
                <DropdownItem icon={<i className="fas fa-robot"></i>} path="/admin/robot-management">&nbsp;Rotbot Management</DropdownItem>
                <DropdownItem icon={<i className="fas fa-calendar-alt"></i>} path="/admin/reservation-management">&nbsp;Reservation Management</DropdownItem>
            </div>
            :
            <div className="dropdownMenu">
                <DropdownItem icon={<i className="far fa-calendar-check"></i>} path="/user/myreservations">&nbsp;My reservations</DropdownItem>
                <DropdownItem icon={<i className="fas fa-edit"></i>} path="/user/robots">&nbsp;Make a reservation</DropdownItem>
            </div>
    )
}
export default DropdownMenu;