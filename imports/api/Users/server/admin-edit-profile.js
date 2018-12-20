/* eslint-disable consistent-return */

import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

let action;

const arraysEqual = (arr1, arr2) => {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

const updateUser = (userId, { email, organisation, profile }, roles) => {
  try {
    const currentProfile = Meteor.users.findOne({ _id: userId });
    const currentEmail = _.get(currentProfile, 'emails.0.address', '');
    const currentRoles = _.get(currentProfile, 'roles', '');
    
    // if email changed, update on server
    if (currentEmail.toLowerCase() !== email.toLowerCase()) {
      Accounts.addEmail(userId, email);
      Accounts.removeEmail(userId, currentEmail);
    }

    // if roles of the user changed, update on server
    if(!arraysEqual(currentRoles, roles)) {
        Roles.setUserRoles(userId, roles);
    }

    // update profile on server
    Meteor.users.update(userId, {
      $set: {
        profile,
        organisation,
      },
    });
  } catch (exception) {
    throw new Error(`[editProfile.updateUser] ${exception.message}`);
  }
};

const adminEditProfile = ({ userId, profile, roles }, promise) => {
  try {
    action = promise;
    updateUser(userId, profile, roles);
    action.resolve();
  } catch (exception) {
    action.reject(exception.message);
  }
};

export default options =>
  new Promise((resolve, reject) =>
    adminEditProfile(options, { resolve, reject }));
