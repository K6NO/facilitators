import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import Activities from '../Activities';

const getActivitiesByLang = (lang, languages, activities) => activities.map((a) => {
    let b = languages; 
    b.splice(b.indexOf(lang),1);    
    b.forEach(l => delete a[l]);
    console.log(a);
    return a;
});

Meteor.publish('activities.all', () => {
    const userId = Meteor.userId();
    if(userId) {
        if(Roles.userIsInRole(userId, ['admin'])) {
            return Activities.find();
        }
        if(Roles.userIsInRole(userId, ['editor'])) {
            return Activities.find({
                $or: [
                    { owner : userId },
                    { public: true }
                ]
            });
        }
        return Activities.find({
            public: true
        });
    }
});

Meteor.publish('activities.allByLang', (lang) => {
    const userId = Meteor.userId();
    let languages = ['en', 'es', 'hu', 'ro', 'sk'];
    if(userId) {
        if(Roles.userIsInRole(userId, ['admin'])) {
            const activities = Activities.find();
            return getActivitiesByLang(lang, languages, activities);
        }
        if(Roles.userIsInRole(userId, ['editor'])) {
            const activities = Activities.find({
                $or: [
                    { owner : userId },
                    { public: true }
                ]
            });
            return getActivitiesByLang(lang, languages, activities);
        }
        const activities = Activities.find({
            $or: [{ 
                public: true
            }]
        });
        return getActivitiesByLang(lang, languages, activities);
    }
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
        if(Roles.userIsInRole(userId, ['editor'])) {
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
            $or: [{ 
                public: true
            }]
        });
    }
});

Meteor.publish('activities.viewByLang', (activityId, lang) => {
    check(activityId, String);
    check(lang, String);
    const userId = Meteor.userId();
    let languages = ['en', 'es', 'hu', 'ro', 'sk'];

    if(userId) {
        if(Roles.userIsInRole(userId, ['admin'])) {
            const activity = Activities.find({
                _id : activityId,
            });
            return getActivitiesByLang(lang, languages, activity);
        }
        if(Roles.userIsInRole(userId, ['editor'])) {
            const activity = Activities.find({
                _id: activityId,
                $or: [
                    { owner : userId },
                    { public: true }
                ]
            });
            return getActivitiesByLang(lang, languages, activity);
        }
        const activity = Activities.find({
            _id: activityId,
            $or: [{ 
                public: true
            }]
        });
        return getActivitiesByLang(lang, languages, activity);
    }
});

Meteor.publish('activities.criteriaByLang', (field, criteria, tags, lang) => {
    check(field, String);
    check(criteria, String);
    check(tags, Array);
    const userId = Meteor.userId();
    let languages = ['en', 'es', 'hu', 'ro', 'sk'];

    if(userId) {
        if(Roles.userIsInRole(userId, ['admin'])) {
            const activities = Activities.find({
                $or: [
                    { [field] : criteria },
                    { tags : {$regex: tags} }
                ]
            });
            return getActivitiesByLang(lang, languages, activities);
        }
        if(Roles.userIsInRole(userId, ['editor'])) {
            const activities = Activities.find({
                $or: [
                    { [field] : criteria },
                    { tags : {$regex: tags} },
                ],
                $or: [
                    { owner : userId },
                    { public: true }
                ]
            });
            return getActivitiesByLang(lang, languages, activities);
        }
        const activities = Activities.find({
            $or: [{ 
                [field] : criteria,
                tags : {$regex: tags}
            }],
            public: true
        });
        return getActivitiesByLang(lang, languages, activities);
    }
});