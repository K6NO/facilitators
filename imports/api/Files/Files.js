import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Files = new Mongo.Collection('Files');

Files.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Files.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Files.schema = new SimpleSchema({
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
  owner: {
    type: String,
    label: 'The ID of the user who uploaded this File.',
    optional: true,
  },
  organisationId: {
    type: String,
    label: 'The ID of the users organisation who uploaded this File.',
    optional: true,
  },
  public: {
    type: Boolean,
    label: 'Whether or not this is accessible without being logged in',
    optional: true,
  },
  mobile: {
    type: Boolean,
    label: 'Whether picture is of mobile size.',
    optional: true,
  },
  desktop: {
    type: Boolean,
    label: 'Whether picture is of desktop size.',
    optional: true,
  },
  originalName: {
    type: String,
    label: 'The original name of an uploaded file.',
    optional: true,
  },
  url: {
    type: String,
    label: 'The URL of the original image size at S3',
  },
  urlMobile: {
    type: String,
    label: 'The URL of the mobile image size at S3',
    optional: true,
  },
  urlDesktop: {
    type: String,
    label: 'The URL of the desktop image size at S3',
    optional: true,
  },
  tags: {
    type: Array,
  },
  'tags.$': {
    type: String,
  },
  accessibleTo: {
    type: Array,
  },
  'accessibleTo.$': {
    type: String,
  },
});

Files.attachSchema(Files.schema);

export default Files;

