import MyreservationsInfo from "../MyreservationsInfo"
import  Header from './Heading';

 function renderTableHeader() {
    return <tr id="rHeader">
                <td>#</td>
                <td>Robot's name</td>
                <td>Date</td>
                <td>Time</td>
                <td>Actions</td>
            </tr>  
 }

function renderTableData(){
    return MyreservationsInfo.map((reservation) => {
       return (
          <tr key={reservation.id}>
             <td>{reservation.id}</td>
             <td>{reservation.robots_Name}</td>
             <td>{reservation.date}</td>
             <td>{reservation.time}</td>
             <td><button id="editRes"><i className="fas fa-pencil-alt" style={{color:"white"}}></i></button>&nbsp;
             <button id="deleteRes"><i className="far fa-trash-alt" style={{color:"white"}}></i></button></td>
          </tr>
       )
    })
 }
 function showReservation() {
    return (
       <div> 
          <Header/>
          <div className="container2">
            <h1 id='title'>My reservations</h1>
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
 export default showReservation;
