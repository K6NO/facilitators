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
    },
    github: {
      requestPermissions: ['user:email'],
      loginStyle: 'popup',
    },
    google: {
      requestPermissions: ['email', 'profile'],
      requestOfflineToken: true,
      loginStyle: 'popup',
    },
    twitter: {
      loginStyle: 'popup',
    },
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
  facebook: <span><img src="/img/ui/icon_facebook.svg" alt="facebook-icon" /></span>,
  twitter: <span><img src="/img/ui/icon_twitter_white.svg" alt="twitter-icon" /></span>,
  google: <span><img src="/img/ui/icon_google2.svg" alt="twitter-icon" /></span>,
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
