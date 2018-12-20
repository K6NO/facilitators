import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.publish(null, function usersProfile() {
  if (! this.userId) {
    return null;
  }

  // TODO - check if publishing services is necessary and NOT A SECURITY HOLE
  return Meteor.users.find(this.userId, {
      fields: {
        emails: 1,
        profile: 1,
        services: 1,
      },
    });
});

Meteor.publish('users.all', function usersAll() {
  if(Roles.userIsInRole(this.userId, ['super-admin', 'admin'])){
    return Meteor.users.find({}, {
      fields: {
        emails: 1,
        profile: 1,
        services: 1,
        organisation: 1,
        roles: 1,
      },
    });
  }
});
