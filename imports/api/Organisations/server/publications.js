import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import Organisations from '../Organisations';

Meteor.publish('organisations', function organisations() {
    if (this.userId) {
        const user = Meteor.users.findOne(this.userId);
            if(Roles.userIsInRole(Meteor.userId(), ['admin', 'superadmin'])) {
            return Organisations.find();
        }    
    }
});

Meteor.publish('organisations.view', function organisationsView(organisationId) {
    check(organisationId, String);
    if(this.userId) {
        if(Roles.userIsInRole(this.userId, ['superadmin', 'admin'])) {
            return Organisations.find({ _id: organisationId });
        }
        if (Roles.userIsInRole(this.userId, ['editor']) ) {
            const userOrgId = Meteor.user().organisation;
            if (userOrgId === organisationId) {
                return Organisations.find({_id: organisationId});
            } else {
                this.stop();
                throw new Meteor.Error('Editor and requested organisation do not match.');
            }  
        }
    } else {
        this.stop();
        throw new Meteor.Error('User not logged in.', 'Org pub');
    }
});