import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';



/*  Implement on login hook if necessary. Used to save / update data

  */
Accounts.onLogin(() => {
  console.log('on login hook');
});
