import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import i18n from 'meteor/universe:i18n';
import setLocale from '../../../modules/set-locale';
import getLocale from '../../../modules/get-locale';
import getLanguageArray from '../../../modules/get-language-array';
import './LanguageSelector.scss';



class LanguageSelector extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            locale : 'English',
        }
    }

    updateLocale = (localeObject) => {    
        const languageArray = getLanguageArray();
        i18n.setLocale(localeObject.value)
            .then(() => {
                const locale = getLocale();
                const label = languageArray.filter(e => e.value === locale)[0].label;
                this.setState({
                locale: label
            });
            console.log(this.state.locale)
        });
      }

    
    render () {
        const languageArray = getLanguageArray();  
        return (
            <Select 
                className="basic-single LanguageSelector"
                classNamePrefix="select"
                isClearable={false}
                isSearchable={false}
                options={languageArray}
                // defaultValue={this.state.locale}
                placeholder={this.state.locale}
                value={this.state.locale}
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
  