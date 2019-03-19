import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styled from 'styled-components';
import { getLanguageArray, getLanguageName } from '../../../modules/get-select-translations';
import './EditorLanguageSelector.scss';

const StyledText = styled.span`
  color: #ffffff;

`;

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
            <StyledText>Editing the </StyledText>
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
            <StyledText> language version</StyledText>
          </div>
        )
    }
}
  
EditorLanguageSelector.propTypes = {
    language: PropTypes.string.isRequired,
    selectLanguageCallback: PropTypes.func.isRequired,
};
  
export default EditorLanguageSelector;
  