/* eslint-disable max-len, no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import AdminSelectOrganisationComponent from './AdminSelectOrganisationComponent';
import AdminUserRoleSelector from './AdminUserRoleSelector';
import DeleteUserButton from './DeleteUserButton';
import InactivateUserButton from './InactivateUserButton';
import saveUserProfile from './saveUserProfile';
import storePassword from './storePassword';
import './AdminUserComponent.scss';

class AdminUserComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        user : {
          name: props.userListed.profile && 
          props.userListed.profile.name.first + ' ' 
          + props.userListed.profile.name.last || '',
          email: props.userListed.emails && 
          props.userListed.emails[0].address || '',
          password : '',
          username: props.userListed.profile && 
          props.userListed.profile.username || '',
          organisation: props.userListed.organisation || '',
          roles: props.userListed.roles || [],
        },
        editing: false,
        passwordEditing : false,
      };
  }

  // Callbacks setting the state
  updateUserState = (field, event) => {
    this.setState({
      user : {
        ...this.state.user,
        [field]: event.target.value,
      }
    });
  }

  selectOrganisationCallback = (_id) => {
    this.setState({
        user : {
          ...this.state.user,
          organisation: _id,
        }
      });                       
  }
  switchUserRolesCallback = (roles) => {
        this.setState({
        ...this.state,
        user: {
            ...this.state.user,
            roles: roles,
        }
    });
  }
  resetUserStateCallback = () => {
    this.setState({
        user : {
              name: '',
              password: '',
              email: '',
              username: '',
              organisation: '',
              roles: [],
          },
      });
  }
  // Switch the main editing element's state
  switchEditing = () => {
    if(this.state.editing) {
        const { userListed, closeCallback } = this.props;
        saveUserProfile(userListed, this.state.user, closeCallback, this.resetUserStateCallback);
    }
    this.setState({
        ...this.state,
        editing: !this.state.editing,
    });
  }
  // switch the password editing element's state
  switchPasswordEditing = () => {
    const { userListed } = this.props;
    if(this.state.passwordEditing) {
        const isNewUser = storePassword(userListed, this.state.user);
        // Reset state for new and existing user when edit mode 
        isNewUser ? (
            this.setState({
                user: {
                    ...this.state.user,
                    password: '',
                },
                passwordEditing: !this.state.passwordEditing,
            })) : (
                this.setState({
                    passwordEditing: !this.state.passwordEditing,
                }));
    } else {
        // switch on edit mode
        this.setState({
            passwordEditing: !this.state.passwordEditing,
        });
    }
  }

  render() {
    const { organisations, userListed } = this.props;
    return (
        <tr className="AdminUserComponent">
            <td>
                {this.state.editing ? (
                    <input 
                        name="name" 
                        type="text"
                        className="formControl"
                        onChange={(e) => this.updateUserState('name', e)} 
                        value={this.state.user.name} />
                ) : (
                    <span>{this.state.user.name}</span> 
                )}
            </td>
            <td>
                {this.state.editing ? (
                <input 
                    name="email" 
                    type="text" 
                    className="formControl"
                    onChange={(e) => this.updateUserState('email', e)} 
                    value={this.state.user.email} />
                ) : (
                    <span>{this.state.user.email}</span> 
                )}
            </td>
            <td>
                {this.state.editing ? (
                    this.state.passwordEditing ? (
                        <div>
                            <input 
                                name="password" 
                                type="text" 
                                className="formControl"
                                onChange={(e) => this.updateUserState('password', e)} 
                                value={this.state.user.password}
                                placeholder="New password" />
                            <Button 
                                className="savePasswordButton"
                                onClick={this.switchPasswordEditing}>Save password</Button>
                        </div>
                    ) : 
                    <Button
                        className="switchPasswordButton"
                        onClick={this.switchPasswordEditing}>
                        Reset password</Button>
                ) : ''}
            </td>
            <td>
                {this.state.editing ? (
                    <input 
                        name="username" 
                        type="text" 
                        className="formControl"
                        onChange={(e) => this.updateUserState('username', e)} 
                        value={this.state.user.username} />
                ) : (
                    <span>{this.state.user.username}</span> 
                )}
            </td>
            <td>
                 {organisations.length > 0 ? 
                    <AdminSelectOrganisationComponent 
                    editing={this.state.editing}
                    organisations={organisations}
                    selectOrganisationCallback={this.selectOrganisationCallback}
                    selectedOrganisation={this.state.user.organisation}
                    user={this.props.userListed}
                /> 
                : 'No organisations.'}
            </td>
            <td>
                <AdminUserRoleSelector 
                    editing={this.state.editing}
                    user={this.props.userListed}
                    switchUserRolesCallback={this.switchUserRolesCallback}
                />
            </td>
            <td>
                {Roles.userIsInRole(userListed._id, ['admin'])
                    ? '' 
                    :
                    <DeleteUserButton 
                        userId={this.props.userListed._id}/>
                }
            </td>
            <td>
                {Roles.userIsInRole(userListed._id, ['admin'])
                    ? '' 
                    :
                    <InactivateUserButton 
                        userListed={this.props.userListed}/>
                }
            </td>
            <td>
                <Button
                    className="switchEditModeButton"
                    onClick={this.switchEditing}>
                    {this.state.editing ? 'Save' : 'Edit'}
                </Button>
            </td>
        </tr>
    );
  }
}

AdminUserComponent.defaultProps = {
  userListed : {},
};

AdminUserComponent.propTypes = {
  userListed: PropTypes.object.isRequired,
  organisations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AdminUserComponent;