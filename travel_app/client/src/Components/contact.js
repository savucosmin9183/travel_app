import React, {Component} from 'react';
import '../Css/contact.css'
import axios from 'axios'

class Contact extends Component {

    constructor(props){
        super(props);

        this.state = {
            message: ""
        }
    }


    changeHandler = e => {
        this.setState({
            message: e.target.value
        })
    }

    form_submitted = e => {
        e.preventDefault();

        const elem = {
            message: this.state.message,
            username: localStorage.getItem('username')
        }
        axios.post('http://localhost:3000/api/v1/messages', elem)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    render(){
        return(
            <div className="background">
                <form onSubmit={this.form_submitted} className="form_box">
                    <p className="feedback_title">Send Feedback!</p>
                    <label>Message:</label>
                    <textarea onChange={this.changeHandler} className="textarea"></textarea> 
                    <button className="message_submit">Submit</button>
                </form>

            </div>
        )
    }
}

export default Contact