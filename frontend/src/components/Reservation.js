import React, { Component, useState } from 'react'
import styles from "../CSS/Reservation.module.css";

const RenderButton = (props) => {
    let index = [];
    for (let i = props.min; i < props.max; i++) {
        index.push(i);
    }
    let result = index.map(i => {
        if (props.busy.includes(i))
            return <button className={`col ${styles.busyBtn}`} key={i}>{`${i}:00-${i + 1}:00`}</button>
        else if (props.owned.includes(i))
            return <button className={`col ${styles.ownedBtn}`} key={i}>{`${i}:00-${i + 1}:00`}</button>
        else if (props.reserve.includes(i))
            return <button className={`col ${styles.reservedBtn}`} key={i}
                onClick={() => props.handleTimeSelect(i)}>{`${i}:00-${i + 1}:00`}</button>
        else
            return <button className={`col ${styles.freeBtn}`} key={i}
                onClick={() => props.handleTimeSelect(i)}>{`${i}:00-${i + 1}:00`}</button>
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
        this.handleTimeSelect= this.handleTimeSelect.bind(this)
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
            tempArray.splice(this.state.reserve.indexOf(i),1)
            this.setState({reserve: tempArray})
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
                {/* <div className="row">
                    <div style={{ backgroundColor: "white" }}>Selecte time: {this.state.selectedTime}</div>
                </div>
                <div className="row">
                    <Example selectTime={this.selectTime}></Example>
                </div> */}
                <div className="row">
                    <input type="date" className=""
                        min={new Date().toISOString().substr(0, 10)}
                        defaultValue={this.state.date}
                        onChange={e => this.selectDate(e)}
                    />
                </div>
                <div className="row">
                    <button className="col" onClick={() => this.handleSubmit()}>Submit</button>
                </div>
                <RenderButton min={0} max={8} {...pass} handleTimeSelect={this.handleTimeSelect}></RenderButton>
                <RenderButton min={8} max={16} {...pass} handleTimeSelect={this.handleTimeSelect}></RenderButton>
                <RenderButton min={16} max={24} {...pass} handleTimeSelect={this.handleTimeSelect}></RenderButton>
            </div>
        )
    }
}


