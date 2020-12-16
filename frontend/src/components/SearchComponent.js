import React, { Component } from "react";
import RobotCard from "./RobotCard";
import domain from "../domain";
import Select from "react-select";
import 'bootstrap/dist/css/bootstrap.min.css';
import RobotInfo from "./RobotInfoCard";
import AddRobot from "./AddRobot";
import { Link } from 'react-router-dom'
import axios from "axios";
import LoadingScreen from "./LoadingScreen";

const api = axios.create({
  baseURL: domain + "/robots"
});

class SearchComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      robotsinfo: [],
      setEdit: false,
      setAdd: false,
      value: '',
      label: '',
      showInfo: false,
      showAdd: false,
      showInfoId: 0,
      lastEdited: {},
      options: {},
      loading: false
    }

    this.mapRobotTypes = this.mapRobotTypes.bind(this);
    this.hideAdd = this.hideAdd.bind(this)

  }

  componentDidMount() {
    this.getRobots();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.robotsinfo !== this.state.robotsinfo) {
      this.addInOptions()
    }
  }

  getRobots = async () => {
    this.setState({ loading: true })
    api.get("/").then(response => {
      if (response.status === 200) {
        console.log("fetch success")
        this.setState({ robotsinfo: response.data, loading: false });
      }
    }).catch(err => {
      window.alert("Error:\n" + err)
    })
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

  editBtn = ({ robot }) => {
    return (
      <button className="editRes" onClick={this.editRobot({ robot })} ><i className="fas fa-pencil-alt" style={{ color: "white" }} ></i></button>
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

  showButtons = ({ robot }) => {
    return (
      <div>
        {this.infoBtn(robot.id)}&nbsp;
        {this.props.admin && this.editBtn({ robot })}&nbsp;
        {this.props.admin && this.deleteBtn(robot.id)}
      </div>
    );
  }

  //Functions for delete, edit robot and show information about robot

  deleteRobot(id) {
    api.delete(`/delete/${id}`)
      .then(response => {
        if (response.status === 200) {
          console.log("Delete success")
          this.getRobots();
        }
      })
      .catch(err => {
        window.alert("Error: \n" + err)
        console.log(err)
      });
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


  //here (and loading after adding)


  editRobot = ({ robot }) => () => {
    this.setState({ setEdit: true, lastEdited: robot });
  }

  //

  hideAdd = ({ loading, fetchSuccess }) => {
    if (loading) {
      this.setState({ loading: true })
    }
    else if (fetchSuccess) {
      axios.get(domain + "/robots").then(res => {
        if (res.status === 200) {
          console.log("fetch success");
          this.setState({ setEdit: false, setAdd: false, loading: false, robotsinfo: res.data })
        }
      })
        .catch(err => {
          window.alert("Error\n" + err)
        })
    }
    else {
      this.setState({ setEdit: false, setAdd: false })
    }
  };

  showAdd = ({ robot, action }) => {
    return (
      <div className="addRobot">
        <AddRobot hideAdd={this.hideAdd} robot={robot} action={action} />
      </div>
    );
  };

  searchByType = (e) => {
    return (
      <div className="row searchrow">
        {this.state.robotsinfo.filter(robot => robot.type === e).map(filteredRobot => (
          <div className="col-md-4" key={filteredRobot.id}>
            {!this.props.admin && <Link to={{ pathname: `/user/reservation`, robot: filteredRobot }}><RobotCard key={filteredRobot.id} name={filteredRobot.name} url={filteredRobot.url} /></Link>}
            {this.props.admin && <RobotCard key={filteredRobot.id} name={filteredRobot.name} url={filteredRobot.url} />}
            {this.showButtons({ robot: filteredRobot })}
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
            {!this.props.admin && <Link to={{ pathname: `/user/reservation`, robot: robot }}><RobotCard key={robot.id} name={robot.name} url={robot.url} /></Link>}
            {this.props.admin && <RobotCard key={robot.id} name={robot.name} url={robot.url} />}
            {this.showButtons({ robot })}
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.admin ? <button className="blueBtn" onClick={() => this.setState({ setAdd: true })}>Add new robot</button> : null}
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
        {this.state.setEdit ? this.showAdd({ robot: this.state.lastEdited, action: "edit" }) : null}
        {this.state.setAdd ? this.showAdd({ robot: null, action: "add" }) : null}
        {this.state.loading ? <LoadingScreen /> : null}
      </div>
    );
  }
}

export default SearchComponent;

