import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

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
        if(error.length > 0){
            this.setState({
                errors: error
            })
        }

        else{
            axios
            .post('http://localhost:3000/api/v1/users/register',this.state.user)
            .then(response => {
                if(response.statusText === 'Created')
                    this.props.history.push('/');
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    errors: [error.response.data.message]
                })
            });
        }

    }

    Alerts(errors) {
        if(errors.length === 0)
            return null;

        return(
            <div className="errors_div_register">
                {errors.map(error =>
                    <p>{error}</p>                )}
            </div>
        )
    }


    render() {
        const errs = this.state.errors;
        return (
                <div className="wrapper">
                    {this.Alerts(errs)}
                    <div className="box">
                        <p>Register</p>
                        <form onSubmit={this.submitHandler} noValidate>
                            <div className="inputs">
                                <i className="fa fa-user-circle"></i>
                                <input 
                                type="text" 
                                name="name"
                                className="input" 
                                noValidate 
                                placeholder="name"
                                onChange={this.changeHandler}/>
                            </div>
                            <div className="inputs">
                                <i className="fa fa-envelope-square"></i>
                                <input 
                                type="email" 
                                className="input"
                                name="email"
                                noValidate 
                                placeholder="email"
                                onChange={this.changeHandler}/>
                            </div>
                            <div className="inputs">
                                <i className="fa fa-users"></i>
                                <input 
                                type="text" 
                                className="input"
                                name="username"
                                noValidate 
                                placeholder="username"
                                onChange={this.changeHandler}/>
                            </div>
                            <div className="inputs">
                                <i className="fa fa-lock"></i>
                                <input 
                                type="password" 
                                className="input"
                                name="password" 
                                noValidate 
                                placeholder="password"
                                onChange={this.changeHandler}/>
                            </div>
                            <div className="createAccount">
                                <button className="btn"type="submit">
                                    Create Account
                                </button>
                                <Link to="/">
                                    <small className="small_text">
                                        Already have an account?
                                    </small>
                                </Link>
                            </div>
                        </form>                       
                    </div>
                </div>
        );
    }
}

export default Register;