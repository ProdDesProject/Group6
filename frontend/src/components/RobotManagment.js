import React from "react";
import SearchComponent from "./SearchComponent";

export default function RobotManagment() {
    return (
        <div>
            <div className="chooserob container2">
                <h1>Robot Management</h1>
                <SearchComponent admin={true} />
            </div>
        </div>
    )
}
