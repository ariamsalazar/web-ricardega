import React, { Fragment } from 'react';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { t } = this.props;
        return ( 
            <Fragment >
                <div className="master layout-1">
                    {/* <span> {t('home.title')}</span>  */}
                    <div className="logo-fixed"></div>
                    <div className="header-fixed">Ricardega Grappih Designer</div>
                    
                    <div className="fixed-left">Work</div>
                    <div className="line-left"></div>

                    <div className="container-rows">
                        <div class="rows-item a">1</div>
                        <div class="rows-item b">1</div>
                        <div class="rows-item c">1</div>
                        <div class="rows-item a">1</div>
                        <div class="rows-item b">1</div>
                        <div class="rows-item c">1</div>
                        <div class="rows-item a">1</div>
                        <div class="rows-item b">1</div>
                        <div class="rows-item c">1</div>
                    </div>
                    
                </div>
            </Fragment>
         );
    }
}
 
export default Portfolio;