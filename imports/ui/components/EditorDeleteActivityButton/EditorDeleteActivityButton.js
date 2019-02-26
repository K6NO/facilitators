import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import { BasicStyledButton } from '../MainStyledComponents/MainStyledComponents';


class EditorDeleteActivityButton extends React.Component{
  constructor(props){
    super(props);
  }
    
  deleteActivity = () => {
      const { activity } = this.props;
      Meteor.call('activities.remove', activity, (error) => {
          if(error) {
              Bert.alert(error.message, 'danger');
          } else {
              Bert.alert('Activity deleted', 'success');
          }
      });
  }
  render () {
      const { activity, userId } = this.props;
      
        return (
            (Roles.userIsInRole(userId, ['admin']) || activity.owner === userId) ?
            <BasicStyledButton 
                color={'white'}
                backcolor={'#dc3545'}
                onClick={this.deleteActivity}>
            <Icon icon={'trash'} />
            {` Delete`}
            </BasicStyledButton> : ''
        )
    }
}

EditorDeleteActivityButton.propTypes = {
  activity: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired
};


export default EditorDeleteActivityButton;