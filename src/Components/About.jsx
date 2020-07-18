import React from 'react';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { t } = this.props;
        return ( 
            <div className="layout-2">
                {/* About  <span> {t('home.title')}</span>  */}
                <div className="header-fixed black">
                    <span className="title-main white av">
                        <span className="bold-text">Ricardo Guevara</span> Graphic Designer 
                    </span>
                </div>

                <div className="container-about">
                    <div className="picture"></div><div className="about">
                        <span className="text-big-h">Hello</span>
                        <p className="text-about">
                            I'm a minimalist designer, with main focus on logo Design and Branding, I love simplicity. I think is the key for a great work. Less is more. 
                            <br/><br/>
                            Designing is my way of expressing my perception about nature, I love to work because I love design and for me, designing is not my job, design is who I am.
                        </p>

                        <span className="title-middle">Get in touch</span>
                        <span className="title-small">ricardega@gmail.com</span>
                        <div className="container-rr">
                            <a className="rr r1" href="/"></a><a className="rr r2" href="/"></a><a className="rr r3" href="/"></a>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default About;