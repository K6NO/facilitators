import React from 'react';
import i18n from 'meteor/universe:i18n';
import { getOrganisations, getSponsors } from '../../../modules/get-select-translations';

class PartnersComponent extends React.Component {
    constructor(props){
      super(props);
      
    }

    render() {
        return (
            <div className="PartnersComponent">
                <div>
                    <img src="/img/ui/dandelion.png" />
                </div>
                <div>
                    <h1>{i18n.__('about.contributors')}</h1>
                    <h1>{i18n.__('about.organisations')}</h1>
                    <h1>{i18n.__('about.sponsors')}</h1>
                    
                </div>
            </div>
        )
    }
}


export default PartnersComponent;
