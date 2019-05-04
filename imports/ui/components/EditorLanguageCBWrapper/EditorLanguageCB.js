import React from 'react';
import PropTypes from 'prop-types';
import { getLanguageName } from '../../../modules/get-select-translations';
import styled from 'styled-components';

const StyledCB = styled.input`
    margin-right: .5rem!important;`
;
const StyledLabel = styled.label`
    font-size: 1.3rem;
    font-weight: 400;
    color: #ffffff;
    text-transform: uppercase;
`;

class EditorLanguageCB extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        
      };
    }

    componentDidMount () {
        const languages = this.props.activity.languages;
        const language = this.props.language;
        this.setState({
            checked: languages.indexOf(language) > -1
        });
    }

    handleCheckbox = (e) => {
        const { language, activity } = this.props;
        const checked = e.target.checked;
        const activityId = activity._id;
        const languages = this.props.activity.languages;
        // CB was checked
        if (checked) {
            // verify that language IS NOT in the list
            if(languages.indexOf(language) < 0) {
                const newLanguages = languages;
                newLanguages.push(language);
                Meteor.call('activities.updateAttributes', 
                    activityId, 'languages', newLanguages,
                    (error) => {
                        if(error) {
                            Bert.alert(error.reason, 'danger');
                        } else { 
                            Bert.alert('Language version published', 'info');
                            this.setState({
                                checked: checked
                            });
                        }
                    });
            }
        } else {
        // CB was un-checked
            // verify that language IS in the list
            if(languages.indexOf(language) > -1) {
                // at least one language must remain
                if(languages.length > 1) {
                    languages.splice(languages.indexOf(language), 1);
                    const newLanguages = languages;
                    Meteor.call('activities.updateAttributes', 
                    activityId, 'languages', newLanguages,
                    (error) => {
                        if(error) {
                            Bert.alert(error.reason, 'danger');
                        } else { 
                            Bert.alert('Language version unpublished', 'info');
                            this.setState({
                                checked: checked
                            });
                        }
                    });
                } else {
                    Bert.alert('Cannot remove language. There must be at least one active languages', 'danger');
                }
            }
        }
        // this.setState({
        //     public : checked,
        // });
    }
    render () {
    const { language } = this.props;

    return (
        <li className="list-inline-item">
            <StyledLabel className="cbContainer">
                <StyledCB
                    type="checkbox"
                    name={language}
                    checked={this.state.checked || false}
                    onChange={this.handleCheckbox} />
                <span className="cbCheckmark"></span>
                {getLanguageName(language)}
            </StyledLabel>
        </li>
    )}
}

EditorLanguageCB.propTypes = {
    activity: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
};

export default EditorLanguageCB;
