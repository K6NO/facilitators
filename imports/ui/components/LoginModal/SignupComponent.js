import React from 'react';
import { Row, Col, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';
import InputHint from '../../components/InputHint/InputHint';
import validate from '../../../modules/validate';
import * as eventAnalytics from '../../components/Analytics/analyticsUtil';
import './SignupComponent.scss';

class SignupComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const component = this;

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
        password: {
          required: true,
          minlength: 6,
        },
      },
      messages: {
        firstName: {
          required: 'What\'s your first name?',
        },
        lastName: {
          required: 'What\'s your last name?',
        },
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
        password: {
          required: 'Need a password here.',
          minlength: 'Please use at least six characters.',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit = (form) => {
    const { history } = this.props;

    // get the _id game running in local repo from the path
    const path = window.location.pathname.replace('/', '');
    
    // register login attempt in GA
    eventAnalytics.registerEvent('Users', 'Register', 'Email Register'); 
    
    // sign up user
    const newUser = {
      email: form.emailAddress.value,
      password: form.password.value,
      profile: {
        name: {
          first: '',
          last: '',
        },
        username: form.username.value,
      },
    };
    Meteor.call('users.signup', newUser, (error, userId) => {
      if(error) {
        Bert. alert(error.reason, 'danger');
      } else {
        Bert.alert('Welcome to NewsGamer!', 'success');
        
        // login the newly signed up user (server-side createUser does not auto signin)
        Meteor.loginWithPassword(newUser.email, newUser.password, (error) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            // Meteor.call('users.sendVerificationEmail', userId);
          }
        });
      }
    });
  }

  render() {
    return (
      <div className="SignupComponent">
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={12}>
                <OAuthLoginButtons
                  services={['facebook', 'twitter', 'google']}
                  emailMessage={{
                    offset: 97,
                    text: 'Sign Up With Email',
                  }}
                />
              </Col>
            </Row>
            <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
              <FormGroup>
                <input
                  type="email"
                  name="emailAddress"
                  className="form-control"
                  placeholder="Your Email Address"
                />
              </FormGroup>
              <FormGroup>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Choose a Username"
                />
              </FormGroup>
              <FormGroup>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Choose a Password"
                />
                <InputHint>Use at least six characters.</InputHint>
              </FormGroup>
              <Button type="submit" className="SubmitButton">Sign Up</Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

SignupComponent.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SignupComponent;
