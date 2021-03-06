import React from 'react';
import Select from 'react-select';
import i18n from 'meteor/universe:i18n';
import getLocale from '../../../modules/get-locale';
import { getLanguageArray, getLanguageName } from '../../../modules/get-select-translations';
import './LanguageSelector.scss';



class LanguageSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locale : getLanguageName(getLocale()),
        }
    }

    updateLocale = (localeObject) => {    
        i18n.setLocale(localeObject.value)
            .then(() => {
                const locale = getLocale();
                const label = getLanguageName(locale);
                this.setState({
                locale: label
            });
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
                placeholder={this.state.locale}
                value={this.state.locale}
                onChange={this.updateLocale}
                aria-label="Select Language"
                name="LanguageSelector"
                />
        )
    }
}
  
export default LanguageSelector;
  