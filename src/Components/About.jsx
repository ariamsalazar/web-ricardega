import React from 'react';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { t } = this.props;
        return ( 
            <div style={{backgroundColor: 'black', height: '100%', color: 'white'}}>
                About  <span> {t('home.title')}</span> 
                
            </div>
         );
    }
}
 
export default About;