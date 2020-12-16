import domain from "../domain";
import React, { Component } from "react";
import AddUser from "./AddUser";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";

const api = axios.create({
    baseURL: domain + "/users"
});

class UserManagement extends Component {


    constructor(props) {
        super(props);
        this.state = {
            users: [],
            setAdd: false,
            setEdit: false,
            lastEdited: 0,
            emailFilter: "",
            idFilter: "",
            nameFilter: "",
            loading: false
        }

        this.inputChange = this.inputChange.bind(this)
        this.renderTableData = this.renderTableData.bind(this)
    };

    componentDidMount() {
        this.getUsers();
    }

    //get users
    getUsers = async () => {
        this.setState({ loading: true })
        let data = api.get("/").then(({ data }) => { this.setState({ users: data, loading: false }); })
    }

    inputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    renderTableHeader = () => {
        return <tr className="rHeader">
            <td>userid</td>
            <td>name and surname</td>
            <td>email</td>
            <td>role</td>
            <td>class</td>
            <td>actions</td>
        </tr>
    }

    //shows add user form

    showAdd = ({ user, action }) => {
        return (
            <div className="addRobot">
                <AddUser hideAdd={this.hideAdd} user={user} action={action} />
            </div>
        );
    };

    //hides add user form 

    hideAdd = ({ loading, fetchSuccess }) => {
        if (loading) {
            this.setState({ loading: true })
        }
        else if (fetchSuccess) {
            axios.get(domain + "/users").then(res => {
                if (res.status === 200) {
                    console.log("fetch success");
                    this.setState({ setAdd: false, setEdit: false, loading: false, users: res.data })
                }
            })
        }
        else {
            this.setState({ setAdd: false, setEdit: false })
        }
    };

    //Deletes a user

    deleteUser = async (id) => {
        this.setState({ loading: true })
        let data = api.delete(`/delete/${id}`).then(response => {
            if (response.status === 200) {
                console.log("Delete success")
                this.getUsers();
            }
        }).catch(err => {
            window.alert("Delete failed \n " + err.err)
            console.log(err.err)
        })
    }

    /*

    shows all data in a table, with actions buttons for edit and delete user
    filter users by id, name and email 

    */

    renderTableData = (props) => {
        let data = this.state.users;
        let filtered;
        console.log(data);
        filtered = data.filter(i => {
            return i.email.toString().toLowerCase().includes(props.email.toLowerCase())
                && i.id.toString().toLowerCase().includes(props.id.toLowerCase())
                && i.name.toString().toLowerCase().includes(props.name.toLowerCase())
        })
        return filtered.map((userList) => {
            return (
                <tr key={userList.id}>
                    <td>{userList.id}</td>
                    <td>{userList.name}</td>
                    <td>{userList.email}</td>
                    <td>{userList.classname === "admin" ? "admin" : "student"}</td>
                    <td>{userList.classname}</td>
                    <td>
                        <button className="deleteRes" onClick={() => {
                            var message = `Are you sure you want to delete user ${userList.name} ?`
                            if (window.confirm(message))
                                this.deleteUser(userList.id)
                        }}>
                            <i className="far fa-trash-alt" style={{ color: "white" }}></i>
                        </button>&nbsp;
                            <button className="editRes" onClick={() => {
                            this.setState({ setEdit: true, lastEdited: userList });
                        }}>
                            <i className="fas fa-pencil-alt" style={{ color: "white" }}></i>
                        </button>
                    </td>
                </tr>
            );
        })
    }

    render() {
        return (
            <div>
                <div className="container2" style={{ height: "100%" }}>
                    <h1 id='title'>User Management</h1>
                    <button className="blueBtn" style={{ marginBottom: "5%" }}
                        onClick={() => { this.setState({ setAdd: true }) }}>Add a new user</button>
                    <div className="filterRes">
                        <b className="p-2">Filter results:</b>
                        <table className="titleseparate">
                            <tbody>
                                <tr >
                                    <td className="p-2 ">User's id:</td>
                                    <td><input onChange={this.inputChange} name="idFilter" /></td>
                                </tr>
                                <tr >
                                    <td className="p-2 ">User's name:</td>
                                    <td><input onChange={this.inputChange} name="nameFilter" /></td>
                                </tr>
                                <tr >
                                    <td className="p-2 ">User's email:</td>
                                    <td><input onChange={this.inputChange} name="emailFilter" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <table id='reservations'>
                        <tbody>
                            {this.renderTableHeader()}
                            {this.renderTableData(
                                {
                                    email: this.state.emailFilter,
                                    id: this.state.idFilter,
                                    name: this.state.nameFilter
                                }
                            )}
                        </tbody>
                    </table>
                    {this.state.setAdd ? this.showAdd({ user: null, action: "add" }) : null}
                    {this.state.setEdit ? this.showAdd({ user: this.state.lastEdited, action: "edit" }) : null}
                </div>
                {this.state.loading ? <LoadingScreen /> : null}
            </div>
        )

    }
}
export default UserManagement;