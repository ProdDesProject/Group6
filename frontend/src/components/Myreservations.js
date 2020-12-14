import MyreservationsInfo from "../MyreservationsInfo"
import React, { Component, useState } from "react";
import { Link } from 'react-router-dom'

const data = MyreservationsInfo;


function renderTableHeader() {
   return <tr className="rHeader">
      <td>#</td>
      <td>Robot's name</td>
      <td>Date</td>
      <td>Time</td>
      <td>Actions</td>
   </tr>
}


function DeleteReservation(id) {
   const [deleledId, setDeletedId] = useState(0);
   const deleteRobot = data.findIndex(function (i) {
      return i.id === id;
   });
   data.splice(deleteRobot, 1);
   setDeletedId(id);
   console.log(`Robot with id ${deleledId} has been successfully deleted`)
}


function renderTableData() {
   return data.map((reservation, index) => {
      return (
         <tr key={reservation.id}>
            <td>{index + 1}</td>
            <td>{reservation.robots_Name}</td>
            <td>{reservation.date}</td>
            <td>{reservation.time}</td>
            <td><button className="deleteRes" onClick={() => {
               var message = `Are you sure you want to delete this reservation?\n\nRobot's name: ${reservation.robots_Name} \nDate: ${reservation.date}\nTime: ${reservation.time}`
               if (window.confirm(message))
                  DeleteReservation(reservation.id)
            }}>
               <i className="far fa-trash-alt" style={{ color: "white" }}></i>
            </button>
            </td>
         </tr>
      );
   })
}

export default class Myreservations extends Component {
   render() {
      return (
         <div>
         <div className="container2" style={{ height: "100vh" }}>
            <h1 id='title'>My reservations</h1>
            <Link to="/user/robots"><button className="blueBtn" style={{ marginBottom: "5%" }}>Make a new reservation</button></Link>
            <table id='reservations'>
               <tbody>
                  {renderTableHeader()}
                  {renderTableData()}
               </tbody>
            </table>
         </div>
      </div>
      )
   }
}
