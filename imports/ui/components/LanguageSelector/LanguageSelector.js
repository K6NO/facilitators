import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import i18n from 'meteor/universe:i18n';

class LanguageSelector extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        locale: this.props.locale,
      };
    }
    componentWillReceiveProps (newProps) {
        if(this.props.locale !== newProps.locale) {
            this.setState({
                locale: newProps.locale
            });
        }
    }
    
    render () {
        const languageArray = [
            { value: 'en', label: i18n.__('searchbox.en')},
            { value: 'es', label: i18n.__('searchbox.es')},
            { value: 'hu', label: i18n.__('searchbox.hu')},
            { value: 'ro', label: i18n.__('searchbox.ro')},
            { value: 'sk', label: i18n.__('searchbox.sk')},
        ];
        
        return (
            <ReactSelect 
                className="LanguageSelector"
                options={languageArray}
                value={this.state.locale}
                name="languageSelect"
                onChange={this.props.updateLocale}/>
        )
    }
}
  
LanguageSelector.propTypes = {
    updateLocale : PropTypes.bool.isRequired,
};
  
export default LanguageSelector;
  