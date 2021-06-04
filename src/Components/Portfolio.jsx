import React, { Fragment } from 'react';
import ModalProject from '../Components/Modal';
import firebase, { storage } from "../firebase-config.js";

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        //Get DB Instance
        this.ref = firebase.firestore().collection('projects').orderBy('numberAsInt', 'desc');
        this.unsubscribe = null;
        this.state = {
            showModal: false,
            projects: [],
            projectName: '',
            loading: ''
        };

        this.toggle = this.toggle.bind(this);
        this.onlyGetImage = this.onlyGetImage.bind(this);

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
    //Get ONLY One picture
    onlyGetImage(img, ix){
        let srcU = "";
        storage.ref().child("/images/"+img).getDownloadURL().then((url) => {
            srcU= '#img-'+ix;
            document.querySelector(srcU).setAttribute("src", url)
            }).catch((error) => {
        })
    }
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }
  
    render() { 
        // const { t } = this.props;  
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
                        <div className="logo-fixed ah-mob mobile"></div>
                        <span className="title-main av no-mobile">
                            <span className="bold-text">Ricardo Guevara</span> Graphic Designer 
                        </span>
                    </div>
                    {/* Grid Projects */}
                    <div className="container-rows">    
                        {this.state.projects.map((pro, i) =>
                        <Fragment>
                            {this.onlyGetImage(pro.thumbnail, i)}
                            <div className="rows-item" 
                            onClick={() => { this.setState({projectName: pro.project_img, showModal: true }); } 
                            }
                            key={i}
                            >   
                                <img className="pic-pro" id={`img-${i}`} src="./load.gif" alt="Img"/> 
                                <div className="overlay">
                                <div className="text">{pro.name}</div>
                                </div>
                            </div>
                        </Fragment>
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