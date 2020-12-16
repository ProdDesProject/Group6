import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function RobotCard(props) {
    console.log(props)
    return (
        <div className="card customCard">
            <img className="robotimg" src={props.url} alt="robot_img" />
            <h4>{props.name}</h4>
        </div>
    );
}

export default RobotCard;