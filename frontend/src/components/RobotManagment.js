import React, { Component } from "react";
import AddRobot from "./AddRobot";
import SearchComponent from "./SearchComponent";

class RobotManagmentComponent extends Component {
    state = { showAdd: false }

    /*
    shows form "Add new robot" when the admin has clicked on the button blueBtn, and hides it when he click cancel
    or after he adds a new robot
    */

    showAdd = () => {
        return (
            <div className="addRobot">
                <AddRobot hideAdd={this.hideAdd} id="" />
            </div>
        );
    };

    hideAdd = () => this.setState({ showAdd: false })

    render() {
        return (
            <div>
                <div className="chooserob container2">
                    <h1>Robot Management</h1>
                    <button className="blueBtn" onClick={() => this.setState({ showAdd: true })}>Add new robot</button>
                    <br />
                    <SearchComponent admin={true} />
                    {this.state.showAdd ? this.showAdd() : null}
                </div>
            </div>
        );
    }
}

export default RobotManagmentComponent;