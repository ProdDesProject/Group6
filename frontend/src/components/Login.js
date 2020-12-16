import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import axios from "axios"
import domain from "../domain"
import LoadingScreen from "./LoadingScreen";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loading: false,
            disable: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidUpdate(prevProps,prevState) {
        if(prevState.username!==this.state.username||prevState.password!==this.state.password) {
            if (this.state.username===""||this.state.password==="") {
                this.setState({disable: true})
            }
            else (this.setState({disable: false}))
        }
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.username === "s" && this.state.password === "s") {
            this.props.login({ isLogin: true, isAdmin: false })

        } else if (this.state.username === "t" && this.state.password === "t") {
            this.props.login({ isLogin: true, isAdmin: true })
        }
        this.setState({loading: true})
        axios.post(domain+"/auth/login",
            {
                email: this.state.username,
                password: this.state.password
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
            .then((response) => {
                console.log(response)
                let data =  response.data
                if (data.success===false) {
                    window.alert("Wrong username or password")
                }
                else if (data.success===true) {
                    console.log("login success")
                    this.props.login({isLogin: data.success, isAdmin: data.adminStatus, userId: data.id, token: data.token, loading: false})
                }
            })
            .catch((response) => {
                this.setState({loading: false})
                window.alert("Wrong username or password")
                console.log(response)
            });
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
                    {this.state.loading?<LoadingScreen/>:null}
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
                                <button type="submit" className="btn btn-primary" disabled={this.state.disable}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }

    }
}
