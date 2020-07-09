import React, { useState } from 'react';
import firebase from '../firebase-config';
import { storage } from "../firebase-config";
import NewProject from './NewProject';
let array_new = [];
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
            thumbnail: '',
            srcImage: ''
        }
        this.delete = this.delete.bind(this);
        this.onlyGetImage = this.onlyGetImage.bind(this);
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
        // this.getImages(projects);
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
    getImages(projects){
        this.state.projects.map((pro, i) => (
            storage.ref().child("/images/"+pro.thumbnail).getDownloadURL().then((url) => {
                // state[image] = url
                this.setState({
                    images: [...this.state.images, url]
                })
              }).catch((error) => {
            })
        ))
    }
    //Get ONLY One picture
    onlyGetImage(img, ix){
        let srcU = "";
        storage.ref().child("/images/"+img).getDownloadURL().then((url) => {
            srcU= '#img'+ix;
            document.querySelector(srcU).setAttribute("src", url)
            }).catch((error) => {
        })
    }
    // Component Did Mount Function
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }
    render() {
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
                {this.state.projects.map((pro, i) =>
                  <tr key={i}>
                    {this.onlyGetImage(pro.thumbnail, i)}
                    <div className="back-pro">
                        <img alt="" width="60" id={`img${i}`} src=""/>
                    </div>
                    <td>{pro.name}</td>---
                    <td>{pro.thumbnail}</td>
                    <button onClick={this.delete.bind(this, pro.key)} className="btn btn-danger">Delete</button>
                  </tr>
                )}
            </div>
        </div> 
        );
    }
}
 
export default Cpanel;