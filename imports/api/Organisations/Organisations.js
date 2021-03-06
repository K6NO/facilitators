import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Organisations = new Mongo.Collection('Organisations');

Organisations.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
  });

Organisations.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

Organisations.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user who created this Story.',
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
  active: {
    type: Boolean,
    label: 'Active organisations can access the editor. Inactives cannot.',
  },
  name: {
    type: String,
    label: 'You need to set the name of the Organisation.',
  },
  country: {
    type: String,
    label: 'You need to set the country of the Organisation.',
  },
});

Organisations.attachSchema(Organisations.schema);
export default Organisations;
