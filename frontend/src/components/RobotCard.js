import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function RobotCard(props) {
    return (
        <div className="card customCard">
            <img className="robotimg" src={props.imgURL} alt="robot_img" />
            <h4>{props.name}</h4>
        </div>
    );
}

export default RobotCard;