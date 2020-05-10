import React, { Component, Fragment } from 'react';
import Header from './header'
import Footer from './footer'
import axios from 'axios'
import { Marker, Popup } from 'react-leaflet'
import Map from './map'
import '../Css/mainpage.css'
import L, { Point } from 'leaflet'


class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            monuments: [],
            visited: []
        }
    }

    async componentDidMount() {
        try {
            const res = await fetch('http://localhost:3000/api/v1/monuments');
            const data = await res.json();
            const usr = await fetch(`http://localhost:3000/api/v1/users/${localStorage.getItem('username')}`);
            const res1 = await usr.json();

            localStorage.setItem('email', res1[0].email);
            this.setState(...this.state, { monuments: data, visited: res1[0].visited })
        }
        catch (err) {
            console.log(err);
        }


    }

    list_of_monuments = () => {
        return (
            <ul className="list_of_monuments">
                {this.state.monuments.map(monument =>
                    <li className="item" key={monument._id}>{monument.title}</li>
                )}
            </ul>
        )
    }



    mark_monuments = () => {

        const visited = (monument) => {
            axios.put(`http://localhost:3000/api/v1/users/${localStorage.getItem('username')}`, monument)
                .then(res => {
                    this.setState({ visited: [...this.state.visited, monument] });
                })
                .catch(err =>
                    console.log(err))

        }
        const submit_rating = (id) => {
        
            const rating = {rating: document.getElementById(id).value};
            console.log(id);
            console.log(rating);
            axios.post(`http://localhost:3000/api/v1/monuments/vote/${id}`, rating);
        }

        return (
            this.state.monuments.map(monument => {
                if (this.state.visited.map(monument => monument._id).includes(monument._id)) {
                    var myIcon = L.divIcon({className: 'mydivicon', iconSize:[50,50]});
                    return (
                        <Marker icon = {myIcon} key={monument._id} position={[monument.latitude, monument.longitude]}>
                            <Popup>
                                <div className="popup_div">
                                    <img className="popup_image" alt="" src={monument.image} />
                                    <p className="title">{monument.title}</p>
                                    <p className="description">{monument.description}</p>
                                    <p className="address">Address: {monument.address}</p>
                                    <form className="rating_form">
                                    Rate Your Visit <br/>
                                        <input id={monument._id} list="inputs"/>
                                        <datalist id="inputs">
                                            <option value="1"/>
                                            <option value="2"/>
                                            <option value="3"/>
                                            <option value="4"/>
                                            <option value="5"/>
                                        </datalist>
                                        <button onClick={e => {e.preventDefault(); submit_rating(monument._id)}}>Submit</button>
                                        
                                    </form>
                                </div>
                            </Popup>
                        </Marker>)
                }
                var myIcon2 = L.divIcon({className: 'mydivicon2', iconSize:[50,50]});
                return (
                    <Marker icon={myIcon2} key={monument._id} position={[monument.latitude, monument.longitude]}>
                        <Popup>
                            <div className="popup_div">
                                <img className="popup_image" alt="" src={monument.image} />
                                <p className="title">{monument.title}</p>
                                <p className="description">{monument.description}</p>
                                <p className="address">Address: {monument.address}</p>
                                <div>
                                    <button onClick={() => visited(monument)}>Mark as visited</button>
                                    <p className="rating">Rating: {monument.rating / monument.number_of_votes} out of {monument.number_of_votes} votes</p>
                                </div>
                            </div>
                        </Popup>
                    </Marker>)

            }
                
        )
     )
    }

render() {
    return (
        <Fragment>
            <Header user={this.props.user} handleLogout={this.props.handleLogout} />
            <Map zoom={4}>
                {this.mark_monuments()}
            </Map>

            <Footer />
        </Fragment>
    )
}
}

export default Main;