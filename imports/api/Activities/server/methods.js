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
                if(!Roles.userIsInRole(user._id, ['inactive'])) {
                    return Activities.insert({ 
                        owner: user._id, 
                        organisationId: user.organisation, 
                        ...activity 
                    });
                } // end inactive if check
                throw new Meteor.Error('Insert Activity', "User account inactivated. Contact admins.");
            } // end organisation if check
            throw new Meteor.Error('Insert Activity', 'User has no organisation. Contact admins to set user organisation before adding an activity.');
          } // end iserId if check
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
                    if(!Roles.userIsInRole(user._id, ['inactive'])) {
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
                    } // end inactive if check
                    throw new Meteor.Error('Update Activity', "User account inactivated. Contact admins.");
                } // end organisation if check
                throw new Meteor.Error('Update Activity', 'User has no organisation. Contact admins to set user organisation before updating an activity.');
            } // end userId if check
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
                if(user.organisation) {
                    if(!Roles.userIsInRole(user._id, ['inactive'])) {
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
                    } // end inactive if check
                    throw new Meteor.Error('Update Activity LangAttributes', "User account inactivated. Contact admins.");
                } // end organisation if check
                throw new Meteor.Error('Update Activity LangAttributes', 'User has no organisation. Contact admins to set user organisation before updating an activity.');
            } // end userId if check
            throw new Meteor.Error('Update Activity LangAttributes', 'No userId.');
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
                if(user.organisation) {
                    if(!Roles.userIsInRole(user._id, ['inactive'])) {
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
                    } // end inactive if check
                    throw new Meteor.Error('Update Activity Attributes', "User account inactivated. Contact admins.");
                } // end organisation if check
                throw new Meteor.Error('Update Activity Attributes', 'User has no organisation. Contact admins to set user organisation before updating an activity.');
            } // end userId if check
            throw new Meteor.Error('Update Activity Attributes', 'No userId.');
            
        } catch (exception) {
            handleMethodException(exception);
        }
    },
    'activities.storeImageUrl' : function activitiesStoreImageUrl (url, activityId) {
        check(url, String);
        check(activityId, String);
        try {
            const user = Meteor.user();
                      
            if(user._id) {
                if(user.organisation) {
                    if(!Roles.userIsInRole(user._id, ['inactive'])) {
                        if(Roles.userIsInRole(user._id, ['admin', 'user'])) {
                            return Activities.update(activityId, {
                                $push : {
                                    images : url
                                }
                            });
                        } // end admin / user check
                        throw new Meteor.Error('Store File Url in Database', 'User is not editor or admin.');
                    } // end inactive if check
                    throw new Meteor.Error('Store File Url in Database', "User account inactivated. Contact admins.");
                } // end organisation if check
                throw new Meteor.Error('Store File Url in Database', "User has no organisation. Contact admins to set user organisation.");
            } // end userId check 
            throw new Meteor.Error('Store File Url in Database', 'Not a registered user.');
        } catch (exception) {
            handleMethodException(exception);
        }
    },
    'activities.likeUpdate' : function activitiesUpdateAttributes (activityId, likes) {
        check(activityId, String);        
        check(likes, Array);
        
        try {
            const user = Meteor.user();
            if(user._id) {
                // Inactive users cannot like or dislike
                if(!Roles.userIsInRole(user._id, ['inactive'])) {
                    return Activities.update(activityId, {
                        $set: {
                            likes : likes
                        }
                    }); 
                } // end inactive if check
                throw new Meteor.Error('Like', "User account inactivated. Contact admins.");
            } // end userId if check
            throw new Meteor.Error('Like', 'No userId.');
        } catch (exception) {
            handleMethodException(exception);
        }
    },
    'activities.addComment' : function activitiesStoreImageUrl (activityId, commentMessage) {
        check(commentMessage, String);
        check(activityId, String);
        
        try {
            const user = Meteor.user();
            const userId = user._id;
            const username = user.profile.username;
            if (userId) {
                if(user.organisation) {
                    if(!Roles.userIsInRole(user._id, ['inactive'])) {
                        const comment = {
                            userId : userId,
                            username: username,
                            message: commentMessage,
                            authorized: true
                        }
                        if(Roles.userIsInRole(userId, ['admin', 'editor', 'user'])) {
                            return Activities.update(activityId, {
                                $push : {
                                    comments : comment
                                }
                            });
                        } // end role checking
                        throw new Meteor.Error('Add Comment', 'User is has no privilege to post a comment. Contact admins.');
                    } // end inactive if check
                    throw new Meteor.Error('Add Comment', "User account inactivated. Contact admins.");
                } // end organisation if check
                throw new Meteor.Error('Add Comment', "User has no organisation. Contact admins to set user organisation.");
            } //end userId check
            throw new Meteor.Error('Add Comment', 'Not a registered user.');
        } catch (exception) {
            handleMethodException(exception);
        }
    },
    'activities.remove' : function activitiesRemove (activity) {
        check(activity, Object);
        try {
            const user = Meteor.user();
            if(user._id) {
                if(user.organisation) {
                    if(!Roles.userIsInRole(user._id, ['inactive'])) {
                        // Admins can remove anything
                        if(Roles.userIsInRole(user._id, ['admin'])) {
                            return Activities.remove(activity._id);
                        } else if(user._id === activity.owner) {
                            // Users can remove own content
                            return Activities.remove(activity._id);
                        } else {
                            throw new Meteor.Error('Remove Activity', 'Not authorized to remove this activity.');
                        }
                    } // end inactive if check
                    throw new Meteor.Error('Add Comment', "User account inactivated. Contact admins.");
                } // end organisation if check
                throw new Meteor.Error('Add Comment', "User has no organisation. Contact admins to set user organisation.");
            } // end userId check
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