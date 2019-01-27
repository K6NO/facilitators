import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem  } from 'reactstrap';
import ReactSelect from 'react-select';
import i18n from 'meteor/universe:i18n';
import getLocale from '../../../modules/get-locale';
import setLocale from '../../../modules/set-locale';

const T = i18n.createComponent();

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
        
        return (
            <ReactSelect 
                className="LanguageSelector"
                options={[
                    { value: 'en', label: 'English'},
                    { value: 'es', label: 'Spanish'},
                    { value: 'hu', label: 'Hungarian'},
                    { value: 'ro', label: 'Romanian'},
                    { value: 'sk', label: 'Slovakian'},
                  ]}
                value={this.state.locale}
                name="languageSelect"
                onChange={this.props.updateLocale}/>
        )
    }
}

LanguageSelector.defaultProps = {
    
};
  
LanguageSelector.propTypes = {

};
  
export default LanguageSelector;
  