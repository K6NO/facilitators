import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import Activities from '../Activities';
import handleMethodException from '../../../modules/handle-method-exception';
import rateLimit from '../../../modules/rate-limit';

/**
 * Admins and registered users can add new Activities.
 * For admins add organisationId
 * For registered users add default "Public" organisationId
 */
Meteor.methods({
    'activities.insert' : function activitiesCreate (activity) {
      check(activity, {
        public: Boolean,
        title: Object,
        description: Object,
        category: String,
        age: String,
        time: String,
        group: String,
        preparations: Object,
        objectives: Object,
        tools: Object,
        resources: Object,
        images: Array,
        comments: Array,
        tags: Array,
        languages: Array,
        likes: Match.Optional(Array)
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
            throw new Meteor.Error('Insert Activity', 'User has no organisation. Contact admins to set user organisation before adding an activity.');
          }
          throw new Meteor.Error('Insert Activity', 'No user ID. Only registered users can create new activities.');
      } catch (exception) {
        handleMethodException(exception);
      }
    },
    'activities.update' : function activitiesUpdate (activity) {
        check(activity, {
            _id: String,
            public: Boolean,
            title: Match.Optional(Object),
            description: Match.Optional(Object),
            category: Match.Optional(String),
            age: Match.Optional(String),
            time: Match.Optional(String),
            group: Match.Optional(String),
            preparations: Match.Optional(Object),
            objectives: Match.Optional(Object),
            tools: Match.Optional(Object),
            resources: Match.Optional(Object),
            images: Match.Optional(Array),
            comments: Match.Optional(Array),
            tags: Match.Optional(Array),
            likes: Match.Optional(Array),
            organisationId: Match.Optional(String),
            languages: Array
        });
        try {
            const user = Meteor.user();
            if(user._id) {
                if(user.organisation) {
                    if(Roles.userIsInRole(user._id, ['admin'])) {
                        // admins can overwrite any Activities
                        return Activities.update(activity._id, {
                            $set: activity
                        });
                    }
                    // registered users can update own Activities
                    return Activities.update({
                        _id: activity._id,
                        owner: user._id
                    }, {
                        $set: activity
                    });
                }
                throw new Meteor.Error('Update Activity', 'User has no organisation. Contact admins to set user organisation before updating an activity.');
            }
          throw new Meteor.Error('Update Activity', 'No userId. Only registered users can update activities.');
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
                            [`${attributeName}.${locale}`] : value
                            }
                        }
                    );
                }
                return Activities.update({
                    _id: activityId,
                    owner: user._id
                    }, {
                    $set: {
                        [`${attributeName}.${locale}`] : value
                    }
                });
            }
            throw new Meteor.Error('Update Activity by Field', 'No userId.');
        } catch (exception) {
            handleMethodException(exception);
        }
    },
    'activities.updateAttributes' : function activitiesUpdateAttributes (activityId, attributeName, value) {
        check(activityId, String);
        check(attributeName, String);
        check(value, Match.OneOf(String, Array, Boolean));
        
        try {
            const user = Meteor.user();
            if(user._id) {
                if(Roles.userIsInRole(user._id, ['admin'])) {
                    // admins can overwrite any activities
                    return Activities.update(activityId, {
                        $set: {
                            [attributeName] : value
                        }
                    });
                } 
                return Activities.update({
                    _id: activityId,
                    owner: user._id
                    }, {
                    $set: {
                        [attributeName] : value,
                    }
                });
            }
            throw new Meteor.Error('Update Activity by Field', 'No userId.');
            
        } catch (exception) {
            handleMethodException(exception);
        }

    },
    'activities.storeImageUrl' : function activitiesStoreImageUrl (url, activityId) {
        check(url, String);
        check(activityId, String);
        const userId = Meteor.userId();
        if(userId) {
            if(Roles.userIsInRole(userId, ['admin', 'editor'])) {
                try {
                    Activities.update(activityId, {
                        $push : {
                            images : url
                        }
                    });
                } catch (exception) {
                    handleMethodException(exception);
                }
            } else {
                throw new Meteor.Error('Store File Url in Database', 'User is not editor or admin.');
            }
        } else {
            throw new Meteor.Error('Store File Url in Database', 'Not a registered user.');
        }
    },
    'activities.addComment' : function activitiesStoreImageUrl (activityId, commentMessage) {
        check(commentMessage, String);
        check(activityId, String);
        const user = Meteor.user();
        const userId = user._id;
        const username = user.profile.username;
        if(userId) {
            const comment = {
                userId : userId,
                username: username,
                message: commentMessage,
                authorized: true
            }
            if(Roles.userIsInRole(userId, ['admin', 'editor', 'user'])) {
                try {
                    Activities.update(activityId, {
                        $push : {
                            comments : comment
                        }
                    });
                } catch (exception) {
                    handleMethodException(exception);
                }
            } else {
                throw new Meteor.Error('Add Comment', 'User is not user, editor or admin.');
            }
        } else {
            throw new Meteor.Error('Add Comment', 'Not a registered user.');
        }
    },
    'activities.remove' : function activitiesRemove (activity) {
        check(activity, Object);
        try {
            const user = Meteor.user();
            if(user._id) {
                // Admins can remove anything
                if(Roles.userIsInRole(user._id, ['admin'])) {
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
        'activities.remove',
        'activities.insert',
        'activities.update',
        'activities.updateAttributes',
        'activities.updateLangAttributes'
      ],
      limit: 5,
      timeRange: 1000,
});