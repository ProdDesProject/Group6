import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = (props) => {
    return (
        <DatePicker
            selected={props.date}
            onSelect={props.selectDate}
            dateFormat="yyyy-MM-dd"
        />
    );
};

function renderTableHeader() {
    return <tr>
        <td>#</td>
        <td>username</td>
        <td>Robot's name</td>
        <td>Date</td>
        <td>Time</td>
        <td>Actions</td>
    </tr>
}

function renderTableData(props) {
    let data = props.data;
    let filtered = data.filter(i=>{
        return i.username.toLowerCase().includes(props.username.toLowerCase())
            && i.robots_Name.toLowerCase().includes(props.robotname.toLowerCase())
            && i.date.includes(props.dateFilter)
    })
    return filtered.map((reservation) => {
        return (
            <tr key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{reservation.username}</td>
                <td>{reservation.robots_Name}</td>
                <td>{reservation.date}</td>
                <td>{reservation.time}</td>
                <td><button id="editRes"><i className="fas fa-pencil-alt" style={{ color: "white" }}></i></button>&nbsp;
             <button id="deleteRes"><i className="far fa-trash-alt" style={{ color: "white" }}></i></button></td>
            </tr>
        )
    })
}

export default class AdminReservationManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: stubData,
            usernameFilter: "",
            robotnameFilter: "",
            dateFilter: ""
        }
        this.inputChange = this.inputChange.bind(this)
        this.selectDate = this.selectDate.bind(this)
        this.clearDateFilter =  this.clearDateFilter.bind(this)
    }
    inputChange = (e) => {
        //console.log(e.target.name+":"+e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }
    selectDate(e) {
        console.log(e.toISOString().substr(0,10))
        this.setState({ dateFilter: e })
    }
    clearDateFilter = (e) => {
        this.setState({dateFilter: ""})
    }
    render() {
        return (
            <>
                {/* <div className="container2"> */}
                <div className="container">
                    <h1 id='title'>My reservations</h1>
                    <div className="m-5">
                        <b className="p-2">Filter</b>
                        <table>
                            <tr >
                                <td className="p-2 ">username:</td>
                                <td><input onChange={this.inputChange} name="usernameFilter" /></td>
                            </tr>
                            <tr >
                                <td className="p-2 ">Robot's name:</td>
                                <td><input onChange={this.inputChange} name="robotnameFilter" /></td>
                            </tr>
                            <tr >
                                <td className="p-2 ">Date:</td>
                                <td>
                                    <Calendar date={this.state.dateFilter} selectDate={this.selectDate}/>
                                    <button onClick={this.clearDateFilter}>x</button>
                                    </td>
                            </tr>
                        </table>

                    </div>


                    <table id='reservations'>
                        <tbody>
                            {renderTableHeader()}
                            {renderTableData({
                                data: this.state.data,
                                username: this.state.usernameFilter,
                                robotname: this.state.robotnameFilter,
                                dateFilter: this.state.dateFilter
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

const stubData = [
    {
        id: 1,
        username: "user1",
        robots_Name: "Smart Board",
        date: "2020-11-25",
        time: "13:00-14:00"
    },
    {
        id: 2,
        username: "user2",
        robots_Name: "Printing Robot",
        date: "2020-12-01",
        time: "11:00-12:00"
    },
    {
        id: 3,
        username: "user1",
        robots_Name: "Cleaning Robot",
        date: "2020-12-01",
        time: "10:00-11:00"
    },

];
