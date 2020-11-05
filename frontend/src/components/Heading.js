import React, { useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

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

    return (<li className="nav-item">
                <a className="nav-link" href="#" onClick={() => setOpenmenu(!openmenu)}>
                    {props.item}
                </a>
                {openmenu && props.children}
            </li>
            );
}


export { Heading, NavItem };
