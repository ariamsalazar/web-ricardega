import React, { useState } from 'react';
import firebase from '../firebase-config';
import { storage } from "../firebase-config";
import NewProject from './NewProject';

class Cpanel extends React.Component {
    constructor(props) {
        super(props);
        //Get DB Instance
        this.ref = firebase.firestore().collection('projects').orderBy('thumbnail', 'desc');
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
          const { name, thumbnail, project_img, new_date } = doc.data();
          projects.push({
            key: doc.id,
            doc, // DocumentSnapshot
            name,
            thumbnail,
            project_img,
            new_date
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
        console.log(this.state.projects);
        const { projects } = this.state;
        return ( 
        <div>
            {/* First Component */}
            <div className="first-part">
                <div className="logo-admin"></div>
                <button onClick={this.logout} className="log-in out">Logout</button>
                {/* Form New Project */}
                <NewProject/>
            </div>
            {/* Second Component */}
            <div className="first-part second">
                <div className="container-admin">
                    {projects.map((pro, i) => 
                        <div className="project-admin">
                             {this.onlyGetImage(pro.thumbnail, i)}
                            <button className="btn-option" onClick={this.delete.bind(this, pro.key)}>Delete</button>
                            <button className="btn-option">Edit</button>
                            <img className="img-admin" id={`img${i}`} src="" />
                            <span className="av name-admin">{pro.name}</span>
                            <span className="av name-admin date">- updated on: {pro.new_date}</span>
                        </div>
                    )
                    }
                </div>
            </div>
        </div> 
        );
    }
}
 
export default Cpanel;