import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import i18n from 'meteor/universe:i18n';
import { getLanguageArray, getLanguageName } from '../../../modules/get-select-translations';
import './EditorLanguageSelector.scss';

class EditorLanguageSelector extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        selected: this.props.language
      };
    }
    
    render () {
        const languageArray = getLanguageArray();
        const { selectLanguageCallback, language } = this.props;
        return (
          <div>
            <span>Editing the </span>
              <Select 
                  className="basic-single EditorLanguageSelector"
                  classNamePrefix="select-editorlanguage"
                  isClearable={false}
                  isSearchable={false}
                  options={languageArray}
                  placeholder={getLanguageName(language)}
                  value={this.state.locale}
                  onChange={(selection) => selectLanguageCallback(selection.value)}
                  aria-label="Select Language"
                  name="LanguageSelector"
                  />
            <span> language version</span>
          </div>
        )
    }
}
  
EditorLanguageSelector.propTypes = {
    language: PropTypes.string.isRequired,
    selectLanguageCallback: PropTypes.func.isRequired,
};
  
export default EditorLanguageSelector;
  