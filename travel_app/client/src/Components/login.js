import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
            },
            errors:[]
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.validate = this.validate.bind(this);
        this.handleAuth = this.handleAuth.bind(this);
    }

    validate = (username, password) => {
        let errors = [];

        if(username.length === 0){
            errors.push("Username can't be empty");
        }

        if (password.length === 0) {
            errors.push("Password can't be empty");
        }

        return errors;
    }

    handleAuth(user, role){
        this.props.handleLogin(user, role);
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

        const error = this.validate(this.state.user.username, this.state.user.password);
        if(error.length > 0){
            this.setState({
                errors: error
            })
        }

        else{
            axios
            .post('http://localhost:3000/api/v1/users/login',this.state.user)
            .then(response => {
                this.handleAuth(this.state.user, response.data.role);
                localStorage.setItem('userToken', response.data.token);
                localStorage.setItem('username', this.state.user.username);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('loggedIn', true);
                this.props.history.push('/main');
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    errors: [error.response.data.message]
                })
                console.log(error);
            });
        }

    }

    Alerts(errors) {
        if(errors.length === 0)
            return null;

        return(
            <div className="errors_div_login">
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
                        <p>Log In</p>
                        <form onSubmit={this.submitHandler} noValidate>
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
                                    Log In
                                </button>
                                <Link to="/register">
                                    <small className="small_text">
                                        Click here to register!!
                                    </small>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
        );
    }
}

export default Login;