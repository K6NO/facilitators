import React from 'react';
import { Row, Col, FormGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';
import * as eventAnalytics from '../../components/Analytics/analyticsUtil';
import validate from '../../../modules/validate';

import './LoginComponent.scss';

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        emailAddress: {
          required: true,
          email: true,
        },
        password: {
          required: true,
        },
      },
      messages: {
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
        password: {
          required: 'Need a password here.',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit = (form) => {
    Meteor.loginWithPassword(form.emailAddress.value, form.password.value, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Welcome back!', 'success');
      }
    });
    // register login attempt in GA
    eventAnalytics.registerEvent('Users', 'Login', 'Email Login');
  }

  render() {
    return (
      <div className="LoginComponent">
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={12}>
                <OAuthLoginButtons
                  services={['facebook', 'twitter', 'google']}
                  emailMessage={{
                    text: 'Email Login',
                  }}
                />
              </Col>
            </Row>
            <form ref={form => (this.form = form)}>
              <FormGroup>
                <input
                  type="email"
                  name="emailAddress"
                  placeholder="Enter your email"
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="form-control"
                />
              </FormGroup>
              <Link className="pull-right ForgotPassword" to="/recover-password">Forgot password?</Link>
              <Button className="SubmitButton" type="submit">Log In</Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LoginComponent;
