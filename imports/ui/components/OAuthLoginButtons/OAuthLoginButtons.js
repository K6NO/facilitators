import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import OAuthLoginButton from '../OAuthLoginButton/OAuthLoginButton';

import './OAuthLoginButtons.scss';

const callback = (error) => {
  if (error) {
    Bert.alert(error, 'error');
    return;
  }

  const userId = Meteor.userId();
  const user = Meteor.user();
  
  // if Oauth is Twitter we don't have an email
  if (! user.services.facebook || ! user.services.google) {
    return;
  }

  // In case of FB and Google we retrieve service email
  let serviceEmail;
  if(user.services.facebook) {
    serviceEmail = user.services.facebook.email;
  } else if (user.services.google){
    serviceEmail = user.services.google.email
  }

  // the same user has created an account before with
  // the email registered at the service provider
  const loggedInUserHasEmail = user.emails && user.emails.find(email => email.address === serviceEmail);
  if (loggedInUserHasEmail) {
    return;
  }

  // the same email has been used to create another existing account
  const existingUserHasEmail = Meteor.users.findOne({'emails.address': serviceEmail});
  if (existingUserHasEmail) {
    Bert.alert('An account exists with that email, you can merge them from your profile page', 'warning');
    return;
  }

  // it is a new email address, we set it to the profile 
  // created from the oauth login
  Meteor.call('users.setEmails', userId, serviceEmail, (error) => {
    if (error) {
      Bert.alert(error, 'error');
    }
  });
}

const OAuthLoginButtons = ({ services, emailMessage }) => (services.length ? (
  <div className={`OAuthLoginButtons ${emailMessage ? 'WithEmailMessage' : ''}`}>
    {services.map(service => <OAuthLoginButton 
      key={service} 
      service={service} 
      callback={callback} />)}
    {emailMessage ?
      <p className="EmailMessage">
        {emailMessage.text}
      </p> : ''}
  </div>
) : <div />);

OAuthLoginButtons.propTypes = {
  services: PropTypes.array.isRequired,
  emailMessage: PropTypes.object.isRequired,
};

const verificationComplete = new ReactiveVar(false);
const verifiedServices = new ReactiveVar([]);

export default withTracker(({ services }) => {
  if (!verificationComplete.get()) {
    Meteor.call('oauth.verifyConfiguration', services, (error, response) => {
      if (error) {
        console.warn(error);
      } else {
        verifiedServices.set(response);
        verificationComplete.set(true);
      }
    });
  }

  return {
    services: verifiedServices.get(),
  };
})(OAuthLoginButtons);
