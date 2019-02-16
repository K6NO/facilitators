import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import Icon from '../Icon/Icon';



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
            <Button 
                className="EditorDeleteActivityButton"
                color="danger"
                onClick={this.deleteActivity}>
            <Icon icon={'trash'} />
            {` Delete`}
            </Button> : ''
        )
    }
}

EditorDeleteActivityButton.propTypes = {
  activity: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired
};


export default EditorDeleteActivityButton;