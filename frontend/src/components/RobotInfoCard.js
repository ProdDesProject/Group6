import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const showInfo = (props) => {
    return (
        <div className="card customCard">
            <img className="card-img-top infoRobImg" src={props.robotImage} alt="robotInfoImg" />
            <div className="card-block">
                <h4 className="card-title">{props.robotName}</h4>
                <p className="card-text">{props.robotDescription}</p>
            </div>
            <button className="blueBtn" onClick={props.hideInfo}>Close</button>
        </div>

    )

}
export default showInfo;


