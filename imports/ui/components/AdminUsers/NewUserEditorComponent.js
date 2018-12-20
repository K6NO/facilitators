/* eslint-disable max-len, no-return-assign */
import React from 'react';
import { Table, Button, ButtonGroup, Row, Col } from 'reactstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import AdminUserComponent from './AdminUserComponent';

// import './NewUserEditorComponent.scss';

class NewUserEditorComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        user : {
          name: '',
          password: '',
          email: '',
          username: '',
          organisation: '',
          roles: [],
        },
      };
  }

  updateUserState = (field, event) => {
    this.setState({
      user : {
        ...this.state.user,
        [field]: event.target.value,
      }
    });
  }
  
  render() {
    const { closeCallback, organisations } = this.props;
    return ( 
        <div className="NewUserEditorComponent">
            <Row>
                <Col>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Username</th>
                            <th>Organisation</th>
                            <th>Roles</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            <AdminUserComponent 
                                user={this.state.user}
                                organisations={organisations}
                                closeCallback={closeCallback}
                                />
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    );
  }
}


export default NewUserEditorComponent;