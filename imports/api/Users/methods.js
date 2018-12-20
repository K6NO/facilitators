import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'users.setEmails': function usersSetEmails(_id, address) {
    check(_id, String);
    check(address, String);

    try {
      Meteor.users.update(_id, {
        $set: {
          emails: [{address, verified: false}]
        },
      });
    } catch (exception) {
      handleMethodException(exception);
    }
  }
});

rateLimit({
  methods: [
      'users.setEmails',
  ],
  limit: 15,
  timeRange: 1000,
});
