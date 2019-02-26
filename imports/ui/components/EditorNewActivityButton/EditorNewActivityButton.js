import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../Icon/Icon';
import { BasicStyledButton } from '../MainStyledComponents/MainStyledComponents';
import './EditorNewActivityButton.scss';
import newActivity from './mockNewActivity.json';

const StyledButton = styled(BasicStyledButton)`
    float: right;
    font-size: 1.6rem;
    margin-top: 1rem;
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
        onClick={this.createActivity}
        backcolor={'#0e8ed5'}
        color={'white'}>
        <Icon icon={'plus'} /> Add new activity
      </StyledButton>
    );
  }
}

EditorNewActivityButton.propTypes = {
  editCallback: PropTypes.func.isRequired,
};

export default EditorNewActivityButton;