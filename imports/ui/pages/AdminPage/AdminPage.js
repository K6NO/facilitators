import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Table, Row, Col } from 'reactstrap';
import AdminOrganisationsComponent from '../../components/AdminOrganisations/AdminOrganisationsComponent';
import AdminUsersComponent from '../../components/AdminUsers/AdminUsersComponent';
import NewOrganisationButton from '../../components/NewOrganisationButton/NewOrganisationButton';
import Organisations from '../../../api/Organisations/Organisations';
import './AdminPage.scss';

class AdminPage extends React.Component{
  constructor(props){
    super(props);
  }
 
  // create the first AdminUserComponent, without organisation field
  render (){
    const {users, organisations, loading} = this.props;
    return (! loading ? (
      <div className="AdminPage">
        <Row>
          <Col>
            <NewOrganisationButton />
          </Col>
        </Row>
        <AdminOrganisationsComponent 
          organisations={organisations}
        />
        <AdminUsersComponent 
          organisations={organisations}
          users={users}
        />
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
