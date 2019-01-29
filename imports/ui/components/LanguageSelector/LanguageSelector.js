import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import i18n from 'meteor/universe:i18n';
import getLocale from '../../../modules/get-locale';
import './LanguageSelector.scss';

class LanguageSelector extends React.Component {

    
    render () {
        const languageArray = [
            { value: 'en', label: i18n.__('searchbox.en')},
            { value: 'es', label: i18n.__('searchbox.es')},
            { value: 'hu', label: i18n.__('searchbox.hu')},
            { value: 'ro', label: i18n.__('searchbox.ro')},
            { value: 'sk', label: i18n.__('searchbox.sk')},
        ];
        const locale = getLocale();
        const label = languageArray.find(e => e.value === locale).label;        
        // const defaultText = languageArray[languageArray.indexOf(this.state.locale)].value;
        // console.log(defaultText);
        
        return (
            <Select 
                className="basic-single LanguageSelector"
                classNamePrefix="select"
                isClearable={false}
                isSearchable={false}
                options={languageArray}
                defaultValue={label}
                // value={this.state.locale}
                onChange={this.props.updateLocaleCallback}
                aria-label="Select Language"
                name="LanguageSelector"
                />
        )
    }
}
  
LanguageSelector.propTypes = {
    updateLocaleCallback : PropTypes.func.isRequired,
};
  
export default LanguageSelector;
  