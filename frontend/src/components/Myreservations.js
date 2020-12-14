import MyreservationsInfo from "../MyreservationsInfo"
import React, { Component, useState } from "react";
import { Link } from 'react-router-dom'
import Axios from "axios";
import domain from "../domain"
import LoadingScreen from "./LoadingScreen";


function renderTableHeader() {
   return <tr className="rHeader">
      <td>#</td>
      <td>Robot's name</td>
      <td>Date</td>
      <td>Time</td>
      <td>Actions</td>
   </tr>
}


function renderTableData({data, DeleteReservation}) {
   return data.map((reservation, index) => {
      return (
         <tr key={reservation.id}>
            <td>{reservation.id}</td>
            <td>{reservation.robotname}</td>
            <td>{convertDate(reservation.date)}</td>
            <td>{convertTime(reservation.time)}</td>
            <td><button className="deleteRes" onClick={() => {
               var message = `Are you sure you want to delete this reservation?\n\nReservation #: ${reservation.id}\nRobot's name: ${reservation.robotname} \nDate: ${reservation.date}`
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


// convert string of array to timve divs
const convertTime = (str) => {
   let timeArray = JSON.parse(str);
   timeArray.sort((a,b)=>{return a-b})
   console.log(timeArray)
   let temp = []
   let start = null;
   let end = null;
   for (let i=0; i<timeArray.length; i++ ) {
      if (start===null) {
         start = timeArray[i]
      }
      if (start!==null && timeArray[i]+1!==timeArray[i+1]) {
         end = timeArray[i]
         temp.push({start, end})
         start = null
         end = null
      }
   }
   let result = temp.map(i=><><div>{i.start}:00 - {i.end+1}:00</div></>)
   return result
}

export default class Myreservations extends Component {
   constructor(props) {
      super(props)
      this.state = {
         data: [],
         loading: false
      }
      this.DeleteReservation = this.DeleteReservation.bind(this)
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
         })
         .catch((err) => {
            this.setState({ loading: false })
            console.log("Error!")
         });
   }
   DeleteReservation(id) {
      this.setState({ loading: true })
      Axios.delete(domain + "/reservations/delete/" + id, {
         headers: {
            Authorization: this.props.token
         }
      })
         .then(response => {
            if (response.status === 200) {
               Axios.get(domain + "/reservations/userId/" + this.props.userId)
                  .then((response) => {
                     let data = response.data
                     if (response.status === 200) {
                        console.log("Delete success")
                        this.setState({ data: data, loading: false })
                     }
                  })
                  .catch((err) => {
                     this.setState({ loading: false })
                     console.log("Error!")
                  });
            }
         })
   }
   render() {
      return (
         <div>
            {this.state.loading?<LoadingScreen/>:null}
            <div className="container2" style={{ height: "100vh" }}>
               <h1 id='title'>My reservations</h1>
               <Link to="/user/robots"><button className="blueBtn" style={{ marginBottom: "5%" }}>Make a new reservation</button></Link>
               <table id='reservations'>
                  <tbody>
                     {renderTableHeader()}
                     {renderTableData({data: this.state.data, DeleteReservation: this.DeleteReservation})}
                  </tbody>
               </table>
            </div>
         </div>
      )
   }
}
