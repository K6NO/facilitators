import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import FileSaver from 'file-saver';
import base64ToBlob from 'b64-to-blob';
import { Row, Col, Button, FormGroup, Label } from 'reactstrap';
import _ from 'lodash';
import { Bert } from 'meteor/themeteorchef:bert';
import InputHint from '../../components/InputHint/InputHint';
import validate from '../../../modules/validate';

import './UserProfileComponent.scss';

class UserProfileComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        profileUrl : '',
      };
    }
  
    componentDidMount() {
      const component = this;
      const { user } = this.props;
      this.setState({profileUrl: user.profile.imageUrl})
  
      validate(component.form, {
        rules: {
          firstName: {
            required: true,
          },
          lastName: {
            required: true,
          },
          emailAddress: {
            required: true,
            email: true,
          },
          username: {
              required: true,
          },
          currentPassword: {
            required() {
              // Only required if newPassword field has a value.
              return component.form.newPassword.value.length > 0;
            },
          },
          newPassword: {
            required() {
              // Only required if currentPassword field has a value.
              return component.form.currentPassword.value.length > 0;
            },
          },
        },
        messages: {
          firstName: {
            required: 'What\'s your first name?',
          },
          lastName: {
            required: 'What\'s your last name?',
          },
          username: {
            required: 'You need to have a username.',
          },
          emailAddress: {
            required: 'Need an email address here.',
            email: 'Is this email address correct?',
          },
          currentPassword: {
            required: 'Need your current password if changing.',
          },
          newPassword: {
            required: 'Need your new password if changing.',
          },
        },
        submitHandler() { component.handleSubmit(component.form); },
      });
    }

    handleChange = (event) => {
      this.setState({profileUrl: event.target.value});
    };

    handleImageSelection = (url) => {
      this.setState({profileUrl: url});
    };

    handleProfileImageDelete = (url) => {
      if(confirm('Delete profile image?')){
        this.setState({profileUrl: ''});
        let originalUrl = url.replace('mobile', 'original');
        Meteor.call('images.removeByUrl', originalUrl);
        // Delete image from AWS if it was there
        if (url.indexOf('amazonaws')) { 
          // delete mobile size profile picture
          Meteor.call('aws.deleteFileFromAmazon', url, (err) => {
            if(err) {
              Bert.alert(err.reason, 'danger');  
            } else {
              Bert.alert('Mobile size removed', 'success');
            }
          });
          //delete original size profile picture
          Meteor.call('aws.deleteFileFromAmazon', originalUrl, (err) => {
            if(err) {
              Bert.alert(err.reason, 'danger');  
            } else {
              Bert.alert('Original size removed', 'success');
            }
          });
        }
      }
    }
  
    getUserType = (user) => {
      const userToCheck = user;
      delete userToCheck.services.resume;
      const service = Object.keys(userToCheck.services)[0];
      return service === 'password' ? 'password' : 'oauth';
    }
  
    handleExportData = (event) => {
      event.preventDefault();
      Meteor.call('users.exportData', (error, exportData) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          FileSaver.saveAs(base64ToBlob(exportData), `${Meteor.userId()}.zip`);
        }
      });
    }
  
    handleDeleteAccount = () => {
      if (confirm('Are you sure? This will permanently delete your account and all of its data.')) {
        Meteor.call('users.deleteAccount', (error) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('Account deleted!', 'success');
          }
        });
      }
    }
  
    handleSubmit = (form) => {
      const profile = {
        emailAddress: form.emailAddress.value,
        profile: {
          name: {
            first: form.firstName.value,
            last: form.lastName.value,
          },
          username: form.username.value,
          imageUrl: this.state.profileUrl,
        },
      };
  
      Meteor.call('users.editProfile', profile, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Profile updated!', 'success');
        }
      });
  
      if (form.newPassword.value) {
        Accounts.changePassword(form.currentPassword.value, form.newPassword.value, (error) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            form.currentPassword.value = '';
            form.newPassword.value = '';
          }
        });
      }
    }

    renderOAuthUser = (loading, user) => {
      return !loading ? (
        <div className="OAuthProfile">
          {Object.keys(user.services).map(service => (
            <div key={service} className={`LoggedInWith ${service}`}>
              <img src={`/${service}.svg`} alt={service} />
              <p>{`You're logged in with ${_.capitalize(service)} using the email address ${user.services[service].email}.`}</p>
              <Button
                className={`btn btn-${service}`}
                href={{
                  facebook: 'https://www.facebook.com/settings',
                  google: 'https://myaccount.google.com/privacy#personalinfo',
                  github: 'https://github.com/settings/profile',
                }[service]}
                target="_blank"
              >
                Edit Profile on {_.capitalize(service)}
              </Button>
            </div>
          ))}
        </div>) : <div />;
    }
  
    renderPasswordUser = (loading, user) => {
      return !loading ? (
        <Row>
        <Col xs="12" md={{size: 6, offset: 3}} lg={{size: 4, offset:4}} className="UserProfileComponent">
          <h4 className="page-header">Profile Data</h4>
          <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
            <div>
              <Row>
                <Col xs="6">
                  <FormGroup>
                    {this.state.profileUrl 
                      ? (
                        <div className="imageContainer">
                          <img src={this.state.profileUrl} className="img-responsive" />
                          <Button
                            onClick={(e)=> this.handleProfileImageDelete(user.profile.imageUrl)}
                            color="danger"
                            > X </Button>
                        </div>
                          )
                      : <Label>Profile Image</Label>}
                  <input
                    type="url"
                    name="imageUrl"
                    type="hidden"
                    value={this.state.profileUrl}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                </FormGroup>
                </Col>
                <Col xs="6">
                  <Col xs="12">
                    <FormGroup>
                      <Label>First Name</Label>
                      <input
                        type="text"
                        name="firstName"
                        defaultValue={user.profile.name.first}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" >
                    <FormGroup>
                      <Label>Last Name</Label>
                      <input
                        type="text"
                        name="lastName"
                        defaultValue={user.profile.name.last}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col> 
                </Col>
              </Row>
              <FormGroup>
                <Label>Email Address</Label>
                <input
                  type="email"
                  name="emailAddress"
                  defaultValue={user.emails[0].address}
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <Label>Username</Label>
                <input
                  type="text"
                  name="username"
                  defaultValue={user.profile.username}
                  className="form-control"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Current Password</Label>
                <input
                  type="password"
                  name="currentPassword"
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <Label>New Password</Label>
                <input
                  type="password"
                  name="newPassword"
                  className="form-control"
                />
                <InputHint>Use at least six characters.</InputHint>
              </FormGroup>
              <Button 
                className="submitButton" 
                type="submit"
                color="success"
                >Save Profile</Button>
            </div>
          </form>
          </Col>
        </Row>
      ) : <div />;
    }

    render() {
        const { loading, user } = this.props;
      
        return !loading ? ({
          password: this.renderPasswordUser,
          oauth: this.renderOAuthUser,
        }[this.getUserType(user)])(loading, user) : <div />;
    }
}

UserProfileComponent.defaultProps = {
  user: {},
};

UserProfileComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserProfileComponent;