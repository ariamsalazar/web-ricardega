import React from 'react';
import firebase from '../firebase-config';

class Cpanel extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('projects');
        this.unsubscribe = null;
        this.state = { 
            projects: [],
            name: '',
            date: '',
            thumbnail: ''
        }
        this.upload = this.upload.bind(this);
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
    
    // New Project Upload
    upload(){
        alert(1);
    }
    // Delete Project Function
    delete(id){
        console.log(id);
        firebase.firestore().collection('projects').doc(id).delete().then(() => {
          console.log("Document successfully deleted!");
          this.props.history.push("/")
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
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
                <form>
                    <label>Upload Project</label>
                    <input
                    type="name"
                    id="name"
                    name="name"
                    placeholder="name"
                    onChange={this.handleChange}
                    value={this.state.name}
                    />
                    <label>Upload Thumbnail - {this.state.thumbnail} </label>
                    <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    placeholder="thumbnail"
                    onChange={this.handleChange}
                    value={this.state.thumbnail}
                    />
                    <button onClick={this.upload}>Upload</button>
                </form>
            </div>
            {/* Second Component */}
            <div className="first-part second">
                {this.state.projects.map((pro, i) =>
                  <tr key={i}>
                    <td>{pro.name}</td>
                    <td>{pro.project_img}</td>
                    <button onClick={this.delete.bind(this, pro.key)} className="btn btn-danger">Delete</button>
                  </tr>
                )}
            </div>
            
        </div> 
        );
    }
}
 
export default Cpanel;