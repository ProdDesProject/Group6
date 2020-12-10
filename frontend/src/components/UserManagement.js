import users from "../users"
import React, { Component } from "react";
import AddUser from "./AddUser";

class UserManagement extends Component {


    constructor(props) {
        super(props);
        this.state = {
            setAdd: false,
            lastDeleted: 0,
            setEdit: false,
            lastEdited: 0,
            emailFilter: "",
            idFilter: "",
            nameFilter: ""
        }
        this.inputChange = this.inputChange.bind(this)

    }

    inputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    renderTableHeader = () => {
        return <tr className="rHeader">
            <td>userid</td>
            <td>name and surname</td>
            <td>email</td>
            <td>password</td>
            <td>role</td>
            <td>class</td>
            <td>actions</td>
        </tr>
    }

    //shows add user form

    showAdd = (id) => {
        return (
            <div className="addRobot">
                <AddUser hideAdd={this.hideAdd} id={id} />
            </div>
        );
    };

    //hides add user form 

    hideAdd = () => this.setState({ setAdd: false, setEdit: false });

    //finds user by id and then deletes it

    deleteUser = (id) => {
        const deleteUser = users.findIndex(function (i) {
            return i.id === id;
        })
        users.splice(deleteUser, 1);
        this.setState({ lastDeleted: deleteUser });
    }

    /*

    shows all data in a table, with actions buttons for edit and delete user
    filter users by id, name and email 

    */

    renderTableData = (props) => {
        let data = users;
        let filtered;
        filtered = data.filter(i => {
            return i.email.toLowerCase().includes(props.email.toLowerCase())
                && i.id.toLowerCase().includes(props.id.toLowerCase())
                && i.name.toLowerCase().includes(props.name.toLowerCase())
        })
        return filtered.map((userList) => {
            return (
                <tr key={userList.id}>
                    <td>{userList.id}</td>
                    <td>{userList.name}</td>
                    <td>{userList.email}</td>
                    <td>{userList.password}</td>
                    <td>{userList.role}</td>
                    <td>{userList.class}</td>
                    <td>
                        <button className="deleteRes" onClick={() => {
                            var message = `Are you sure you want to delete user ${userList.name} ?`
                            if (window.confirm(message))
                                this.deleteUser(userList.id)
                        }}>
                            <i className="far fa-trash-alt" style={{ color: "white" }}></i>
                        </button>&nbsp;
                            <button className="editRes" onClick={() => {
                            this.setState({ setEdit: true, lastEdited: userList.id });
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
                <div className="container2" style={{ height: "100vh" }}>
                    <h1 id='title'>User Management</h1>
                    <button className="blueBtn" style={{ marginBottom: "5%" }}
                        onClick={() => { this.setState({ setAdd: true }) }}>Add a new user</button>
                    <div className="filterRes">
                        <b className="p-2">Filter results:</b>
                        <table>
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
                    {this.state.setAdd ? this.showAdd("") : null}
                    {this.state.setEdit ? this.showAdd(this.state.lastEdited) : null}
                </div>
            </div>
        )

    }
}
export default UserManagement;