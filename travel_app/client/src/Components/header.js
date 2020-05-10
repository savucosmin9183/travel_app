import React from 'react';
import '../Css/header.css'
import logo from '../Images/logo2.png'
import {Link} from 'react-router-dom';

function Header(props){

    function logout(){
        props.handleLogout();
    }

    return(
        <div className="header">
            <img className="logo" alt="" src={logo}/>
            <Link className="contact_link" to="/contact">
                <p>Contact us!</p>
            </Link>
            <div className="welcome">
                <p className="welcometext">Welcome to TravelApp, {props.user}!</p>
                <Link to="/">
                    <button className="logout" onClick={logout}>Logout</button>
                </Link>
            </div>
        </div>
    )
}


export default Header;