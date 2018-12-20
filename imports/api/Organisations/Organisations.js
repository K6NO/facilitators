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
    label: 'Whether or not the organisation can access the editor.',
    optional: true,
  },
  name: {
    type: String,
    label: 'The name of the Organisation.',
  },
    billingAddress: {
    type: String,
    label: 'The billing address of the Organisation.',
    optional: true,
  },
  billingCity: {
    type: String,
    label: 'The billing city of the Organisation.',
    optional: true,
  },
  billingPostalCode: {
    type: String,
    label: 'The billing postal code of the Organisation.',
    optional: true,
  },
  billingCountry: {
    type: String,
    label: 'The billing country of the Organisation.',
    optional: true,
  },
});

Organisations.attachSchema(Organisations.schema);
export default Organisations;
