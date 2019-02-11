import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Organisations from './Organisations';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'organisations.insert': function organisationsInsert(organisation) {
    check(organisation, {
      name: String,
      active: Boolean,
      country: String,
    });

    try {
      if(Roles.userIsInRole(this.userId, ['admin'])) {
        return Organisations.insert({ owner: this.userId, ...organisation });
      } else {
        throw new Meteor.Error('Create Organisation', 'Not authorised.');
      }
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'organisations.update': function organisationsUpdate(organisation) {
    check(organisation, {
      _id: String,
      name: String,
      active: Boolean,
      country: String,
    });

    try {
      if(Roles.userIsInRole(this.userId, ['admin'])) {
        const organisationId = organisation._id;
        Organisations.update(organisationId, { $set: organisation });
        return organisationId;
      } else {
        throw new Meteor.Error('Update Organisation', 'Not authorised.');
      }
    } catch (exception) {
      handleMethodException(exception);
    }
  },

  'organisations.remove': function organisationsRemove(organisationId) {
    check(organisationId, String);

    try {
      if(Roles.userIsInRole(this.userId, ['admin'])) {
        return Organisations.remove(organisationId);
      } else {
        throw new Meteor.Error('Remove Organisation', 'Not authorised.');
      }

    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: [
    'organisations.insert',
    'organisations.update',
    'organisations.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
