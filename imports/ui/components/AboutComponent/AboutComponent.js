import React from 'react';
import i18n from 'meteor/universe:i18n';

class AboutComponent extends React.Component {
    constructor(props){
      super(props);
      
    }

    render() {
        return (
            <div className="AboutComponent">
                <div>
                    <img src="/img/ui/dandelion.png" />
                </div>
                <div>
                    <h1>{i18n.__('about.title')}</h1>
                    <p>{i18n.__('about.description')}</p>
                </div>
            </div>
        )
    }
}


export default AboutComponent;
