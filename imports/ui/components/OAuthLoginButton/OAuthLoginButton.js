/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import * as eventAnalytics from '../../components/Analytics/analyticsUtil';
import './OAuthLoginButton.scss';

const handleLogin = (service, callback) => {
  const options = {
    facebook: {
      requestPermissions: ['email'],
      loginStyle: 'popup',
    }
  }[service];

  // log Oauth login to Google Analytics
  eventAnalytics.registerEvent('Users', 'Login', 'With ' + service);

  return {
    facebook: Meteor.loginWithFacebook,
    twitter: Meteor.loginWithTwitter,
    google: Meteor.loginWithGoogle,
  }[service](options, callback);
};

const serviceLabel = {
  facebook: <span>Sign in with <img src="/img/ui/icon_facebook.svg" alt="facebook-icon" /></span>,
};

const OAuthLoginButton = ({ service, callback }) => (
  <button
    className={`OAuthLoginButton OAuthLoginButton-${service}`}
    type="button"
    onClick={() => handleLogin(service, callback)}
  >
    {serviceLabel[service]}
  </button>
);

OAuthLoginButton.defaultProps = {
  callback: (error) => {
    if (error) Bert.alert(error.message, 'danger');
  },
};

OAuthLoginButton.propTypes = {
  service: PropTypes.string.isRequired,
  callback: PropTypes.func,
};

export default OAuthLoginButton;
