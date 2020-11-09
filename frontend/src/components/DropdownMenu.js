import React  from "react";
import {Link} from 'react-router-dom'

function DropdownMenu(){
    function DropdownItem(props){
        return (<Link to={props.path} className="menu-item">
                    <span className="icon-button">{props.icon}</span>
                    {props.children}
                </Link>);
    }
    return (<div className="dropdownMenu">
                <div className="menu-item profile">Hello<br/>kodael00</div>
                <DropdownItem icon={<i class="far fa-calendar-check"></i>} path="/User/Myreservations">&nbsp;My reservations</DropdownItem>
                <DropdownItem icon={<i class="fas fa-edit"></i>} path="/User/Chooserobot">&nbsp;Make a reservation</DropdownItem>
                <DropdownItem icon={<i class="fas fa-history"></i>} path="/User/History">&nbsp;History</DropdownItem>
            </div>)
}
export default DropdownMenu;