import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Stories = new Mongo.Collection('Stories');
const maxTextDescription = 380;
const maxTextLabel = 40;
const maxTextTitle = 50;

Stories.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
  });

Stories.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

Stories.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user who created this Story.',
    optional: true,
  },
  organisationId: {
    type: String,
    label: 'The ID of the organisation which created this Story.',
    optional: true,
  },
  public: {
    type: Boolean,
    label: 'Whether or not this is accessible without being logged in',
    optional: true,
  },
  createdAt: {
    type: String,
    label: 'The date this document was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this document was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  title: {
    type: String,
    label: 'The title of the Story.',
    max: maxTextTitle,
    optional: true,
  },
  description: {
    type: String,
    label: 'The description of the Story.',
    max: maxTextDescription,
    optional: true,
  },
  imageUrl: {
    type: String,
    label: 'The URL of the Story cover image.',
    optional: true,
  },
  side1Name: {
    type: String,
    label: 'The name of the first side.',
    max: maxTextLabel,
    optional: true,
  },
  side2Name: {
    type: String,
    label: 'The name of the second side.',
    max: maxTextLabel,
    optional: true,
  },
  point1Name: {
    type: String,
    label: 'The name (category) of the first point.',
    max: maxTextLabel,
    optional: true,
  },
  point2Name: {
    type: String,
    label: 'The name (category) of the second point',
    max: maxTextLabel,
    optional: true,
  },
  point3Name: {
    type: String,
    label: 'The name (category) of the third point',
    max: maxTextLabel,
    optional: true,
  },
  playLength : {
    type: Number,
    label: 'How many decisions lead to the end of the game?',
    optional: true,
  },
  storyAdvisor1: {
    type: String,
    label: 'The name type of the first advisor featured in the story.',
    max: maxTextLabel,
    optional: true,
  },
  storyAdvisor2: {
    type: String,
    label: 'The name type of the second advisor featured in the story.',
    max: maxTextLabel,
    optional: true,
  },
  randomEvents: {
    type: Number,
    label: 'How many random events are in the story?',
    optional: true,
  },

});

Stories.attachSchema(Stories.schema);
export default Stories;
