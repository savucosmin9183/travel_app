import React, { Component, Fragment } from 'react';
import axios from 'axios'
import '../Css/adminpage.css'


class Admin extends Component {
    constructor(props){
        super(props);

        this.state = {
            monument: {
                title: "",
                description: "",
                address: "",
                image: "",
                latitude: "",
                longitude:""
            }
        }
    }

    submitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/v1/monuments', this.state.monument)
        .then(response => {
            console.log(response);
        })
        
    }
    
    changeHandler = (event) => {
        this.setState({ 
            monument: {
                ...this.state.monument,
                [event.target.name]: event.target.value
            }
        });
    }

    render() {
        if(this.props.role === 'admin'){
            return(
            <Fragment>
                <form className="add-form" onSubmit={this.submitHandler} noValidate>
                    <h1>Add monument</h1><br/>
                    <label className="admin-label">Title</label><br/>
                    <input className="admin-input" 
                    type="text"
                    name="title"
                    onChange={this.changeHandler}/><br/>
                    <label className="admin-label">Description</label><br/>
                    <input className="admin-input" 
                    id="admin-desc" 
                    type="text" 
                    name="description"
                    onChange={this.changeHandler}/><br/>
                    <label className="admin-label">Address</label><br/>
                    <input className="admin-input" 
                    type="text"
                    name="address"
                    onChange={this.changeHandler}/><br/>
                    <label className="admin-label">Image</label><br/>
                    <input className="admin-input" 
                    type="text"
                    name="image"
                    onChange={this.changeHandler}/><br/>
                    <label className="admin-label">Latitude</label><br/>
                    <input className="admin-input" 
                    type="number"
                    name="latitude"
                    onChange={this.changeHandler}/><br/>
                    <label className="admin-label">Longitude</label><br/>
                    <input className="admin-input" 
                    type="number"
                    name="longitude"
                    onChange={this.changeHandler}/><br/>
                    <button className="admin-button">Add</button>
                </form>
            </Fragment>
            )
        }
        this.props.history.push('/main');
        return null;
    }
}

export default Admin;