import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import sendWelcomeEmail from '../../../api/Users/server/send-welcome-email';

Accounts.onCreateUser((options, user) => {
  
  // when the user signs up check if he is in a game 
  if (options.profile && options.profile.activeGame 
      && Object.keys(options.profile.activeGame).length) {
      // save the active game
        Meteor.call(
        'activeGames.saveLocalGameOnSignup',
        options.profile.activeGame,
        user._id,
        (error, activeGameId) => {
          if (error) {
            console.error(error);
          } else {
            console.log('Local active game saved server side.');
          }
      }
    );
  }

  // 
  const userToCreate = user;
  if (options.profile) {
    delete options.profile.activeGame;
    userToCreate.profile = options.profile;
  }
  sendWelcomeEmail(options, user);

  //temporarly remove adding roles for new user, implement Roles package on Signup
  // if(!options.roles.length) {
  //   userToCreate.roles = ['user']; // Set default roles for new sign ups.
  // }
  
  return userToCreate;
});
