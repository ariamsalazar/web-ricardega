import React, { Component } from 'react';
import firebase from '../firebase-config';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = { 
            email: '',
            password: ''
         }
    }
    // LogIn Function
    login(e){
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
            console.log(u);
        }).catch((err) => {
            console.log(err);
        })
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() { 
        return ( 
            <div className="general-admin">
                <form className="form-admin">
                    <div className="logo-form ah"></div>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                    value={this.state.email}
                    className="input-form-admin"
                    />
                    <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    className="input-form-admin"
                    />
                    <button onClick={this.login} className="log-in">Login</button>
                </form>
            </div>
        );
    }
}
 
export default LogIn;