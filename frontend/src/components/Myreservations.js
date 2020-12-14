import MyreservationsInfo from "../MyreservationsInfo"
import React, { Component, useState } from "react";
import { Link } from 'react-router-dom'
import Axios from "axios";
import domain from "../domain"



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
   const deleteRobot = id.findIndex(function (i) {
      return i.id === id;
   });
   id.splice(deleteRobot, 1);
   setDeletedId(id);
   console.log(`Robot with id ${deleledId} has been successfully deleted`)
}


function renderTableData(data) {
   return data.map((reservation, index) => {
      return (
         <tr key={reservation.id}>
            <td>{reservation.id}</td>
            <td>{reservation.robotname}</td>
            <td>{convertDate(reservation.date)}</td>
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

const convertDate = (str) => {
   let normalDate = str.substring(8, 10) + "/" + str.substring(5, 7) + "/" + str.substring(0, 4);
   return normalDate;
}

export default class Myreservations extends Component {
   constructor(props) {
      super(props)
      this.state = {
         data: [],
         loading: false
      }
   }
   componentDidMount() {
      this.setState({ loading: true })
      Axios.get(domain + "/reservations/userId/" + this.props.userId)
         .then((response) => {
            this.setState({ loading: false })
            console.log(response)
            let data = response.data
            if (response.status === 200) {
               this.setState({ data: data })
            }
            //  else if (data.success===true) {
            //      console.log("login success")
            //      this.props.login({isLogin: data.success, isAdmin: data.adminStatus, userId: data.id, token: data.token})
            //  }
         })
         .catch((response) => {
            this.setState({ loading: false })
            console.log("Error!")
         });
   }
   render() {
      return (
         <div>
            <div className="container2" style={{ height: "100vh" }}>
               <h1 id='title'>My reservations</h1>
               <Link to="/user/robots"><button className="blueBtn" style={{ marginBottom: "5%" }}>Make a new reservation</button></Link>
               <table id='reservations'>
                  <tbody>
                     {renderTableHeader()}
                     {renderTableData(this.state.data)}
                  </tbody>
               </table>
            </div>
         </div>
      )
   }
}
