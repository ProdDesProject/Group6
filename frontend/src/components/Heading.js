import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import  DropdownMenu from './DropdownMenu';

function Header(){
    return (
        <header>
            <Heading>
              <NavItem item="Login" path="/Login"/>;
              <NavItem item={<i class='fas fa-home'></i>} path="/"/>
              <NavItem item={<i class="fas fa-bars"></i>}><DropdownMenu/></NavItem>;
            </Heading>
        </header>
      );
}

function Heading(props) {
  return (<nav className="navbar bg-dark navbar-expand-lg navbar-dark">
            <a className="navbar-brand" href="https://www.oamk.fi/fi/"><img id="oamkLogo" src="https://www.oamk.fi/images/Logot/Suomi-toimisto-tulostettava-png-rgb/Toimistokayttoon_Suomeksi_Valkoinen-11.png" alt="logo"/></a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                {props.children}
            </ul>
            </div>
        </nav>);;
}

function NavItem(props){

    const [openmenu, setOpenmenu] = useState(false);

    //change it to props.items
    return (<li className="nav-item">
                <Link to={props.path} className="nav-link" onClick={() => setOpenmenu(!openmenu)}>
                    {props.item}
                </Link>
                {openmenu && props.children}
            </li>
            );
}


export default Header;
