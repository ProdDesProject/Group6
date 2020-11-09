import React from "react";
import robotsinfo from "../robotsInfo"
import  Header from './Heading';
import 'bootstrap/dist/css/bootstrap.min.css';

function RobotCard(props){
    return(
        <div class="card">
            <h4>{props.name}</h4>
            <img class="robotimg" src={props.imgURL} alt="robot_img"/>
        </div>
    );
}

function Chooserobot(){
    return(
        <div>
            <Header/>
            <div class="chooserob">
                <h1>School robots</h1>
                <h4>choose and reserve</h4>
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

