import React from 'react';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { t } = this.props;
        return ( 
            <div style={{backgroundColor: 'red', height: '100%'}}>
                About  <span> {t('home.title')}</span> 
                <div className="fixed-right">
                    About / Contact
                </div>
                <div className="line-right"></div>
            </div>
         );
    }
}
 
export default About;