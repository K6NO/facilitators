import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';
import Stories from '../Stories';

// AUTHORIZED SUBS - Editor

Meteor.publish('stories', function stories() {
  if(this.userId) {
    // for superadmins and admins return all stories
    if(Roles.userIsInRole(this.userId, ['super-admin', 'admin'])){
      return Stories.find();
    } else if (Roles.userIsInRole(this.userId, ['editor'])) {
      // for editors return stories limited by organisation
      const orgId = Meteor.user().organisation;
      return Stories.find({organisationId: orgId});;
    }
  } else {
      this.stop();
      console.error('Non authorised user requested admin/editor data. Stories');
      throw new Meteor.Error('Pub View Stories', 'Not authorised.');
    }
});

// single story returned to the editor
Meteor.publish('stories.view', function storiesView(storyId) {
  check(storyId, String);
  if(this.userId) {
    if (Roles.userIsInRole(this.userId, ['superadmin', 'admin'])) {
      // for superadmins and admins return all stories
      return Stories.find({ _id: storyId });
    } else if (Roles.userIsInRole(this.userId, ['editor'])) {
      const orgId = Meteor.user().organisation;
      // for editors return story limited by organisation
      return Stories.find({ _id: storyId, organisationId: orgId });
    }
  } else {
    this.stop();
    console.error('Non authorised user requested admin/editor data. Stories.view');
    throw new Meteor.Error('Pub View Single Story', 'Not authorised.');
  }
  
});

// NON-AUTHORIZED SUBS - Gameplay

// only public stories for LandingPage
Meteor.publish('stories.public', function storiesPublic() {
  return Stories.find({ public: true });
});

// single public story returned for StoryStarterView
Meteor.publish('stories.publicView', function storiesStarterView(storyId) {
  check(storyId, String);
  return Stories.find({ _id: storyId, public: true });
});
