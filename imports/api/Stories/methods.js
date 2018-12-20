import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import Stories from './Stories';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'stories.insert': function storiesInsert(story) {
    check(story, {
      title: String,
      description: String,
      imageUrl: Match.Optional(String),
      side1Name: Match.Optional(String),
      side2Name: Match.Optional(String),
      point1Name: Match.Optional(String),
      point2Name: Match.Optional(String),
      point3Name: Match.Optional(String),
      playLength: Match.Optional(Number),
      storyAdvisor1: Match.Optional(String),
      storyAdvisor2: Match.Optional(String),
      randomEvents: Match.Optional(Number),
      public: Boolean,
    });

    try {
      const orgId = Meteor.user().organisation;
      // if the user has organisation and admin or editor, create new story
      if(orgId && Roles.userIsInRole(this.userId, ['admin', 'superadmin', 'editor'])) { 
        return Stories.insert({ 
          owner: this.userId, 
          organisationId: orgId, 
          ...story });
      } else {
        throw new Meteor.Error('New Story', 'Not authorised.');
      }
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'stories.update': function storiesUpdate(story) {
    check(story, {
      _id: String,
      title: Match.Optional(String),
      description: Match.Optional(String),
      organisationId: Match.Optional(String),
      imageUrl: Match.Optional(String),
      side1Name: Match.Optional(String),
      side2Name: Match.Optional(String),
      point1Name: Match.Optional(String),
      point2Name: Match.Optional(String),
      point3Name: Match.Optional(String),
      playLength: Match.Optional(Number),
      storyAdvisor1: Match.Optional(String),
      storyAdvisor2: Match.Optional(String),
      randomEvents: Match.Optional(Number),
      public: Boolean,
    });

    try {
      // TODO - consider throwing an error here if no conditions met
      const storyId = story._id;
      // user accessed when method runs on server side
      const orgId = Meteor.user().organisation;
      // admins, superadmins can edit other editor's content
      if(orgId && Roles.userIsInRole(this.userId, ['superadmin', 'admin'])) { 
        Stories.update(storyId, { $set: story });
        return storyId;
      } 
      if (orgId && Roles.userIsInRole(this.userId, ['editor'])
        && orgId === story.organisationId) {
          // editors only edit own organisation's content
          Stories.update(storyId, { $set: story });
          return storyId;
      } 
      throw new Meteor.Error('Update Story', 'Not authorised.');
      
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'stories.remove': function storiesRemove(story) {
    check(story, Object);
    try {
      // user accessed when method runs on server side
      const orgId = Meteor.user().organisation;
      // admins, superadmins can delete all. Editors can delete in own org
      if(orgId && Roles.userIsInRole(this.userId, ['superadmin', 'admin', 'editor'])) { 
        return Stories.remove(story._id);
      } 
      if (orgId 
        && Roles.userIsInRole(this.userId, ['editor'])
        && orgId === story.organisationId) {
          return Stories.remove(story._id);
      } 
      throw new Meteor.Error('Delete Story', 'Not authorised.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: [
    'stories.insert',
    'stories.update',
    'stories.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
