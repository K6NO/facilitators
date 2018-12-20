import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import handleMethodException from '../../../modules/handle-method-exception';
import Images from '../Images';

export default function fileStoreUrlInDatabase ( url, originalName, isMobile, isDesktop ) {
    check( url, String );
    check( originalName, String );
    check( isMobile, Boolean );
    check( isDesktop, Boolean );
    const userId = Meteor.userId();
    if(userId) {
        const orgId = Meteor.user().organisation;
        if(orgId && 
        Roles.userIsInRole(userId, ['admin', 'superadmin', 'editor'])) {
            // first upload original, then mobile and desktop
            if(isMobile){
                const originalUrl = url.replace('/mobile', '/original');
                try {
                    Images.update({url: originalUrl}, {$set: {urlMobile: url, mobile: true}});
                } catch ( exception ) {
                    handleMethodException(exception);
                };            
            } else if(isDesktop){
                const originalUrl = url.replace('/desktop', '/original');
                try {
                    Images.update({url: originalUrl}, {$set: {urlDesktop: url, desktop: true}});
                } catch ( exception ) {
                    handleMethodException(exception);
                };
            } else {
                const image = {
                    public: false,
                    mobile: isMobile,
                    desktop: isDesktop,
                    organisationId: orgId,
                    url: url,
                    originalName : originalName,
                    tags: [],
                    accessibleTo: ['superadmin', 'admin', 'editor', 'user'],
                    };
                try {
                    return Images.insert({ owner: userId, ...image });
                } catch( exception ) {
                handleMethodException(exception);
                }
            }
        } else {
            throw new Meteor.Error('Store File Url in Database', 'Not authorised.');
        }
    }
}