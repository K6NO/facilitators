import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import Activities from '../Activities';

/** 
 * Admins can view and edit all Activities
 * Registered users can view and edit public and own Activities
 * Non-registered users can view public activities
**/
Meteor.publish('activities.all', (pageNum, pageSize) => {
    check(pageNum, Number);
    check(pageSize, Number);
    const userId = Meteor.userId();
    const skips = pageSize * pageNum;

    if(userId) {
        if(Roles.userIsInRole(userId, ['admin'])) {
            return Activities.find({}, {
                skip: skips,
                limit: pageSize,
                sort: { categories : -1 }
            });
        }
        return Activities.find({
            $or: [
                { owner : userId },
                { public: true }
            ]
        }, {
            skip: skips,
            limit: pageSize,
            sort: { categories : -1 }
        });
    }
    return Activities.find({
        public: true
    }, {
        skip: skips,
        limit: pageSize,
        sort: { categories : -1 }
    });
});

Meteor.publish('activities.allFilter', (filterObject, pageNum, pageSize) => {
    check(filterObject, Object);
    check(pageNum, Number);
    check(pageSize, Number);
    /**
     * Querying the db with multiple, non-exclusive criteria.
     * 1. Examine the filterObject, check for existing key-value pairs
     * 2. Values of the filterObject must be in an array
     * 3. Keys of the filterObject must match allowedFields in Activities schema
     * 4. Find documents matching any of these values in the corresponding fields.
     *    Use the $and operator, in combination with $or if needed.  
     * 5. Make sure that only public or own content is returned for non admins
     * 
     * Inspired by https://stackoverflow.com/questions/49628432/how-to-convert-an-object-to-array-of-objects#
     * and https://stackoverflow.com/questions/21417711/search-multiple-fields-for-multiple-values-in-mongodb
     */


    const mongoFilterArray = Object.entries(filterObject).map(([key, values]) => (
        { [key] : {$in : values } }
    ));
    const userId = Meteor.userId();
    const skips = pageSize * pageNum;
    console.log('pagenum ', pageNum, ' skips: ', skips, ' pagesize ', pageSize)
    if(userId) {
        if(Roles.userIsInRole(userId, ['admin'])) {
            return Activities.find({
                $and: mongoFilterArray,
                    }, {
                    skip: skips,
                    limit: pageSize,
                    sort: { categories : -1 }
                });
        }
        return Activities.find({
            $or:[
                { public: true },
                { owner: userId }                
            ],
            $and: mongoFilterArray
        }, {
            skip: skips,
            limit: pageSize,
            sort: { categories : -1 }
        });
    }
    return Activities.find({
        public: true,
        $and: mongoFilterArray
    }, {
        skip: skips,
        limit: pageSize,
        sort: { categories : -1 }
    });
});

Meteor.publish('activities.filterCount', (filterObject) => {
    check(filterObject, Object);
    
    const mongoFilterArray = Object.entries(filterObject).map(([key, values]) => (
        { [key] : {$in : values } }
    ));
    const userId = Meteor.userId();
    if(userId) {
        if(Roles.userIsInRole(userId, ['admin'])) {
            return Activities.find({
                $and: mongoFilterArray,
                    }).count();
        }
        return Activities.find({
            $or:[
                { public: true },
                { owner: userId }                
            ],
            $and: mongoFilterArray
        }).count();
    }
    return Activities.find({
        public: true,
        $and: mongoFilterArray
    }).count();
});

Meteor.publish('activities.allCount', () => {
    const userId = Meteor.userId();
    if(userId) {
        if(Roles.userIsInRole(userId, ['admin'])) {
            return Activities.find({}).count();
        }
        return Activities.find({
            $or:[
                { public: true },
                { owner: userId }                
            ]
        }).count();
    }
    return Activities.find({
        public: true
    }).count();
});

Meteor.publish('activities.view', (activityId) => {
    check(activityId, String);
    const userId = Meteor.userId();
    if(userId) {
        if(Roles.userIsInRole(userId, ['admin'])) {
            return Activities.find({
                _id : activityId,
            });
        }
        return Activities.find({
            _id: activityId,
            $or: [
                { owner : userId },
                { public: true }
            ]
        });
    }
    return Activities.find({
        _id: activityId,
        public: true
    });
    
});