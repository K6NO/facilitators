import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

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
    title: {
        en: {
            type: String,
            max: 200,
            label: "Username. Max. 200 chars."
        },
        es: {
            type: String,
            max: 200,
            label: "Username. Max. 200 chars."
        },
        hu: {
            type: String,
            max: 200,
            label: "Username. Max. 200 chars."
        },
        ro: {
            type: String,
            max: 200,
            label: "Username. Max. 200 chars."
        },
        sk: {
            type: String,
            max: 200,
            label: "Username. Max. 200 chars."
        }
    },
    description: {
        en: {
            type: String,
            max: 1200,
            label: "Activity description. Max. 1200 chars."
        },
        es: {
            type: String,
            max: 1200,
            label: "Activity description. Max. 1200 chars."
        },
        hu: {
            type: String,
            max: 1200,
            label: "Activity description. Max. 1200 chars."
        },
        ro: {
            type: String,
            max: 1200,
            label: "Activity description. Max. 1200 chars"
        },
        sk: {
            type: String,
            max: 1200,
            label: "Activity description. Max. 1200 chars."
        }
    },
    category: {
        en: {
            type: String,
            max: 20,
            label: "Activity category. Max. 20 chars."
        },
        es: {
            type: String,
            max: 20,
            label: "Activity category. Max. 20 chars."
        },
        hu: {
            type: String,
            max: 20,
            label: "Activity category. Max. 20 chars."
        },
        ro: {
            type: String,
            max: 20,
            label: "Activity category. Max. 20 chars."
        },
        sk: {
            type: String,
            max: 20,
            label: "Activity category. Max. 20 chars."
        }
    },
    age: {
        en: {
            type: String,
            max: 20,
            label: "Activity age group. Max. 20 chars."
        },
        es: {
            type: String,
            max: 20,
            label: "Activity age group. Max. 20 chars."
        },
        hu: {
            type: String,
            max: 20,
            label: "Activity age group. Max. 20 chars."
        },
        ro: {
            type: String,
            max: 20,
            label: "Activity age group. Max. 20 chars."
        },
        sk: {
            type: String,
            max: 20,
            label: "Activity age group. Max. 20 chars."
        }
    },
    time: {
        en: {
            type: String,
            max: 20,
            label: "Activity time. Max. 20 chars."
        },
        es: {
            type: String,
            max: 20,
            label: "Activity time. Max. 20 chars."
        },
        hu: {
            type: String,
            max: 20,
            label: "Activity time. Max. 20 chars."
        },
        ro: {
            type: String,
            max: 20,
            label: "Activity time. Max. 20 chars."
        },
        sk: {
            type: String,
            max: 20,
            label: "Activity time. Max. 20 chars."
        }
    },
    participants: {
        en: {
            type: String,
            max: 20,
            label: "Activity nr of participants. Max. 20 chars."
        },
        es: {
            type: String,
            max: 20,
            label: "Activity nr of participants. Max. 20 chars."
        },
        hu: {
            type: String,
            max: 20,
            label: "Activity nr of participants. Max. 20 chars."
        },
        ro: {
            type: String,
            max: 20,
            label: "Activity nr of participants. Max. 20 chars."
        },
        sk: {
            type: String,
            max: 20,
            label: "Activity nr of participants. Max. 20 chars."
        }
    },
    preparations: {
        en: {
            type: String,
            max: 400,
            label: "Activity prep. Max. 400 chars.",
        },
        es: {
            type: String,
            max: 400,
            label: "Activity prep. Max. 400 chars.",
        },
        hu: {
            type: String,
            max: 400,
            label: "Activity prep. Max. 400 chars.",
        },
        ro: {
            type: String,
            max: 400,
            label: "Activity prep. Max. 400 chars.",
        },
        sk: {
            type: String,
            max: 400,
            label: "Activity prep. Max. 400 chars.",
        }
    },
    objectives: {
        en: {
            type: String,
            max: 400,
            label: "Activity objectives. Max. 400 chars.",
        },
        es: {
            type: String,
            max: 400,
            label: "Activity objectives. Max. 400 chars.",
        },
        hu: {
            type: String,
            max: 400,
            label: "Activity objectives. Max. 400 chars.",
        },
        ro: {
            type: String,
            max: 400,
            label: "Activity objectives. Max. 400 chars.",
        },
        sk: {
            type: String,
            max: 400,
            label: "Activity objectives. Max. 400 chars.",
        }
    },
    tools: {
        en: {
            type: String,
            max: 400,
            label: "Activity tools. Max. 400 chars.",
            optional: true,
        },
        es: {
            type: String,
            max: 400,
            label: "Activity tools. Max. 400 chars.",
            optional: true,
        },
        hu: {
            type: String,
            max: 400,
            label: "Activity objectives. Max. 400 chars.",
            optional: true,
        },
        ro: {
            type: String,
            max: 400,
            label: "Activity tools. Max. 400 chars.",
            optional: true,
        },
        sk: {
            type: String,
            max: 400,
            label: "Activity tools. Max. 400 chars.",
            optional: true,
        }
    },
    resources: {
        en: {
            type: String,
            max: 400,
            label: "Activity tools. Max. 400 chars.",
            optional: true,
        },
        es: {
            type: String,
            max: 400,
            label: "Activity tools. Max. 400 chars.",
            optional: true,
        },
        hu: {
            type: String,
            max: 400,
            label: "Activity objectives. Max. 400 chars.",
            optional: true,
        },
        ro: {
            type: String,
            max: 400,
            label: "Activity tools. Max. 400 chars.",
            optional: true,
        },
        sk: {
            type: String,
            max: 400,
            label: "Activity resources. Max. 400 chars.",
            optional: true
        }
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

// old structure

// const commentSchema = new SimpleSchema({
//     createdAt: {
//         type: String,
//         label: 'The date this document was created.',
//         autoValue() {
//             if (this.isInsert) return (new Date()).toISOString();
//         },
//     },
//     updatedAt: {
//         type: String,
//         label: 'The date this document was last updated.',
//         autoValue() {
//             if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
//         },
//     },
//     userId : {
//         type: String,
//         type: SimpleSchema.RegEx.Id,
//         label: 'Commenter UserId.',
//     },
//     username: {
//         type: String,
//         max: 120,
//         label: "Username. Max. 120 chars."
//     },
//     message: {
//         type: String,
//         max: 600,
//         label: "Username. Max. 600 chars."
//     },
//     authorized: Boolean,
// })
// const attributeSchema = new SimpleSchema({
//     title: {
//         type: String,
//         max: 200,
//         label: "Username. Max. 200 chars."
//     },
//     description:    {
//         type: String,
//         max: 1200,
//         label: "Activity description. Max. 1200 chars."
//     },
//     category:  {
//         type: String,
//         max: 20,
//         label: "Activity category. Max. 20 chars."
//     },
//     age: {
//         type: String,
//         max: 20,
//         label: "Activity age group. Max. 20 chars."
//     },
//     time: {
//         type: String,
//         max: 20,
//         label: "Activity time. Max. 20 chars."
//     },
//     participants: {
//         type: String,
//         max: 20,
//         label: "Activity nr of participants. Max. 20 chars."
//     },
//     preparations: {
//         type: String,
//         max: 400,
//         label: "Activity prep. Max. 400 chars.",
//         optional: true,
//     },
//     objectives: {
//         type: String,
//         max: 400,
//         label: "Activity objectives. Max. 400 chars.",
//         optional: true,
//     },
//     tools: {
//         type: String,
//         max: 400,
//         label: "Activity tools. Max. 400 chars.",
//         optional: true,
//     },
//     resources: {
//         type: String,
//         max: 400,
//         label: "Activity tools. Max. 400 chars.",
//         optional: true,
//     },
//   });