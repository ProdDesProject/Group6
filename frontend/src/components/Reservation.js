import React, { Component, useState } from 'react'
import styles from "../CSS/Reservation.module.css";

const RenderButton = (props) => {
    let index = [];
    for (let i = props.min; i < props.max; i++) {
        index.push(i);
    }
    let result = index.map(i => {
        if (props.busy.includes(i))
            return <button className={`col ${styles.busyBtn}`} key={i}>
                {`${i}:00-${i + 1}:00`}
                <div className="row"><div className="col"></div></div>
                <div className="row"><div className={`col ${styles.busyTxt}`}>Busy</div></div>
            </button>
        else if (props.owned.includes(i))
            return <button className={`col ${styles.ownedBtn}`} key={i}>
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

export default class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toISOString().substr(0, 10),
            busy: [1, 8, 23],
            owned: [5, 6],
            reserve: [],
            selectedTime: []
        }
        this.selectTime = this.selectTime.bind(this);
        this.selectDate = this.selectDate.bind(this);
        this.handleTimeSelect = this.handleTimeSelect.bind(this)
    }
    selectTime(data) {
        this.setState({ selectTime: data })
        console.log(data)
    }
    selectDate(e) {
        console.log(e.target.value)
        this.setState({ date: e.target.value })
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
        console.log(this.state.reserve)
    }
    render() {
        let pass = (({ busy, owned, reserve }) => ({ busy, owned, reserve }))(this.state);
        return (
            <div className="container">

                <div className="row">
                    <div className="p-3 bg-white">Date:</div>
                    <input type="date" className=""
                        min={new Date().toISOString().substr(0, 10)}
                        defaultValue={this.state.date}
                        onChange={e => this.selectDate(e)}
                    />
                </div>
                <RenderButton min={0} max={6} {...pass} handleTimeSelect={this.handleTimeSelect} />
                <RenderButton min={6} max={12} {...pass} handleTimeSelect={this.handleTimeSelect} />
                <RenderButton min={12} max={18} {...pass} handleTimeSelect={this.handleTimeSelect} />
                <RenderButton min={18} max={24} {...pass} handleTimeSelect={this.handleTimeSelect} />
                <div className="row">Selected time</div>
                <ul>
                {[...this.state.reserve].sort((a,b)=>a-b).map((x)=>{
                    return <li className="row">{`${x}:00-${x + 1}:00`}</li>
                })}
                </ul>
                <div className="row">
                    <button className="btn bg-white" onClick={() => this.handleSubmit()}>Reserve</button>
                </div>
            </div>
        )
    }
}


