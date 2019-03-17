import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
class InactivateUserButton extends React.Component {
    constructor(props){
      super(props);
    }
  
    inactivateUser = () => {
      const userId = this.props.userListed._id;
      if (confirm('Inactivate user?')) {
          Meteor.call('users.inactivate', userId, (error, result) => {
            if(error) { 
              console.log(error)
              Bert.alert(error.message, 'danger');
            } else {
              Bert.alert('User inactivted', 'warning');
            }
          });
      }
    }
    activateUser = () => {
      const userId = this.props.userListed._id;
      if (confirm('Activate user?')) {
          Meteor.call('users.activate', userId, (error, result) => {
            if(error) { 
              Bert.alert(error.message, 'danger');
            } else {
              Bert.alert('User is active', 'success');
            }
          });
      }
    }
  
    render() {
      const { userListed } = this.props;
      const inactive = userListed.roles 
        ? userListed.roles.includes('inactive')
        : false;
      return ( 
        inactive ? 
          <Button color="warning" 
              onClick={() => this.activateUser()}>
              Activate
          </Button>
        : 
        <Button color="warning" 
          onClick={() => this.inactivateUser()}>
          Inactivate
        </Button>            
      );
    }
  }
  
  InactivateUserButton.propTypes = {
    userListed: PropTypes.object.isRequired,
  }
  
  export default InactivateUserButton;