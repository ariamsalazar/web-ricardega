import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 're-carousel';
import Portfolio from "../Components/Portfolio";
import About from "../Components/About";
import Buttons from '../General/buttons';
// Translation Higher Order Component
import {
    setTranslations,
    setDefaultLanguage,
    setLanguageCookie,
    setLanguage,
    translate,
  } from 'react-switch-lang';
  import en from '../assets/len/en.json';
  import es from '../assets/len/es.json';

// Do this two lines only when setting up the application
setTranslations({ en, es });
setDefaultLanguage('en');
 
// If you want to remember selected language
setLanguageCookie();

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    handleSetLanguage = (key) => () => {
        setLanguage(key);
    };
     
    render() { 
        const { t } = this.props;
        return ( 
            <div className="general">
                <Carousel widgets={[Buttons]} duration={500} auto={false} className="carousel-beta">
                    <Portfolio t={t}/>
                    <About t={t}/>
                </Carousel>    
            </div>
         );
    }
}

Home.propTypes = {
    t: PropTypes.func.isRequired,
};
   
export default translate(Home);
