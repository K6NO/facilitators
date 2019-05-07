import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import sendWelcomeEmail from '../../../api/Users/server/send-welcome-email';

Accounts.onCreateUser((options, user) => {
  const userToCreate = user;
  if(!user.organisation) {
    userToCreate.organisation = Meteor.settings.public.publicOrganization;
  }
  userToCreate.profile = options.profile;

  sendWelcomeEmail(options, user);
  return userToCreate;
});
