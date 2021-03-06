import React, { Fragment } from 'react';
import { Modal, ModalHeader } from 'reactstrap';
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
            <Fragment>
                <Modal isOpen={handleClose} toggle={handleClose} className="modalContent">
                    <ModalHeader toggle={handleClose}></ModalHeader>
                    <img className="pro-img-complete" id="imgUpload" src="/load.gif" alt="Img Portfolio"/>
                    {/* <span className="btn-close" onClick={handleClose}></span> */}
                </Modal> 
            </Fragment>    
        );
    }
}
 
export default ModalProject;