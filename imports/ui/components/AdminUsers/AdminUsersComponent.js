import React from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col } from 'reactstrap';
import AdminUserComponent from './AdminUserComponent';
import NewUserButton from './NewUserButton';
import sortUsers from './sortUsers';

import './AdminUsersComponent.scss';

class AdminUsersComponent extends React.Component{
  constructor(props){
    super(props);
  }

  render (){
    const { users, organisations } = this.props;
    if(users.length > 1) { 
      users.sort((a,b) => sortUsers.byRole(a,b));
    }
           
    return (
      organisations.length > 0 ? 
      <div className="border AdminUsersComponent container">
        <Row>
            <Col>
                <NewUserButton
                  organisations={organisations} />
            </Col>
        </Row>
        {users.length ? (
          <Row>
            <Col>
              <Table responsive>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Username</th>
                    <th>Organisation</th>
                    <th>Roles</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {users.map(userL => (
                    <AdminUserComponent 
                      key={userL._id} 
                      userListed={userL}
                      organisations={organisations}
                    />
                ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        ) : <div> There are no users</div>}
        </div>
        : 'No organisations yet.'
    );
  }
}

AdminUsersComponent.defaultProps = {
  organisations : [],
  users: [],
};

AdminUsersComponent.propTypes = {
  organisations: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object),
};

export default AdminUsersComponent;
