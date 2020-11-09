import React  from "react";

function DropdownMenu(){
    function DropdownItem(props){
        return (<a className="menu-item" href="#">
                    <span className="icon-button">{props.icon}</span>
                    {props.children}
                </a>);
    }
    return (<div className="dropdownMenu">
                <DropdownItem icon={<i class="far fa-calendar-check"></i>}>&nbsp;My reservations</DropdownItem>
                <DropdownItem icon={<i class="fas fa-edit"></i>}>&nbsp;Make a reservation</DropdownItem>
                <DropdownItem icon={<i class="fas fa-history"></i>}>&nbsp;History</DropdownItem>
            </div>)
}
export default DropdownMenu;