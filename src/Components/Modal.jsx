import React, { Fragment } from 'react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

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
      
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    render() { 
        var { handleClose, project } = this.props;
        return ( 
            <Modal isOpen={handleClose} toggle={handleClose} className="modalContent" style={{backgroundImage: 'url(./project_img/'+project+')'}}>
                <span className="btn-close" onClick={handleClose}></span>
            </Modal>    
        );
    }
}
 
export default ModalProject;