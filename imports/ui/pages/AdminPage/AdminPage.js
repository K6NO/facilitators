import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import AdminOrganisationsComponent from '../../components/AdminOrganisations/AdminOrganisationsComponent';
import AdminUsersComponent from '../../components/AdminUsers/AdminUsersComponent';
import Organisations from '../../../api/Organisations/Organisations';
import './AdminPage.scss';

class AdminPage extends React.Component{
  constructor(props){
    super(props);
  }
 
  // need to check lenghth of users, otherwise the logged in admin will
  // create the first AdminUserComponent, without organisation field
  render (){
    const {users, organisations, loading} = this.props;
    return (! loading ? (
      <div className="AdminPage">
        <AdminOrganisationsComponent 
          organisations={organisations}
        />
        {users.length > 1 ? 
          <AdminUsersComponent 
          organisations={organisations}
          users={users}
        />
          : ''}
      </div>
    ) : '');
  }
}

AdminPage.defaultProps = {
  organisations : [],
  users: [],
};

AdminPage.propTypes = {
  organisations: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
};


export default withTracker(() => {
  const usersSub = Meteor.subscribe('users.all');
  const users = Meteor.users.find().fetch();
  const organisationsSub = Meteor.subscribe('organisations');
  const organisations = organisationsSub.ready() ? Organisations.find().fetch() : [];

  return {
    loading: ! usersSub.ready() && organisationsSub.ready(),
    users,
    organisations,
  };
})(AdminPage);
