import React from 'react';
import { Modal } from 'reactstrap';
import { storage } from "../firebase-config.js";

class ModalProject extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          loading: true,
          stateToggle: '',
          modal: false,
          show: true
        };
    }
    //Get ONLY One picture
    onlyGetImage(img){
      console.log('INSIDE BETA'+img);
      storage.ref().child("/images/"+img).getDownloadURL().then((url) => {
          document.querySelector("#imgUpload").setAttribute("src", url)
          }).catch((error) => {
      })
    }  
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    render() { 
        var { handleClose, project } = this.props;
        this.onlyGetImage(project);
        return ( 
            <Modal isOpen={handleClose} toggle={handleClose} className="modalContent">
                <img className="pro-img-complete" id="imgUpload" src=""/>
                <span className="btn-close" onClick={handleClose}></span>
            </Modal>     
        );
    }
}
 
export default ModalProject;