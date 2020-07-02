import React from 'react';
import ModalProject from '../Components/Modal';
import firebase from "../firebase-config.js";

class Portfolio extends React.Component {
    constructor(props) {
        super(props);

        this.ref = firebase.firestore().collection('projects');
        this.unsubscribe = null;

        this.state = {
            showModal: false,
            projects: [],
            projectName: ''
        };

        this.toggle = this.toggle.bind(this);
       
    }

    toggle() {
        this.setState(prevState => ({
          showModal: !prevState.showModal
        }));
    }

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
    
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }
  
    render() { 
        const { t } = this.props;  
        return ( 
            <div style={{backgroundColor: '#fff'}}>
                {/* Project Modal  */}
                {this.state.showModal && (
                    <ModalProject
                        show={this.state.showModal}
                        project={this.state.projectName}
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
                    {/* Grid Projects */}
                    <div className="container-rows">
                        {this.state.projects.map((pro, i) =>
                            <div className="rows-item" 
                            onClick={() => { this.setState({projectName: pro.project_img, showModal: true }); } 
                            }
                            style={{backgroundImage: 'url(./projects/'+pro.thumbnail+')'}}
                            key={i}
                            >
                                <div className="overlay">
                                <div className="text">{pro.name}</div>
                                </div>
                            </div>
                        )}
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