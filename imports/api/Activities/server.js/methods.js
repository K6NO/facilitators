import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import Activities from '../Activities';
import uploadFileLocal from './upload-file-local';
import storeImageUrl from './store-image-url';

import handleMethodException from '../../../modules/handle-method-exception';
import rateLimit from '../../../modules/rate-limit';


Meteor.methods({
    'activities.insert' : function activitiesCreate () {
      check(activity, {
        organisationId: Match.Optional(String),
        en: Match.Optional(Object),
        es: Match.Optional(Object),
        hu: Match.Optional(Object),
        ro: Match.Optional(Object),
        sk: Match.Optional(Object),
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
        throw new Meteor.Error('Create Activity', 'No userId.')
      } catch (exception) {
        handleMethodException(exception);
      }
    },
    'activities.update' : function activitiesCreate (activity) {
        check(activity, {
            _id: String,
            organisationId: Match.Optional(String),
            en: Match.Optional(Object),
            es: Match.Optional(Object),
            hu: Match.Optional(Object),
            ro: Match.Optional(Object),
            sk: Match.Optional(Object),
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
    'activities.updateLangAttributes' : function activitiesCreate (activityId, lang, attributes) {
        check(activityId, String);
        check(lang, String);
        check(attributes, {
          title: String,
          description: String,
          category: String,
          age: String,
          time: String,
          participants: Match.Optional(String),
          preparations: Match.Optional(String),
          objectives: Match.Optional(String),
          tools: Match.Optional(String),
          resources: Match.Optional(String),
        });
        try {
            const user = Meteor.user();
            if(user._id) {
                if(Roles.userIsInRole(user._id, ['admin'])) {
                    // admins can overwrite any activities
                    return Activities.update(activityId, {
                        $set: {
                            [lang] : attributes
                        }
                    });
                }
                return Activities.update({
                    _id: activityId,
                    owner: user._id
                    }, {
                    $set: {
                        [lang] : attributes
                    }
                });
            }
            throw new Meteor.Error('Update Activity', 'No userId.')
        } catch (exception) {
            handleMethodException(exception);
        }
    },
    'activities.removeAdmin' : function (activityId) {
        check(activityId, Object);
        try {
            const user = Meteor.user();
            if(user._id) {
                if(Roles.userIsInRole(user_id, ['admin'])) {
                    return Activities.remove(activityId);
                }
            }
            throw new Meteor.Error('Remove Image', 'Not userId.');
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