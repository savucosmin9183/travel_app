import React, { Component } from 'react';
import Register from './Components/register';
import Login from './Components/login';
import Tech from './Components/technicalsupportpage'
import Admin from './Components/adminpage'
import Contact from './Components/contact'
import Main from './Components/main_page';
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


class App extends Component {

  constructor(){
    super();

    this.state = {
      loggedIn: false,
      user: "",
      role: ""
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount(){
    this.setState({
      loggedIn: localStorage.getItem('loggedIn'),
      user: localStorage.getItem('username'),
      role: localStorage.getItem('role')
    });
  }

  handleLogin(user, role){
    this.setState({
      loggedIn: true,
      user: user.username,
      role: role
    })
  }

  handleLogout(){
    localStorage.setItem('loggedIn', false);
    localStorage.setItem('username', "");
    localStorage.setItem('role', "");

    this.setState({
      loggedIn: false,
      user: "",
      role: ""
    })

  }

  render() {
    return (
      <Router>  
        <div className="app">
          <Switch>
            <Route path="/" exact 
              render={ props => (
                <Login {...props} handleLogin={this.handleLogin}/>
              )}/>
            <Route path="/register" component={Register}></Route>
            <Route path="/main"
              render={ props => (
                <Main {...props} user={this.state.user} handleLogout={this.handleLogout}/>
              )}
            ></Route>
            <Route path="/admin"
              render={ props => (
                <Admin {...props} role={localStorage.getItem('role')}/>
              )}>
            </Route>
            <Route path="/contact" component={Contact}></Route>
            <Route path="/tech"
              render={ props => (
                <Tech {...props} role={localStorage.getItem('role')}/>
              )}>
            </Route>

          </Switch>
        </div>
      </Router>  
    );
  }
}

export default App;
