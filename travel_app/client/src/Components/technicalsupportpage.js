import React, { Component, Fragment } from 'react';
import axios from 'axios'
import '../Css/tech.css'

class Tech extends Component {
    constructor(props){
        super(props);

        this.state = {
            messages: []

        }
    }

    async componentDidMount(){
        try{
            const res = await fetch('http://localhost:3000/api/v1/messages');
            const data = await res.json();
            
            this.setState(...this.state, {messages:data})
        }
        catch(err){
            console.log(err);
        }
    }

    show_messages = () => {

        const submit_answer = async (username, id) => {
            const res = await fetch(`http://localhost:3000/api/v1/users/${username}`);
            const data = await res.json();
            const mail = data[0].email;
            const answer = document.getElementsByName(id)[0].value;

            const body = {
                answer: answer,
                mail: mail
            };

            axios.post('http://localhost:3000/api/v1/users/send_answer', body);
            


            
        }

        return (
            this.state.messages.map(msg => 
                <div key={msg._id} className="question">
                    <p>From {msg.username}: {msg.message}</p>
                    <textarea 
                    name={msg._id}
                    rows="4"></textarea>
                    <button 
                    className="question_btn"
                    onClick={() => submit_answer(msg.username, msg._id)}>Answer</button>
                </div>
            )
        )
    }

    render(){
        if(this.props.role === 'tech'){
            return(
                <div className="tech_background">
                    <div className="questions_box">
                        <h3 className="questions_title">Messages!</h3>
                        {this.show_messages()}
                    </div>
                </div>
            )
        }
        this.props.history.push('/main');
        return null;
    }
}


export default Tech;

