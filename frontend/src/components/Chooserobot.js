import React from "react";
import Header from './Heading';
import SearchComponent from "./SearchComponent"
import 'bootstrap/dist/css/bootstrap.min.css';

//user can see robots, filter them and choose which robot he wants to reserve

function Chooserobot() {
    return (
        <div>
            <Header />
            <div className="chooserob container2">
                <h1>Choose and reserve</h1>
                <SearchComponent admin={false} />
            </div>
        </div>
    );
}
export default Chooserobot;

