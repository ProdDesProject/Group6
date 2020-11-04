import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Heading() {
  return <nav className="navbar bg-dark navbar-expand-lg navbar-dark">
            <a className="navbar-brand" href="https://www.oamk.fi/fi/"><img id="oamkLogo" src="https://www.oamk.fi/images/Logot/Suomi-toimisto-tulostettava-png-rgb/Toimistokayttoon_Suomeksi_Valkoinen-11.png" alt="logo"/></a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="."><i class="fas fa-home"></i></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="">Log In</a>
                </li>
            </ul>
            </div>
        </nav>;
}

export default Heading;
