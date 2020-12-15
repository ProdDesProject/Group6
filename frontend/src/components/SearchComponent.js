import React, { Component } from "react";
import RobotCard from "./RobotCard";
import domain from "../domain";
import Select from "react-select";
import 'bootstrap/dist/css/bootstrap.min.css';
import RobotInfo from "./RobotInfoCard";
import AddRobot from "./AddRobot";
import { Link } from 'react-router-dom'
import axios from "axios";

const api = axios.create({
  baseURL: domain + "/robots"
});

class SearchComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      robotsinfo: [],
      value: '',
      label: '',
      showInfo: false,
      showAdd: false,
      showInfoId: 0,
      lastEdited: "",
      options: {}
    }

    this.mapRobotTypes = this.mapRobotTypes.bind(this);

  }

  componentDidMount() {
    this.getRobots();
  }

  getRobots = async () => {
    let data = await api.get("/").then(({ data }) =>
      data);
    this.setState({ robotsinfo: data });
    this.addInOptions();
  }

  setInfoTrue = id => () => {
    this.setState({ showInfo: true, showInfoId: id });
  };

  hideInfo = () => {
    this.setState({ showInfo: false });
  };


  //creates set of unique robot types

  mapRobotTypes() {
    let mapAllTypes = [...new Set(this.state.robotsinfo.map(robot => robot.type))];
    return mapAllTypes
  }

  //add the robot types in the options array

  addInOptions = () => {
    let mapAllTypes = this.mapRobotTypes();

    let optionsArray = [{ value: "", label: "show all" }]
    for (let i = 0; i < mapAllTypes.length; i++) {
      optionsArray[i + 1] = {};
      optionsArray[i + 1].value = mapAllTypes[i];
      optionsArray[i + 1].label = mapAllTypes[i];
    }
    this.setState({ options: optionsArray });
    console.log(mapAllTypes)
  }

  // Info, edit and delete. Edit and delete buttons are shown only when user is an admin.

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
    const robot = this.state.robotsinfo.find(x => x.id === id);
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
        {this.props.admin && this.editBtn(id)}&nbsp;
        {this.props.admin && this.deleteBtn(id)}
      </div>
    );
  }

  //Functions for delete, edit robot and show information about robot

  deleteRobot(id) {

    let data = api
      .get(`/delete/${id}`)
      .catch(err => console.log(err));
    console.log(data);
    this.getRobots();

  }

  showInfo = () => {
    var r = this.state.robotsinfo.find(x => x.id === this.state["showInfoId"]);
    return (
      <div className="infoBac">
        <div className="infoRobotCard">
          <RobotInfo robotImage={r.url} robotName={r.name} robotDescription={r.description} hideInfo={this.hideInfo} />
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
        {this.state.robotsinfo.filter(robot => robot.type === e).map(filteredRobot => (
          <div className="col-md-4" key={filteredRobot.id}>
            {!this.props.admin && <Link to={`/user/reservation/${filteredRobot.id}`}><RobotCard key={filteredRobot.id} name={filteredRobot.name} url={filteredRobot.url} /></Link>}
            {this.props.admin && <RobotCard key={filteredRobot.id} name={filteredRobot.name} url={filteredRobot.url} />}
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
        {this.state.robotsinfo.map(robot => (
          <div className="col-md-4" key={robot.id}>
            {!this.props.admin && <Link to={`/user/reservation/${robot.id}`}><RobotCard key={robot.id} name={robot.name} url={robot.url} /></Link>}
            {this.props.admin && <RobotCard key={robot.id} name={robot.name} url={robot.url} />}
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
            options={this.state.options}
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

