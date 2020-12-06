import React, { Component } from 'react'
import Header from './Heading';

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
        console.log(this.state)
    }
    render() {
        return (
            <div>
                <Header />
                <div className="container background-container mt-5">
                    <div className="border border-dark rounded p-5">
                        <form onSubmit={this.handleSubmit}>
                            <h2 className="d-flex justify-content-center">Login</h2>
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" class="form-control" name="username" onChange={this.handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" name="password" onChange={this.handleChange} />
                            </div>
                            <button type="submit" class="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
