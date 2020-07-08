import React, { useState } from 'react';
import { storage } from "../firebase-config";

function NewProject() {
    // Declaración de una variable de estado que llamaremos "count"
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");

    const handleChange = e => {
        if (e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        
    };

    const handleFireBaseUpload = (e) => {
        e.preventDefault();
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
                console.log(fireBaseUrl);
                setUrl(fireBaseUrl);
            })
        })
    }
    return (
        <div>
            <form onSubmit={handleFireBaseUpload}>
                    <input 
                        type="file"
                        onChange={handleChange}
                    />
                    <input 
                        type="file"
                        onChange={handleChange}
                    />
                    <button onClick={handleUpload}>Upload</button>
            </form>
            <span>{url}</span>
        </div>
    );
}
export default NewProject;