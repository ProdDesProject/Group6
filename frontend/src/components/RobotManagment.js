import React, { Component } from "react";
import AddRobot from "./AddRobot";
import SearchComponent from "./SearchComponent";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";
import domain from "../domain";

const api = axios.create({
    baseURL: domain + "/robots"
});

class RobotManagmentComponent extends Component {
    state = { setAdd: false, setEdit: false, loading: false }

    /*
    shows form "Add new robot" when the admin has clicked on the button blueBtn, and hides it when he click cancel
    or after he adds a new robot
    */

    showAdd = ({ user, action }) => {
        return (
            <div className="addRobot">
                <AddRobot hideAdd={this.hideAdd} user={user} action={action} />
            </div>
        );
    };

    hideAdd = ({ loading, fetchSuccess }) => {
        if (loading) {
            this.setState({ loading: true })
        }
        else if (fetchSuccess) {
            axios.get(api).then(res => {
                if (res.status === 200) {
                    console.log("fetch success");
                    this.setState({ setAdd: false, setEdit: false, loading: false })
                }
            })
        }
        else {
            this.setState({ setAdd: false, setEdit: false })
        }
    };

    render() {
        return (
            <div>
                <div className="chooserob container2">
                    <h1>Robot Management</h1>
                    <button className="blueBtn" onClick={() => this.setState({ setAdd: true })}>Add new robot</button>
                    <br />
                    <SearchComponent admin={true} />
                    {this.state.setAdd ? this.showAdd({ user: null, action: "add" }) : null}
                </div>
                {this.state.loading ? <LoadingScreen /> : null}
            </div>
        );
    }
}

export default RobotManagmentComponent;