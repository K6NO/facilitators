import { Accounts } from 'meteor/accounts-base';
import sendWelcomeEmail from '../../../api/Users/server/send-welcome-email';

Accounts.onCreateUser((options, user) => {
  const userToCreate = user;
  if(!user.organisation) {
    const publicOrganizationId = 'pu8XgZJa7gScmzFBb';
    userToCreate.organisation = publicOrganizationId;
  }
  userToCreate.profile = options.profile;

  sendWelcomeEmail(options, user);
  return userToCreate;
});
