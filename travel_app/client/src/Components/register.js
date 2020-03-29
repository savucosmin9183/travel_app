import React, { Component } from 'react';
import axios from 'axios'

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                name: '',
                email: '',
                username: '',
                password: '',
            },
            errors:[]
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

validate = (name, email, username, password) => {
    let errors = [];

    if (name.length === 0) {
        errors.push("Name can't be empty");
    }
    if(username.length === 0){
        errors.push("Username can't be empty");
    }

    if (email.length < 5) {
        errors.push("Email should be at least 5 charcters long");
    }
    if (email.split("").filter(x => x === "@").length !== 1) {
        errors.push("Email should contain a @");
    }
    if (email.indexOf(".") === -1) {
        errors.push("Email should contain at least one dot");
    }

    if (password.length < 6) {
        errors.push("Password should be at least 6 characters long");
    }

    return errors;
}

    changeHandler = (event) => {
        this.setState({ 
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        });
    }

    submitHandler = e => {
        e.preventDefault()

        const error = this.validate(this.state.user.name, this.state.user.email, this.state.user.username, this.state.user.password);
        console.log(error);
        if(error.length > 0){
            this.setState({
                errors: error
            })
        }

        else{
            axios
            .post('http://localhost:3000/api/v1/users/register',this.state.user)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    errors: [error.response.data.message]
                })
            });
        }
        console.log(this.state);

    }


    render() {
        return (
            <div className="wrapper">
                <h1>Create Account</h1>
                <form onSubmit={this.submitHandler} noValidate>
                    <div className="name">
                        <label htmlFor="name"></label>
                        <input 
                        type="text" 
                        name="name"
                        className="" 
                        noValidate 
                        placeholder="name"
                        onChange={this.changeHandler}/>
                    </div>
                    <div className="email">
                        <label htmlFor="email"></label>
                        <input 
                        type="email" 
                        className=""
                        name="email"
                        noValidate 
                        placeholder="email"
                        onChange={this.changeHandler}/>
                    </div>
                    <div className="username">
                        <label htmlFor="username"></label>
                        <input 
                        type="text" 
                        className=""
                        name="username"
                        noValidate 
                        placeholder="username"
                        onChange={this.changeHandler}/>
                    </div>
                    <div className="password">
                        <label htmlFor="pawssword"></label>
                        <input 
                        type="password" 
                        className=""
                        name="password" 
                        noValidate 
                        placeholder="password"
                        onChange={this.changeHandler}/>
                    </div>
                    <div className="createAccount">
                        <button type="submit">
                            Submit
                        </button>
                        <small>
                            Already have an account?
                        </small>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;