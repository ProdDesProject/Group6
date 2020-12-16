import React, { Component } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingScreen from "./LoadingScreen";
import domain from "../domain"

const Calendar = (props) => {
    return (
        <DatePicker
            selected={props.date}
            onSelect={props.selectDate}
            dateFormat="dd/MM/yyyy"
        />
    );
};

function renderTableHeader() {
    return <tr className="rHeader">
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
    let dateFilter = props.dateFilter;
    let filtered;
    if (dateFilter instanceof Date) {
        let date = new Date(dateFilter.getTime() + Math.abs(dateFilter.getTimezoneOffset() * 60000))
        filtered = data.filter(i => {
            return i.username.toLowerCase().includes(props.username.toLowerCase())
                && i.robotname.toLowerCase().includes(props.robotname.toLowerCase())
                && i.date.includes(date.toISOString().substr(0, 10))
        })
    }
    else {
        filtered = data.filter(i => {
            return i.username.toLowerCase().includes(props.username.toLowerCase())
                && i.robotname.toLowerCase().includes(props.robotname.toLowerCase())
        })
    }
    return filtered.map((reservation) => {
        return (
            <tr key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{reservation.username}</td>
                <td>{reservation.robotname}</td>
                <td>{convertDate(reservation.date)}</td>
                <td>{reservation.time}</td>
                <td>
                    <button className="deleteRes" onClick={() => props.confirmation(reservation)}>
                        <i className="far fa-trash-alt" style={{ color: "white" }}></i>
                    </button>
                </td>
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
            dateFilter: "",
            loading: false
        }
        this.inputChange = this.inputChange.bind(this)
        this.selectDate = this.selectDate.bind(this)
        this.clearDateFilter = this.clearDateFilter.bind(this)
        this.confirmation = this.confirmation.bind(this)
    }
    componentDidMount() {
        this.setState({ loading: true })
        // fetching data to show initially
        axios.get(domain + "/reservations/management")
            .then((response) => {
                console.log(response)
                let data = response.data
                if (response.status === 200) {
                    console.log("fetched data successfully")
                    this.setState({ loading: false, data: data })
                }
            })
            .catch((response) => {
                this.setState({ loading: false })
                console.log("Error!")
            });
    }
    inputChange = (e) => {
        //console.log(e.target.name+":"+e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }
    selectDate(e) {
        //console.log(e.toISOString())
        this.setState({ dateFilter: e })
    }
    clearDateFilter = (e) => {
        this.setState({ dateFilter: "" })
    }
    // Delete reservation confirmation function
    confirmation = (reservation) => {
        let r = window.confirm(`Delete reservation ${reservation.id}?`);
        if (r === true) {
            this.setState({ loading: true })
            axios.delete(domain + "/reservations/delete/" + reservation.id, {
                headers: {
                    Authorization: this.props.token
                }
            })
                .then((response) => {
                    console.log(response)
                    // fetch data again after deleting
                    if (response.status === 200) {
                        console.log("Delete success")
                        axios.get(domain + "/reservations/management")
                            .then((response) => {
                                let data = response.data
                                if (response.status === 200) {
                                    console.log("fetched data successfully")
                                    this.setState({ loading: false, data: data })
                                }
                            })
                            .catch((response) => {
                                this.setState({ loading: false })
                                console.log("Error!")
                            });
                    }
                    else {
                        window.alert("Deletion failed")
                    }
                })
                .catch((response) => {
                    this.setState({ loading: false })
                    console.log("Error!")
                });
        } else {

        }
    }
    render() {
        return (
            <>
                {this.state.loading ? <LoadingScreen /> : null}
                <div className="container container2" style={{ height: "100%" }}>
                    <h1 id='title'>Reservation management</h1>
                    <div className="m-5 filterRes">
                        <b className="p-2">Filter</b>
                        <table>
                            <tbody>
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
                                        <Calendar date={this.state.dateFilter} selectDate={this.selectDate} />
                                        <button onClick={this.clearDateFilter}>x</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                    </div>


                    <table id='reservations'>
                        <tbody>
                            {renderTableHeader()}
                            {renderTableData({
                                data: this.state.data,
                                username: this.state.usernameFilter,
                                robotname: this.state.robotnameFilter,
                                dateFilter: this.state.dateFilter,
                                confirmation: this.confirmation
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

const convertDate = (str) => {
    let normalDate = str.substring(8, 10) + "/" + str.substring(5, 7) + "/" + str.substring(0, 4);
    return normalDate;
}

const stubData = [
    {
        id: 1,
        username: "user1",
        robotname: "Smart Board",
        date: "2020-11-25",
        time: "13:00-14:00"
    },
    {
        id: 2,
        username: "user2",
        robotname: "Printing Robot",
        date: "2020-12-01",
        time: "11:00-12:00"
    },
    {
        id: 3,
        username: "user1",
        robotname: "Cleaning Robot",
        date: "2020-12-01",
        time: "10:00-11:00"
    },

];
