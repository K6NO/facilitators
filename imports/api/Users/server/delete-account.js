/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';

let action;

const deleteUser = (userId) => {
  try {
    return Meteor.users.remove(userId);
  } catch (exception) {
    throw new Error(`[deleteAccount.deleteUser] ${exception.message}`);
  }
};


const deleteAccount = ({ userId }, promise) => {
  try {
    action = promise;
    deleteUser(userId);
    action.resolve();
  } catch (exception) {
    action.reject(exception.message);
  }
};

export default options => {
  return new Promise((resolve, reject) =>
    deleteAccount(options, { resolve, reject }))};
