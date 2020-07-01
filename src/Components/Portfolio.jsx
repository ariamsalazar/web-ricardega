import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalProject from '../Components/Modal';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.toggle = this.toggle.bind(this);
       
    }

    toggle() {
        this.setState(prevState => ({
          showModal: !prevState.showModal
        }));
    }

    render() { 
        const { t } = this.props;  
        console.log(this.state.showModal)
        return ( 
            <div style={{backgroundColor: 'white'}}>
                {this.state.showModal && (
                    <ModalProject
                        show={this.state.showModal}
                        handleClose={() => this.setState({ showModal: false })}
                    />
                )}
                <div className="master layout-1">
                    {/* <span> {t('home.title')}</span>  */}
                    <div className="header-fixed">
                        <span className="title-main av">
                            <span className="bold-text">Ricardo Guevara</span> Graphic Designer 
                        </span>
                    </div>
                    
                    <div className="container-rows">
                        <div className="rows-item p1" onClick={this.toggle}>
                            <div className="overlay">
                                <div className="text">Matilda's Bows</div>
                            </div>
                        </div>
                        <div className="rows-item p2" onClick={this.toggle}>
                            <div className="overlay">
                                <div className="text">Proyecto #2</div>
                            </div>
                        </div>
                        <div className="rows-item p3">
                             <div className="overlay">
                                <div className="text">Proyecto #2</div>
                            </div>
                        </div>
                        <div className="rows-item p4">
                             <div className="overlay">
                                <div className="text">Proyecto #2</div>
                            </div>
                        </div>
                        <div className="rows-item p5">
                             <div className="overlay">
                                <div className="text">Proyecto #2</div>
                            </div>
                        </div>
                        <div className="rows-item p6">
                             <div className="overlay">
                                <div className="text">Proyecto #2</div>
                            </div>
                        </div>
                        <div className="rows-item p1">
                             <div className="overlay">
                                <div className="text">Proyecto #2</div>
                            </div>
                        </div>
                        <div className="rows-item p2">
                             <div className="overlay">
                                <div className="text">Proyecto #2</div>
                            </div>
                        </div>
                        <div className="rows-item p3">
                             <div className="overlay">
                                <div className="text">Proyecto #2</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="footer-main">
                    Copyright All rigth reserved 2020. Ricardo Guevara 
                </div>
            </div>
         );
    }
}
 
export default Portfolio;