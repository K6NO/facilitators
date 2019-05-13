import React from 'react';
import { Row, Col, FormGroup, Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import styled from 'styled-components';
import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';
import InputHint from '../../components/InputHint/InputHint';
import validate from '../../../modules/validate';
import './SignupComponent.scss';
import { StyledImage } from './StyledComponents'

const StyledCheckboxLabel = styled.span`
      white-space: normal;
      padding-left: 1.5rem;
      text-align: left;
`;

class SignupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      username: '',
      firstName: '',
      lastName: '',
    }
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        username: {
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
        username: {
          required: 'Choose a username!',
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
      }
    };
    if(form.privacy.checked) {

      Meteor.call('users.signup', newUser, (error, userId) => {
        if(error) {
          Bert. alert(error.reason, 'danger');
        } else {
          Bert.alert('Welcome to Ecofacilitators!', 'success');
          
          // login the newly signed up user (server-side createUser does not auto signin)
          Meteor.loginWithPassword(newUser.email, newUser.password, (error) => {
            if (error) {
              Bert.alert(error.reason, 'danger');
            } else {
              if(form.newsletter.checked) {
                console.log('Add to Mailchimp list');
                // TODO set up mailchimp connection here
                this.setState({emailAddress: '', username: ''});
              }
              // Meteor.call('users.sendVerificationEmail', userId);
            }
          });
        }
      });
  
    } else {
      Bert. alert('To Sign Up, please accept the Privacy Policy ', 'warning');
    }
    
  }

  render() {
    return (
      <div className="SignupComponent">
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={12}>
                <OAuthLoginButtons
                  services={['facebook']}
                  emailMessage={{
                    offset: 97,
                    text: 'Sign Up With Email',
                  }}
                />
              </Col>
            </Row>
            {/* Mailchimp submit field in form action. U and I values from mailchimp subscribe link */}
            <form 
              ref={form => (this.form = form)}
              onSubmit={(event) => event.preventDefault() }
              action="https://cool.us16.list-manage.com/subscribe/post"
              method="POST"
              >
                <input type="hidden" name="u" value="####"/>
                <input type="hidden" name="id" value="####"/>
              <FormGroup>
                <input
                  type="email"
                  name="emailAddress"
                  value={this.state.emailAddress}
                  onChange={(e) => this.setState({
                    emailAddress: e.target.value,
                  })}
                  className="form-control"
                  placeholder="Your Email Address"
                />
              </FormGroup>
              <FormGroup>
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={(e) => this.setState({username: e.target.value,
                  firstName: e.target.value, lastName: e.target.value})}
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
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <Input addon
                        type="checkbox"
                        name="privacy"
                        aria-label="Checkbox for accepting the privacy policy." />
                        <StyledCheckboxLabel>
                          {`I read the`}<a href="/privacy">{` Privacy Policy `}</a>{` and authorize the use of my personal data.`}
                        </StyledCheckboxLabel>
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <FormGroup>
              <InputGroup>
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <Input addon
                        type="checkbox"
                        name="newsletter"
                        aria-label="Checkbox for newsletter signup" />
                        <StyledCheckboxLabel >
                          I'd like to receive occasional and useful information on eco-facilitation
                        </StyledCheckboxLabel>
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <Button type="submit" className="SubmitButton">Sign Up</Button>

              {/* Mailchimp no-robot verification  */}
                <div style={{position: 'absolute', left: '-5000px'}} aria-hidden='true' aria-label="Please leave the following three fields empty">
                  <label htmlFor="b_name">Name: </label>
                  <input type="text" name="b_name" tabIndex="-1" value="" placeholder="Freddie" id="b_name"/>

                  <label htmlFor="b_email">Email: </label>
                  <input type="email" name="b_email" tabIndex="-1" value="" placeholder="youremail@gmail.com" id="b_email"/>

                  <label htmlFor="b_comment">Comment: </label>
                  <textarea name="b_comment" tabIndex="-1" placeholder="Please comment" id="b_comment"></textarea>
                </div>
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
