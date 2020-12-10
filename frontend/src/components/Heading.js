import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useHistory } from 'react-router-dom'
import DropdownMenu from './DropdownMenu';

function Header(props) {
    return (
        <header className="customHeader">
            <Heading>
                <NavItem item={<i className='fas fa-home'></i>} path="/" />
                {props.isLogin ? null : <NavItem item="Login" path="/Login" />}
                {props.isLogin ? <NavItem item="Logout" unsetRole={props.unsetRole} /> : null}
                {props.isAdmin ? <NavItem item="Dashboard" path="/admin/dashboard" /> : null}
                {props.isLogin ? <NavItem item={<i className="fas fa-bars"></i>} path="#"><DropdownMenu isAdmin={props.isAdmin} /></NavItem> : null}
            </Heading>
        </header>
    );
}

function Heading(props) {
    return (<nav className="navbar bg navbar-expand-md navbar-expand-sm">
        <a className="navbar-brand" href="https://www.oamk.fi/fi/"><img id="oamkLogo" src="https://www.oamk.fi/images/Logot/Suomi-toimisto-tulostettava-png-rgb/Toimistokayttoon_Suomeksi_Musta-07.png" alt="logo" /></a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                {props.children}
            </ul>
        </div>
    </nav>);
}

function NavItem(props) {

    const [openmenu, setOpenmenu] = useState(false);
    const history = useHistory()

    if (props.item === "Logout") {
        return <li className="nav-item menuLinks">
            <Link className="nav-link navl" to="#" onClick={() => {props.unsetRole(); history.push("/")}}>{props.item}</Link>
        </li>
    }
    //change it to props.items
    return (<li className="nav-item menuLinks">
        <Link to={props.path} className="nav-link navl" onClick={() => setOpenmenu(!openmenu)}>
            {props.item}
        </Link>
        {openmenu && props.children}
    </li>
    );
}



export default Header;
