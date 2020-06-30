import React from 'react';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { t } = this.props;
        return ( 
            <div style={{backgroundColor: 'tomato', height: '100%'}}>
                Portfolio
                <span> {t('home.title')}</span> 
                <div className="fixed-left">
                    Work
                </div>
                <div className="line-left"></div>
            </div>
         );
    }
}
 
export default Portfolio;