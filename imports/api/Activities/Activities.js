import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// Sometimes you have one large SimpleSchema object, and you need just a subset of it for some purpose.

// To pull out certain schema keys into a new schema, you can use the pick method:

// import SimpleSchema from 'simpl-schema';

// const schema = new SimpleSchema({
//   firstName: String,
//   lastName: String,
//   username: String,
// });

// const nameSchema = schema.pick('firstName', 'lastName');

// To pull a subschema out of an Object key in a larger schema, you can use getObjectSchema:

// import SimpleSchema from 'simpl-schema';

// const schema = new SimpleSchema({
//   firstName: String,
//   lastName: String,
//   address: Object,
//   'address.street1': String,
//   'address.street2': { type: String, optional: true },
//   'address.city': String,
//   'address.state': String,
//   'address.postalCode': String,
// });

// const addressSchema = schema.getObjectSchema('address');

// addressSchema is now the same as this:
// new SimpleSchema({
//   street1: String,
//   street2: { type: String, optional: true },
//   city: String,
//   state: String,
//   postalCode: String,
// });

const commentSchema = new SimpleSchema({
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
    userId : {
        type: String,
        type: SimpleSchema.RegEx.Id,
        label: 'Commenter UserId.',
    },
    username: {
        type: String,
        max: 120,
        label: "Username. Max. 120 chars."
    },
    message: {
        type: String,
        max: 600,
        label: "Username. Max. 600 chars."
    },
    authorized: Boolean,
})
const attributeSchema = new SimpleSchema({
    title: {
        type: String,
        max: 200,
        label: "Username. Max. 200 chars."
    },
    description:    {
        type: String,
        max: 1200,
        label: "Activity description. Max. 1200 chars."
    },
    category:  {
        type: String,
        max: 20,
        label: "Activity category. Max. 20 chars."
    },
    age: {
        type: String,
        max: 20,
        label: "Activity age group. Max. 20 chars."
    },
    time: {
        type: String,
        max: 20,
        label: "Activity time. Max. 20 chars."
    },
    participants: {
        type: String,
        max: 20,
        label: "Activity nr of participants. Max. 20 chars."
    },
    preparation: {
        type: String,
        max: 400,
        label: "Activity prep. Max. 400 chars.",
        optional: true,
    },
    objectives: {
        type: String,
        max: 400,
        label: "Activity objectives. Max. 400 chars.",
        optional: true,
    },
    tools: {
        type: String,
        max: 400,
        label: "Activity tools. Max. 400 chars.",
        optional: true,
    },
    resources: {
        type: String,
        max: 400,
        label: "Activity tools. Max. 400 chars.",
        optional: true,
    },
  });

const Activities = new Mongo.Collection('Activities');

Activities.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Activities.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Activities.schema = new SimpleSchema({
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
    label: 'The ID of the user who uploaded this Activity.',
    optional: true,
  },
  organisationId: {
    type: String,
    label: 'The ID of the users organisation who uploaded this Activity.',
    optional: true,
  },
  public: {
    type: Boolean,
    label: 'Whether or not this is accessible without being logged in',
    optional: true,
  },
  en: { 
    type: attributeSchema,
    label: "Activity EN fields.",
    optional: true,
    },
  es : { 
    type: attributeSchema,
    label: "Activity ES fields.",
    optional: true,
    },
  hu : { 
    type: attributeSchema,
    label: "Activity HU fields.",
    optional: true,
    },
  ro : { 
    type: attributeSchema,
    label: "Activity RO fields.",
    optional: true,
    },
  sk : { 
    type: attributeSchema,
    label: "Activity SK fields.",
    optional: true,
    },
  images: { 
    type: Array,
    label: "Images",
    },
    'images.$' : {
        type: String,
    },
  comments: {
      type: Array,
  },
  'comments.$' : {
      type: commentSchema,
      label: 'CommentSchema'
  },
  tags: {
    type: Array,
  },
  'tags.$': {
    type: String,
  },
});

Activities.attachSchema(Activities.schema);

export default Activities;

