import React, { useState } from 'react';
import firebase from '../firebase-config';
import { storage } from "../firebase-config";
import NewProject from './NewProject';

class Cpanel extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('projects');
        this.unsubscribe = null;
        this.state = { 
            projects: [],
            images: [],
            name: '',
            date: '',
            thumbnail: ''
        }

        this.delete = this.delete.bind(this);
    }
    // Log Out Function
    logout(){
        firebase.auth().signOut();
    }
    // Get All Projects Functions
    onCollectionUpdate = (querySnapshot) => {
        const projects = [];
        querySnapshot.forEach((doc) => {
          const { name, thumbnail, project_img } = doc.data();
          projects.push({
            key: doc.id,
            doc, // DocumentSnapshot
            name,
            thumbnail,
            project_img,
          });
        });
        this.setState({
            projects
       });
    }
    
    // Delete Project Function
    delete(id){
        firebase.firestore().collection('projects').doc(id).delete().then(() => {
          console.log("Document successfully deleted!");
          this.props.history.push("/")
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
    }

    getImage() {
        let { state } = this;
        // var listRef = firebase.storage().ref().child("/images");
        // listRef.listAll().then(function(res) {
        // state.images = res.items;state.downloadURLs = {};this.setState(state);
        //         res.items.forEach(function(itemRef) {itemRef.getDownloadURL().then(url => {
        //         // state.downloadURLs[itemRef.name] = url;state.downloadURLs.push(url);this.setState(state);
        //         alert(url);
        //         console.log(url);
        //         document.querySelector('img').src = url;
        //        });
        //    });
        // })
        // .catch(function(error) {
        // // Uh-oh, an error occurred!
        // });
        // Create a reference under which you want to list
        var listRef = firebase.storage().ref().child("/images");

        // Find all the prefixes and items.
        listRef.listAll().then(function(res) {
        res.prefixes.forEach(function(folderRef) {
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
        });
        res.items.forEach(function(itemRef) {
            // All the items under listRef.
            console.log(itemRef);
        });
        }).catch(function(error) {
        // Uh-oh, an error occurred!
        });
    }
    // Component Did Mount Function
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        this.getImage();

    }
    render() { 
        let images = this.state.images;
        console.log(images);
        return ( 
        <div>
            {/* First Component */}
            <div className="first-part">
                <h1>You are Logge In</h1>
                <button onClick={this.logout} className="log-out">Log Out</button>
                {/* Form New Project */}
                <NewProject/>
            </div>
            {/* Second Component */}
            <div className="first-part second">
                {/* {this.state.projects.map((pro, i) =>
                  <tr key={i}>
                    <div className="back-pro">
                        A
                    </div>
                    <td>{pro.name}</td>---
                    <td>{pro.thumbnail}</td>
                    <button onClick={this.delete.bind(this, pro.key)} className="btn btn-danger">Delete</button>
                  </tr>
                )} */}
                <div>

                   
    
                </div>
            </div>
            
        </div> 
        );
    }
}
 
export default Cpanel;