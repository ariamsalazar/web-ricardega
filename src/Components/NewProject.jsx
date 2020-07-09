import React, { useState } from 'react';
import firebase, { storage } from "../firebase-config";

function NewProject() {
    // Declaración de una variable de estado que llamaremos "count"
    const [image, setImage] = useState(null);
    const [image_project, setImageProject] = useState(null);
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    // this.ref = firebase.firestore().collection('projects');

    const handleChange = e => {
        if (e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }

    const getCurrentDate = (separator='-') => {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`;
    }

    const handleFireBaseUpload = (e) => {
        e.preventDefault();
        var new_date = getCurrentDate();
        setDate(new_date);
        var thumbnail = image.name;
        var project_img = image_project.name
        //Add Project To DB Firebase
        firebase.firestore().collection('projects').add({
            name,
            thumbnail,
            project_img,
            new_date
          }).then((docRef) => {
            this.setState({
              name: '',
              image: '',
              image_project: '',
              date: ''
            });
            console.log('Agrego >> '+docRef);
            // this.props.history.push("/")
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
        });
        
        
        const uploadTask = storage.ref(`/images/${image.name}`).put(image);
        uploadTask.on(
        'state_changed', 
        (snapShot) => {
            console.log(snapShot)
        }, (err) => {
            //catches the errors
            console.log(err)
        }, () => {
            storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then(fireBaseUrl => {
                setUrl(fireBaseUrl);
            })
        })
        const uploadTask2 = storage.ref(`/images/${image_project.name}`).put(image_project);
        uploadTask2.on(
        'state_changed', 
        (snapShot) => {
            console.log(snapShot)
        }, (err) => {
            //catches the errors
            console.log(err)
        }, () => {
            storage
            .ref('images')
            .child(image_project.name)
            .getDownloadURL()
            .then(fireBaseUrl => {
                setUrl(fireBaseUrl);
            })
        })
    }

    return (
        <div>
            <form onSubmit={handleFireBaseUpload}>
                    <input 
                        type="text"
                        placeholder="name"
                        name="name"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="file"
                        placeholder="image"
                        id="image"
                        name="image"
                        onChange={e => setImage(e.target.files[0])}
                    />
                    <input 
                        type="file"
                        placeholder="image_project"
                        id="image_project"
                        name="image_project"
                        onChange={e => setImageProject(e.target.files[0])}
                    />
                    <button>Upload</button>
            </form>
            <span>{url}</span>
        </div>
    );
}
export default NewProject;