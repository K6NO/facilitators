import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Row, Col, Alert, FormGroup, Label, Button } from 'reactstrap';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        newPassword: {
          required: true,
          minlength: 6,
        },
        repeatNewPassword: {
          required: true,
          minlength: 6,
          equalTo: '[name="newPassword"]',
        },
      },
      messages: {
        newPassword: {
          required: 'Enter a new password, please.',
          minlength: 'Use at least six characters, please.',
        },
        repeatNewPassword: {
          required: 'Repeat your new password, please.',
          equalTo: 'Hmm, your passwords don\'t match. Try again?',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    const { match, history } = this.props;
    const { token } = match.params;

    Accounts.resetPassword(token, form.newPassword.value, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        history.push('/');
      }
    });
  }

  render() {
    return (
      <div className="ResetPassword">
        <Row>
          <Col xs={12} sm={6} md={4}>
            <h4 className="page-header">Reset Password</h4>
            <Alert color="info">
              To reset your password, enter a new one below. You will be logged in
  with your new password.
            </Alert>
            <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
              <FormGroup>
                <Label>New Password</Label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  placeholder="New Password"
                />
              </FormGroup>
              <FormGroup>
                <Label>Repeat New Password</Label>
                <input
                  type="password"
                  className="form-control"
                  name="repeatNewPassword"
                  placeholder="Repeat New Password"
                />
              </FormGroup>
              <Button type="submit" color="success">Reset Password &amp; Login</Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default ResetPassword;
