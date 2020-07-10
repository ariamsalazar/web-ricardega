import React, { useState } from 'react';
import firebase, { storage } from "../firebase-config";
import ReactLoading from 'react-loading';

function NewProject() {
    // Declaración de una variable de estado que llamaremos "count"
    const [image, setImage] = useState(null);
    const [image_project, setImageProject] = useState(null);
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);
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
        var thumbnail = image.name;
        
        var project_img = image_project.name;
        setDate(new_date);
        setLoading(true);
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
            setName(""); 
            setImage("");
            setImageProject("");
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
        });
        // Upload Images To Firebase
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
                // setUrl(fireBaseUrl);
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
                setLoading(false);
                window.location.reload(false);
                // setUrl(fireBaseUrl);
            })
        })
    }
    // console.log('Prooooo >> '+image_project.name)
    // console.log(image.name)
    return (
        <div>
            <form onSubmit={handleFireBaseUpload} className="form-new-project">
                    <span className="title-form">Upload content</span>
                    <input 
                        type="text"
                        placeholder="Project Name"
                        name="name"
                        id="name"
                        value={name}
                        className="input-new-project"
                        onChange={e => setName(e.target.value)}
                    />
                    <div className="box-input">
                        <label className="label-i">Add Thumbnail</label>
                        <input 
                            type="file"
                            placeholder="image"
                            id="image"
                            name="image"
                            className="btn-upload"
                            onChange={e => setImage(e.target.files[0])}
                        />
                    </div>
                    <div className="box-input">
                        <label className="label-i">Add Project</label>
                        <input 
                            type="file"
                            placeholder="image_project"
                            id="image_project"
                            name="image_project"
                            className="btn-upload"
                            onChange={e => setImageProject(e.target.files[0])}
                        />
                    </div>
                    <input className="btn-new" type="submit" value="Upload"/>
                    {loading && 
                        <ReactLoading type="spin" color={"black"} height={'3%'} width={'3%'} className="spin" />
                    }
                    
            </form>
            <span>{url}</span>
        </div>
    );
}
export default NewProject;