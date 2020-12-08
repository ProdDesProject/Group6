import React, { Component } from "react";
import robotsinfo from "../robotsInfo"
import RobotCard from "./RobotCard";
import Select from "react-select";
import 'bootstrap/dist/css/bootstrap.min.css';
import RobotInfo from "./RobotInfoCard";
import AddRobot from "./AddRobot";

class SearchComponent extends Component {

  constructor(props) {
    super(props);

    this.state = { value: '', label: '', showInfo: false, showAdd: false, showInfoId: 0, lastDeleted: "", lastEdited: "" }

    this.options = [];

    this.addInOptions();
  }

  setInfoTrue = id => () => {
    this.setState({ showInfo: true, showInfoId: id });
  };

  hideInfo = () => {
    this.setState({ showInfo: false });
  };


  //creates array of robot types with unique values

  mapAllTypes = [...new Set(robotsinfo.map(function (robot) {
    return robot.type
  }))];

  //add the robot types in the options array

  addInOptions = () => {

    this.options.push({ value: "", label: "show all" });

    for (let i = 0; i < this.mapAllTypes.length; i++) {
      var e = this.mapAllTypes[i];
      this.options.push({ value: e, label: e });
    }
  }

  // Info, edit and delete, currently avaliable buttons. Edit and delete buttons are shown only when user is an admin.

  avaliableBtn = (id) => {
    return (
      <span title="avaliable within this hour"><button className="avaliableRes"><i className="far fa-check-circle" style={{ color: "white" }}></i></button></span>
    );
  }

  infoBtn = (id) => {
    return (
      <button className="infoRes" onClick={this.setInfoTrue(id)} title="show info"><i className="fas fa-info-circle" style={{ color: "white" }}></i></button>
    );
  }

  editBtn = (id) => {
    return (
      <button className="editRes" onClick={this.editRobot(id)} ><i className="fas fa-pencil-alt" style={{ color: "white" }} ></i></button>
    );
  }

  deleteBtn = (id) => {
    const robot = robotsinfo.find(x => x.id === id);
    return (
      <button className="deleteRes" onClick={() => {
        var message = `Are you sure to delete ${robot.name}?`
        if (window.confirm(message))
          this.deleteRobot(id)
      }}><i className="far fa-trash-alt" style={{ color: "white" }}></i></button>
    );
  }

  //show all buttons

  showButtons = (id) => {
    return (
      <div>
        {this.infoBtn(id)}&nbsp;
        {!this.props.admin && this.avaliableBtn(id)}&nbsp;
        {this.props.admin && this.editBtn(id)}&nbsp;
        {this.props.admin && this.deleteBtn(id)}
      </div>
    );
  }

  //Functions for delete, edit robot and show information about robot

  deleteRobot(id) {
    const deleteRobot = robotsinfo.findIndex(function (i) {
      return i.id === id;
    })
    robotsinfo.splice(deleteRobot, 1);
    this.setState({ lastDeleted: deleteRobot });
  }

  showInfo = () => {
    var r = robotsinfo.find(x => x.id === this.state["showInfoId"]);
    return (
      <div className="infoBac">
        <div className="infoRobotCard">
          <RobotInfo robotImage={r.imgURL} robotName={r.name} robotDescription={r.description} hideInfo={this.hideInfo} />
        </div>
      </div>
    );
  };

  editRobot = id => () => {
    this.setState({ showAdd: true, lastEdited: id });
  }

  hideAdd = () => this.setState({ showAdd: false });

  showAdd = () => {
    return (
      <div className="addRobot">
        <AddRobot hideAdd={this.hideAdd} id={this.state["lastEdited"]} />
      </div>
    );
  };

  //shows the robots from a specific type when a user selects type option

  searchByType = (e) => {
    return (
      <div className="row searchrow">
        {robotsinfo.filter(robot => robot.type === e).map(filteredRobot => (
          <div className="col-md-4" key={filteredRobot.id}>
            <RobotCard key={filteredRobot.id} name={filteredRobot.name} imgURL={filteredRobot.imgURL} />
            {this.showButtons(filteredRobot.id)}
          </div>
        ))}
      </div>
    );
  }

  //shows all the robots, default

  showAll = () => {
    return (
      <div className="row searchrow">
        {robotsinfo.map(robot => (
          <div className="col-md-4" key={robot.id}>
            <RobotCard key={robot.id} name={robot.name} imgURL={robot.imgURL} />
            {this.showButtons(robot.id)}
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div style={{ marginTop: "5%" }}>
          <h5>Select robot type: </h5>
          <Select
            className="searchbar"
            placeholder="Select Type"
            options={this.options}
            defaultValue={{ value: '', label: '' }}
            onChange={(e) => {
              this.setState({
                value: e.value,
                label: e.label
              });
            }}
          />
        </div>
        {this.state["value"] === '' && this.showAll()}
        {this.state["value"] !== '' && this.searchByType(this.state.value)}
        {this.state.showInfo ? this.showInfo() : null}
        {this.state.showAdd ? this.showAdd() : null}
      </div>
    );
  }
}

export default SearchComponent;

