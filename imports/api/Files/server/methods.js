import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import Images from '../Images';
import uploadFileLocal from './upload-file-local';
import storeImageUrl from './store-image-url';

import handleMethodException from '../../../modules/handle-method-exception';
import rateLimit from '../../../modules/rate-limit';

Meteor.methods({
    /*  EDITOR operations
    superadmin, admin can edit/delete all images 
    editors can edit/delete only images in the organisation (but not other published images)
    */
    'images.updateTags' : function imagesUpdate (image) {
        check(image, {
            tags: Array,
            _id: String,
        });
        try {
            const imageId = image._id;
            if(this.userId) {
                const orgId = Meteor.user().organisation;
                if(orgId 
                    && Roles.userIsInRole(this.userId, ['superadmin', 'admin'])) {
                    Images.update(imageId, { $set: image });
                    return imageId;
                } 
                if(orgId 
                    && Roles.userIsInRole(this.userId ['editor'])
                    && image.organisationId === orgId) {
                        Images.update(imageId, { $set: image });
                } 
                throw new Meteor.Error('Update Image Tags', 'Not admin or editor in organisation.')
            }
            throw new Meteor.Error('Update Image Tags', 'Not logged in.');
        } catch (exception) {
            handleMethodException(exception);
        }
    },
    'images.switchPublic' : function imagesSwitchPublic (image) {
        check(image, Object);
        try {
            const imageId = image._id;
            const isPublic = !image.public;
            if(Meteor.userId()) {
                const orgId = Meteor.user().organisation;
                if (orgId 
                    && Roles.userIsInRole(this.userId, ['superadmin', 'admin'])) {
                    Images.update(imageId, { $set: { public : isPublic }});
                    return imageId;
                }
                if (orgId 
                    && Roles.userIsInRole(this.userId, ['editor'])
                    && image.organisationId === orgId) {
                        Images.update(imageId, { $set: { public : isPublic }});
                        return imageId;
                }
                throw new Meteor.Error('Switch Image Public State', 'Not admin or editor in organisation.')
            }
            throw new Meteor.Error('Switch Image Public State', 'Not logged in.');
        } catch (exception) {
            handleMethodException(exception);
        }
    },
    'images.removeAdmin' : function (image) {
        check(image, Object);
        try {
            if(Meteor.userId()) {
                const orgId = Meteor.user().organisation;
                if(orgId && Roles.userIsInRole(this.userId, ['admin', 'superadmin'])) {
                    return Images.remove(image. _id);
                } 
                if ( orgId && Roles.userIsInRole(this.userId, ['editor']) 
                && image.organisationId === orgId) { 
                    return Images.remove(image. _id);
                }
                throw new Meteor.Error('Remove Image', 'Not admin or editor in organisation.');
            }
            throw new Meteor.Error('Remove Image', 'Not logged in.');
        } catch (exception) {
            handleMethodException(exception);
        } 
    },
    'images.storeUrlInDatabase': (url, originalName, isMobile, isDesktop) => storeImageUrl(url, originalName, isMobile, isDesktop),
    'uploadFile': (blob, name, path, encoding) => uploadFileLocal (blob, name, path, encoding),
    
    // NON-EDITOR - delete profile image 
    'images.removeByUrl' : function (url) {
        check(url, String);
        try {
            return Images.remove({url: url});
        } catch (exception) {
            handleMethodException(exception);
        }
    },
    
});

rateLimit({
    methods: [
        'images.removeAdmin',
        'images.removeByUrl',
        'images.storeUrlInDatabase',
        'images.uploadFile',
      ],
      limit: 50,
      timeRange: 1000,
});

// NOT IN USE
    // 'images.insert' : function imagesInsert(image) {
    //     check(image, {
    //         public: Boolean,
    //         url: String,
    //         tags: Array,
    //         accessibleTo: Array,
    //     });
    //     // only admin and superadmin can upload (used in local upload)
    //     try {
    //         if(this.userId) {
    //             const orgId = Meteor.user().organisation;
    //             if(orgId 
    //                 && Roles.userIsInRole(this.userId, ['superadmin', 'admin'])) {
    //                 return Images.insert({ 
    //                     owner: this.userId, 
    //                     organisationId: orgId,
    //                     ...image
    //                 })
    //             }
    //         }
    //     } catch (exception) {
    //         handleMethodException(exception)
    //     }
    // },
    // 'images.update' : function imagesUpdate (image) {
    //     check(image, {
    //         _id: String,
    //         public: Boolean,
    //         url: String,
    //         tags: Array,
    //         accessibleTo: Array,
    //     });
    //     try {
    //         const imageId = image._id;

    //         Images.update(imageId, { $set: image });
    //         return imageId;

    //     } catch (exception) {
    //         handleMethodException(exception);
    //     }
    // },
