import React from "react";
import robotsinfo from "../robotsInfo"
import  Header from './Heading';
import 'bootstrap/dist/css/bootstrap.min.css';

function RobotCard(props){
    return(
        <div className="card">
            <img className="robotimg" src={props.imgURL} alt="robot_img"/>
            <h4>{props.name}</h4>
        </div>
    );
}

function Chooserobot(){
    return(
        <div>
            <Header/>
            <div className="chooserob container2">
                <h1>Choose and reserve</h1>
                <input type="text" placeholder="Search by type.." className="searchbar" ></input>
                <button className="searchRobotTbutton"><i className="fas fa-search"></i></button>
                <br/>
                <div className="row">
                    {robotsinfo.map(robot =>(
                        <div className="col-4">
                            <RobotCard key={robot.id} name={robot.name} imgURL={robot.imgURL}/> 
                        </div>    
                    ))}                     
                </div>
            </div>
        </div>
    );
}
export default Chooserobot;

