import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import Activities from '../Activities';
import handleMethodException from '../../../modules/handle-method-exception';
import rateLimit from '../../../modules/rate-limit';


Meteor.methods({
    'activities.insert' : function activitiesCreate () {
      check(activity, {
        title: Match.Optional(Object),
        description: Match.Optional(Object),
        category: Match.Optional(Object),
        age: Match.Optional(Object),
        time: Match.Optional(Object),
        participants: Match.Optional(Object),
        preparations: Match.Optional(Object),
        objectives: Match.Optional(Object),
        tools: Match.Optional(Object),
        resources: Match.Optional(Object),
        images: Match.Optional(Array),
        comments: Match.Optional(Array),
        tags: Match.Optional(Array),
        public: Boolean,
      });
  
      try {
          const user = Meteor.user();
          if(user._id) {
            if(user.organisation) {
                return Activities.insert({ 
                    owner: user._id, 
                    organisationId: user.organisation, 
                    ...activity 
                });
            }
            return Activities.insert({ 
                owner: user._id, 
                ...activity 
            });
          }
        throw new Meteor.Error('Insert Activity', 'No userId.')
      } catch (exception) {
        handleMethodException(exception);
      }
    },
    'activities.update' : function activitiesUpdate (activity) {
        check(activity, {
            _id: String,
            title: Match.Optional(Object),
            description: Match.Optional(Object),
            category: Match.Optional(Object),
            age: Match.Optional(Object),
            time: Match.Optional(Object),
            participants: Match.Optional(Object),
            preparations: Match.Optional(Object),
            objectives: Match.Optional(Object),
            tools: Match.Optional(Object),
            resources: Match.Optional(Object),
            images: Match.Optional(Array),
            comments: Match.Optional(Array),
            tags: Match.Optional(Array),
            public: Boolean,
        });
    
        try {
            const user = Meteor.user();
            if(user._id) {
                if(Roles.userIsInRole(user._id, ['admin'])) {
                    // admins can overwrite any activities
                    return Activities.update(activity._id, {
                        $set: activity
                    });
                }
                return Activities.update({
                    _id: activity._id,
                    owner: user._id
                }, {
                    $set: activity
                });
            }
          throw new Meteor.Error('Update Activity', 'No userId.')
        } catch (exception) {
          handleMethodException(exception);
        }
      },
      'activities.updateLangAttributes' : function activitiesUpdateLangAttributes (activityId, attributeName, locale, value) {
        check(activityId, String);
        check(attributeName, String);
        check(locale, String);
        check(value, String);
        
        try {
            const user = Meteor.user();
            if(user._id) {
                if(Roles.userIsInRole(user._id, ['admin'])) {
                    // admins can overwrite any activities
                    return Activities.update(activityId, {
                        $set: {
                            [attributeName] : {
                                [locale] : value
                            }
                        }
                    });
                } 
                return Activities.update({
                    _id: activityId,
                    owner: user._id
                    }, {
                    $set: {
                        [attributeName] : {
                            [locale] : value
                        }
                    }
                });
            }
            throw new Meteor.Error('Update Activity by Field', 'No userId.');
            
        } catch (exception) {
            handleMethodException(exception);
        }

    },
    'activities.remove' : function activitiesRemove (activity) {
        check(activity, Object);
        try {
            const user = Meteor.user();
            if(user._id) {
                // Admins can remove anything
                if(Roles.userIsInRole(user_id, ['admin'])) {
                    return Activities.remove(activity._id);
                } else if(user._id === activity.owner) {
                      // Users can remove own content
                    return Activities.remove(activity._id);
                } else {
                    throw new Meteor.Error('Remove Activity', 'Not authorized to remove this activity.');
                }
            }
            throw new Meteor.Error('Remove Activity', 'No userId.');
        } catch (exception) {
            handleMethodException(exception);
        } 
    },
});

rateLimit({
    methods: [
        'activities.removeAdmin',
        'activities.updateLangAttributes',
        'activities.insert',
        'activities.update',
      ],
      limit: 5,
      timeRange: 1000,
});


// old methods

// 'activities.updateLangAttributes' : function activitiesUpdateLangAttributes (activityId, lang, attributes) {
//     check(activityId, String);
//     check(lang, String);
//     check(attributes, {
//       title: String,
//       description: String,
//       category: String,
//       age: String,
//       time: String,
//       participants: Match.Optional(String),
//       preparations: Match.Optional(String),
//       objectives: Match.Optional(String),
//       tools: Match.Optional(String),
//       resources: Match.Optional(String),
//     });
//     try {
//         const user = Meteor.user();
//         if(user._id) {
//             if(Roles.userIsInRole(user._id, ['admin'])) {
//                 // admins can overwrite any activities
//                 return Activities.update(activityId, {
//                     $set: {
//                         [lang] : attributes
//                     }
//                 });
//             }
            // return Activities.update({
            //     _id: activityId,
            //     owner: user._id
            //     }, {
            //     $set: {
            //         [lang] : attributes
            //     }
            // });
//         }
//         throw new Meteor.Error('Update Activity', 'No userId.')
//     } catch (exception) {
//         handleMethodException(exception);
//     }
// },