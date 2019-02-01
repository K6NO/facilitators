import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import i18n from 'meteor/universe:i18n';
import setLocale from '../../../modules/set-locale';
import getLocale from '../../../modules/get-locale';
import './LanguageSelector.scss';

class LanguageSelector extends React.Component {

    updateLocale = (localeObject) => {    
        setLocale(localeObject.value);
      }

    
    render () {
        const languageArray = [
            { value: 'en-US', label: i18n.__('searchbox.en-US')},
            { value: 'es', label: i18n.__('searchbox.es')},
            { value: 'hu', label: i18n.__('searchbox.hu')},
            { value: 'ro', label: i18n.__('searchbox.ro')},
            { value: 'sk', label: i18n.__('searchbox.sk')},
        ];
        const locale = getLocale();
        
        const label = languageArray.filter(e => e.value === locale)[0].label;
        
        
        return (
            <Select 
                className="basic-single LanguageSelector"
                classNamePrefix="select"
                isClearable={false}
                isSearchable={false}
                options={languageArray}
                defaultValue={label}
                // value={this.state.locale}
                onChange={this.updateLocale}
                aria-label="Select Language"
                name="LanguageSelector"
                />
        )
    }
}
  
LanguageSelector.propTypes = {
};
  
export default LanguageSelector;
  