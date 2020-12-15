import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import Axios from "axios";
import domain from "../domain"
import LoadingScreen from "./LoadingScreen";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../CSS/Reservation.module.css";

const Calendar = (props) => {
    //const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker
            selected={props.date}
            onSelect={props.selectDate}
            dateFormat="dd-MM-yyyy"
        //minDate={new Date()}
        />
    );
};

const RenderButton = (props) => {
    let index = [];
    for (let i = props.min; i < props.max; i++) {
        index.push(i);
    }
    let result = index.map(i => {
        if (props.busy.includes(i))
            return <button className={`col ${styles.busyBtn}`} key={i} disabled>
                {`${i}:00-${i + 1}:00`}
                <div className="row"><div className="col"></div></div>
                <div className="row"><div className={`col ${styles.busyTxt}`}>Busy</div></div>
            </button>
        else if (props.owned.includes(i))
            return <button className={`col ${styles.ownedBtn}`} key={i} disabled>
                {`${i}:00-${i + 1}:00`}
                <div className="row"><div className="col"></div></div>
                <div className="row"><div className={`col ${styles.ownedTxt}`}>Owned</div></div>
            </button>
        else if (props.reserve.includes(i))
            return <button className={`col ${styles.reservedBtn}`} key={i}
                onClick={() => props.handleTimeSelect(i)}>
                {`${i}:00-${i + 1}:00`}
                <div className="row"><div className="col"></div></div>
                <div className="row"><div className={`col ${styles.reservedTxt}`}>Selected</div></div>
            </button>
        else
            return <button className={`col ${styles.freeBtn}`} key={i}
                onClick={() => props.handleTimeSelect(i)}>
                {`${i}:00-${i + 1}:00`}
                <div className="row"><div className="col"></div></div>
                <div className="row"><div className="col text-secondary">Free</div></div>
            </button>
    }
    )
    return <div className="row">{result}</div>
}

const stubData = {
    user: { idUser: 12 },
    robot: {
        idRobot: 1,
        robotName: "robot 1"
    },
    busy: ["03-12-2020 1", "03-12-2020 2", "03-12-2020 3"],
    owned: ["03-12-2020 8", "03-12-2020 9", "03-12-2020 10"]
}

export default class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            busy: [1, 8, 23],
            owned: [5, 6],
            reserve: [],
            loading: false,
            robotId: 3,
            robotname: "Robot3",
            robotType: "Cleaning"
        }
        this.selectDate = this.selectDate.bind(this);
        this.handleTimeSelect = this.handleTimeSelect.bind(this)
    }
    componentDidMount() {
        this.setState({ loading: true })
        Axios.post(domain + "/reservations/robot-schedule",
            {
                date: this.state.date.toISOString().substring(0, 10),
                robotId: this.state.robotId
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': this.props.token
                }
            }
        )
            .then((response) => {
                console.log(response.data)
                let data = response.data
                if (response.status === 200) {
                    this.setState({ owned: data.myTime, busy: data.othersTime, loading: false })
                }
            })
            .catch((response) => {
                this.setState({ loading: false })
                window.alert("Error")
                console.log("Error!")
            });
        // let busy = stubData.busy.map(x => parseInt(x.slice(10)))
        // let owned = stubData.owned.map(x => parseInt(x.slice(11)))
        // this.setState({ busy: busy, owned: owned })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.date !== this.state.date) {
            this.setState({ loading: true })
            Axios.post(domain + "/reservations/robot-schedule",
                {
                    date: this.state.date.toISOString().substring(0, 10),
                    robotId: this.state.robotId
                },
                {
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': this.props.token
                    }
                }
            )
                .then((response) => {
                    console.log(response)
                    let data = response.data
                    if (response.status === 200) {
                        this.setState({ owned: data.myTime, busy: data.othersTime, loading: false, reserve: [] })
                    }
                })
                .catch((response) => {
                    this.setState({ loading: false })
                    window.alert("Error")
                    console.log("Error!")
                });
        }
        if (prevState.reserve!==this.state.reserve) {
            console.log({reserve: this.state.reserve})
        }
    }
    selectDate(e) {
        this.setState({ date: e })
    }
    handleTimeSelect(i) {
        if (this.state.reserve.includes(i)) {
            let tempArray = this.state.reserve;
            tempArray.splice(this.state.reserve.indexOf(i), 1)
            this.setState({ reserve: tempArray })
        }
        else
            this.setState({ reserve: [...this.state.reserve, i] })
    }
    handleSubmit() {
        this.setState({ loading: true })
        Axios.post(domain + "/reservations/add_new",
            {
                date: this.state.date.toISOString().substring(0, 10),
                robotId: this.state.robotId,
                time: String("["+this.state.reserve+"]")
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': this.props.token
                }
            }
        )
            .then((response) => {
                console.log(response)
                let data = response.data
                if (response.status === 200) {
                    // Fetch data if reservation creatation success
                    Axios.post(domain + "/reservations/robot-schedule",
                        {
                            date: this.state.date.toISOString().substring(0, 10),
                            robotId: this.state.robotId
                        },
                        {
                            headers: {
                                'Content-type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': this.props.token
                            }
                        }
                    )
                        .then((response) => {
                            console.log(response.data)
                            let data = response.data
                            if (response.status === 200) {
                                this.setState({ owned: data.myTime, busy: data.othersTime, loading: false, reserve: [] })
                            }
                        })
                        .catch((response) => {
                            this.setState({ loading: false })
                            window.alert("Error")
                            console.log("Error!")
                        });
                }
            })
            .catch((response) => {
                this.setState({ loading: false })
                window.alert("Error")
                console.log("Error!")
            });
    }
    render() {
        let pass = (({ busy, owned, reserve }) => ({ busy, owned, reserve }))(this.state);
        return (
            <>
                {this.state.loading === true ? <LoadingScreen /> : (
                    <div className="container mt-5 container2">

                        <h3 className="chooseTimeTable">Book time</h3>
                        <div className="row my-4 chooseTimeTable">
                            <table style={{ textAlign: "left", borderSpacing: "20px", borderCollapse: "separate" }}>
                                <tbody>
                                    <tr>
                                        <td>Robot name:</td>
                                        <td>{this.state.robotname}</td>
                                    </tr>
                                    <tr>
                                        <td>Robot type:</td>
                                        <td>{this.state.robotType}</td>
                                    </tr>
                                    <tr>
                                        <td>Date:</td>
                                        <td><Calendar selectDate={this.selectDate} date={this.state.date} /></td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div className="my-4 chooseTimeTable">
                            <RenderButton min={0} max={6} {...pass} handleTimeSelect={this.handleTimeSelect} />
                            <RenderButton min={6} max={12} {...pass} handleTimeSelect={this.handleTimeSelect} />
                            <RenderButton min={12} max={18} {...pass} handleTimeSelect={this.handleTimeSelect} />
                            <RenderButton min={18} max={24} {...pass} handleTimeSelect={this.handleTimeSelect} />
                        </div>

                        <div className="row chooseTimeTable">Selected time</div>
                        <ul className="chooseTimeTable">
                            {[...this.state.reserve].sort((a, b) => a - b).map((x) => {
                                return <li className="row" key={x}>{`${x}:00-${x + 1}:00`}</li>
                            })}
                        </ul>
                        <div className="row chooseTimeTable">
                            <button className="btn bg-white blueBtn" onClick={() => this.handleSubmit()}>Reserve</button>
                        </div>
                    </div>)}

            </>
        )
    }
}


