/* eslint-disable max-len, no-return-assign */
import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

// import './DeleteOrganisationButton.scss';

class DeleteOrganisationButton extends React.Component {
  constructor(props){
    super(props);
  }

  deleteOrganisation = () => {
    const { organisationId } = this.props;
    if (confirm('Delete organisation? This is permanent!')) {
        Meteor.call('organisations.remove', organisationId);
    }
  }

  render() {
    return ( 
        <Button 
          color="danger" 
          onClick={() => this.deleteOrganisation()}>
            Delete
          </Button>
    );
  }
}

DeleteOrganisationButton.propTypes = {
  organisationId: PropTypes.string.isRequired,
};

export default DeleteOrganisationButton;