import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../Icon/Icon';
import { Row, Col } from 'reactstrap';
import './EditorNewActivityButton.scss';
import newActivity from './mockNewActivity.json';

const StyledButton = styled.button`
    float: right;
    height: 40px;
    min-width: 110px;
    padding: .8rem 1.5rem;
    background: #0e8ed5;
    color: white;
    text-transform: uppercase;
    font-size: 1.6rem;
    letter-spacing: 1.5px;
    font-weight: 100;
    margin-top: 1rem;
    border: 1px solid #0e8ed5;
    &:hover {
        background: #0e8ed5bb;
    }
    &:focus {
        outline: 1px dotted;
        background: #0e8ed5dd;
    }
`
class EditorNewActivityButton extends React.Component{
  constructor(props){
    super(props);
  }
 
  createActivity = () => {
    const { language, editCallback } = this.props;
    newActivity['languages'] = [language];
    Meteor.call('activities.insert', newActivity, (error, activityId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else { 
        Bert.alert('New activity created', 'success');
        editCallback(activityId);
      }
    });
    //TODO - direct user to single activity editor component with a callback to EditorPage
  }
  render () {
    return ( 
      <StyledButton
        onClick={this.createActivity}>
        <Icon icon={'plus'} /> Add new activity
      </StyledButton>
    );
  }
}

EditorNewActivityButton.propTypes = {
  editCallback: PropTypes.func.isRequired,
};

export default EditorNewActivityButton;