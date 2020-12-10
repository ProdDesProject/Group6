import React, { Component } from 'react'
import { Redirect } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.username === "s" && this.state.password === "s") {
            this.props.setRole({ isLogin: true, isAdmin: false })

        } else if (this.state.username === "t" && this.state.password === "t") {
            this.props.setRole({ isLogin: true, isAdmin: true })
        }
        console.log("Login clicked")
    }
    render() {
        if (this.props.isLogin && this.props.isAdmin) {
            return <Redirect to="/admin/dashboard"></Redirect>
        }
        else if (this.props.isLogin === true && this.props.isAdmin === false) {
            return <Redirect to="/user/robots"></Redirect>
        }
        else {
            return (
                <div>
                    <div className="container background-container mt-5">
                        <div className="border border-dark rounded p-5">
                            <form onSubmit={this.handleSubmit}>
                                <h2 className="d-flex justify-content-center">Login</h2>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" name="username" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" onChange={this.handleChange} />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }

    }
}
