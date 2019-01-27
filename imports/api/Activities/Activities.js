import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const commentSchema = new SimpleSchema({
    createdAt: {
        type: String,
        label: 'The date this document was created.',
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
        },
        required: true,
    },
    updatedAt: {
        type: String,
        label: 'The date this document was last updated.',
        autoValue() {
            if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
        },
        required: true,
    },
    userId : {
        type: String,
        type: SimpleSchema.RegEx.Id,
        label: 'Commenter UserId.',
        required: true,
    },
    username: {
        type: String,
        max: 100,
        label: "Commenter username. Max. 120 chars.",
        required: true,
    },
    message: {
        type: String,
        max: 600,
        label: "Comment message. Max. 600 chars.",
        required: true,
    },
    authorized: Boolean,
}, {requiredByDefault: false});

const Activities = new Mongo.Collection('Activities');

Activities.schema = new SimpleSchema({
    createdAt: {
        type: String,
        label: 'The date this document was created.',
        autoValue() {
        if (this.isInsert) return (new Date()).toISOString();
        },
        required: true,
    },
    updatedAt: {
        type: String,
        label: 'The date this document was last updated.',
        autoValue() {
        if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
        },
        required: true,
    },
    owner: {
        type: String,
        label: 'The ID of the user who uploaded this Activity.',
        regEx: SimpleSchema.RegEx.Id,
        required: true,
    },
    organisationId: {
        type: String,
        label: 'The ID of the users organisation who uploaded this Activity.',
        regEx: SimpleSchema.RegEx.Id,
        required: true,
    },
    public: {
        type: Boolean,
        label: 'Whether or not this is accessible without being logged in',
        required: true,
        defaultValue: false,
    },
    title: Object,
    'title.en': {
        type: String,
        max: 120,
        label: "Title of the activity. Max. 120 chars."
    },
    'title.es': {
        type: String,
        max: 120,
        label: "Title of the activity. Max. 120 chars."
    },
    'title.hu': {
        type: String,
        max: 120,
        label: "Title of the activity. Max. 120 chars."
    },
    'title.ro': {
        type: String,
        max: 120,
        label: "Title of the activity. Max. 120 chars."
    },
    'title.sk': {
        type: String,
        max: 120,
        label: "Title of the activity. Max. 120 chars."
    },
    description: Object,
    'description.en': {
        type: String,
        max: 10000,
        label: "Activity description. Max. 10000 chars."
    },
    'description.es': {
        type: String,
        max: 10000,
        label: "Activity description. Max. 10000 chars."
    },
    'description.hu': {
        type: String,
        max: 10000,
        label: "Activity description. Max. 10000 chars."
    },
    'description.ro': {
        type: String,
        max: 10000,
        label: "Activity description. Max. 10000 chars"
    },
    'description.sk': {
        type: String,
        max: 10000,
        label: "Activity description. Max. 10000 chars."
    },
    category: {
        type: String,
        max: 10,
        label: "Activity category. Max. 10 chars.",
        allowedValues: ["footprint", "deepeco", "ecofem", "landart", "food", "community"],
    },
    age: {
        type: String,
        max: 10,
        label: "Activity age. Max. 10 chars.",
        allowedValues: ["agech", "agete", "ageya", "agead", "ageel" ],
    },
    time: {
        type: String,
        max: 10,
        label: "Activity time. Max. 10 chars.",
        allowedValues: ["timevs", "timesh", "timemd", "timeln", "timevl" ],
    },
    group: {
        type: String,
        max: 10,
        label: "Activity group size. Max. 10 chars.",
        allowedValues: ["groupvs", "groupsm", "groupmd", "grouplg","groupvl"],
    },
    preparations: Object,
    'preparations.en': {
        type: String,
        max: 400,
        label: "Activity prep. Max. 400 chars.",
    },
    'preparations.es': {
        type: String,
        max: 400,
        label: "Activity prep. Max. 400 chars.",
    },
    'preparations.hu': {
        type: String,
        max: 400,
        label: "Activity prep. Max. 400 chars.",
    },
    'preparations.ro': {
        type: String,
        max: 400,
        label: "Activity prep. Max. 400 chars.",
    },
    'preparations.sk': {
        type: String,
        max: 400,
        label: "Activity prep. Max. 400 chars.",
    },
    objectives: Object, 
    'objectives.en': {
        type: String,
        max: 400,
        label: "Activity objectives. Max. 400 chars.",
    },
    'objectives.es': {
        type: String,
        max: 400,
        label: "Activity objectives. Max. 400 chars.",
    },
    'objectives.hu': {
        type: String,
        max: 400,
        label: "Activity objectives. Max. 400 chars.",
    },
    'objectives.ro': {
        type: String,
        max: 400,
        label: "Activity objectives. Max. 400 chars.",
    },
    'objectives.sk': {
        type: String,
        max: 400,
        label: "Activity objectives. Max. 400 chars.",
    },
    tools: Object,
    'tools.en': {
        type: String,
        max: 400,
        label: "Activity tools. Max. 400 chars.",
    },
    'tools.es': {
        type: String,
        max: 400,
        label: "Activity tools. Max. 400 chars.",
    },
    'tools.hu': {
        type: String,
        max: 400,
        label: "Activity objectives. Max. 400 chars.",
    },
    'tools.ro': {
        type: String,
        max: 400,
        label: "Activity tools. Max. 400 chars.",
    },
    'tools.sk': {
        type: String,
        max: 400,
        label: "Activity tools. Max. 400 chars.",
    },
    resources: Object,
    'resources.en': {
        type: String,
        max: 400,
        label: "Activity tools. Max. 400 chars.",
    },
    'resources.es': {
        type: String,
        max: 400,
        label: "Activity tools. Max. 400 chars.",
    },
    'resources.hu': {
        type: String,
        max: 400,
        label: "Activity objectives. Max. 400 chars.",
    },
    'resources.ro': {
        type: String,
        max: 400,
        label: "Activity tools. Max. 400 chars.",
    },
    'resources.sk': {
        type: String,
        max: 400,
        label: "Activity resources. Max. 400 chars.",
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
}, {requiredByDefault: false});

Activities.attachSchema(Activities.schema);

export default Activities;