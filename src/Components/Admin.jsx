import React, { Component } from 'react';
import firebase from "../firebase-config.js";
import Login from './Login';
import Cpanel from './Cpanel';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: {}
         }
    }
    authListener(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user){
                this.setState({user})
            }else{
                this.setState({user: null})
            }
        })
    }
    componentDidMount(){
        this.authListener();
    }
    render() { 
        return ( 
            <div>
                {this.state.user ? (<Cpanel />) : (<Login />)}
            </div>
         );
    }
}
 
export default Admin;