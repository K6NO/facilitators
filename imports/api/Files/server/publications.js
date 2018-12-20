import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import Files from '../Files';
import Images from '../Images';

Meteor.publish('files.all', () => {
  return Files.find();
});
/** EDITOR 
 * - Superadmin, Admin - return all images
 * - Editor - return public images or by organisation
 */
Meteor.publish('images.all', ()=> {
  const userId = Meteor.userId();

  if(userId) {
    const orgId = Meteor.user().organisation;
    if(orgId 
        && Roles.userIsInRole(userId, ['superadmin', 'admin'])) {
          return Images.find();
    }
    if(orgId 
      && Roles.userIsInRole(userId, ['editor'])) {
        return Images.find({
          $or: [
            { organisationId: orgId },
            { public: true },
          ]});
    }
    this.stop();
    return;
  }
});

Meteor.publish('images.allMobile', ()=> {
  const userId = Meteor.userId();
  if(userId) {
    const orgId = Meteor.user().organisation;
    if(orgId 
        && Roles.userIsInRole(userId, ['superadmin', 'admin'])) {
          return Images.find({mobile: true});
    }
    if(orgId 
      && Roles.userIsInRole(userId, ['editor'])) {
        return Images.find({
          mobile: true,
          $or: [
            { organisationId: orgId },
            { public: true },
          ]});
    }
    this.stop();
    return;
  }
  
});

Meteor.publish('images.advisors', ()=> {
  return Images.find({tags: "icons"});
});

Meteor.publish('images.filterByTag', (imageFilter) => {
  check(imageFilter, String);

  const userId = Meteor.userId();
  if(userId) {
    const orgId = Meteor.user().organisation;
    if(orgId 
        && Roles.userIsInRole(userId, ['superadmin', 'admin'])) {
          return Images.find({
            tags: {$regex : imageFilter},
            mobile: true,
          });
    }
    if(orgId 
      && Roles.userIsInRole(userId, ['editor'])) {
        return Images.find({
          tags: {$regex : imageFilter},
          mobile: true,
          $or: [
            { organisationId: orgId },
            { public: true },
          ]
        });
    }
    this.stop();
    return;
  }
});
