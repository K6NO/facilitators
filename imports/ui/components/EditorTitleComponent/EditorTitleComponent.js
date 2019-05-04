import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import styled from 'styled-components';
import { Colors } from '../../../modules/colors';
const StyledTitle = styled.h2`
    font-family: 'Amatic SC', cursive;
    font-size: 2rem;
    line-height: 3rem;
    text-transform: uppercase;
    color: #ffffff;
`;
const StyledInput = styled.input`
    font-family: 'Amatic SC', cursive;
    font-size: 2rem;
    line-height: 3rem;
    text-transform: uppercase;
    min-width: 300px;
    color: ${Colors.textDark};
    &:focus, &:hover {
        background: #ffffffaa;
        outline: none;
        border: 1px solid white;
        color: ${Colors.textDark};
    }
`;

class EditorTitleComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          title : this.props.activity.title[this.props.language],
          editing: false
      }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.language !== this.props.language) {
            this.setState({
                title: nextProps.activity.title[nextProps.language]
            });
        }
    }

    updateTitle = (e) => {
        this.setState({title: e.target.value})
    }
    startEditHandler = () => {
        this.setState({editing: true});
    }
    saveTitle = () => {
        const { language } = this.props;
        const activityId = this.props.activity._id;
        Meteor.call('activities.updateLangAttributes', 
        activityId, 'title', language, this.state.title,
        (error) => {
            if(error) {
                Bert.alert(error.reason, 'danger');
            } else { 
                Bert.alert('Saved changes', 'success');
            }
        });
        this.setState({editing: false})
    }

    render() {
        const { activity, language } = this.props;
        return (
            <div className="EditorTitleComponent">
                {this.state.editing 
                ? <StyledInput
                    autoFocus
                    className="activityTitleEditing"
                    value={this.state.title}
                    onChange={this.updateTitle}
                    onBlur={this.saveTitle}
                    category={activity.category} />
                : <StyledTitle 
                    className="activityTitle"
                    onClick={this.startEditHandler}>{activity.title[language] || 'Click here to add a title'}
                </StyledTitle>}
            </div>
        )
    }
}

EditorTitleComponent.defaultProps = {
};
  
EditorTitleComponent.propTypes = {
    activity: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
};


export default EditorTitleComponent;

