import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import editProfile from './edit-profile';
import adminEditProfile from './admin-edit-profile';
import exportData from './export-data';
import deleteAccount from './delete-account';
import handleMethodException from '../../../modules/handle-method-exception';
import rateLimit from '../../../modules/rate-limit';

Meteor.methods({
  'users.signup' : function usersSignup(user) {
    check(user, {
      email: String,
      password: String,
      profile: {
        name: {
          first: String,
          last: String,
        },
        username: String,
        activeGame: Match.Maybe(Object),
      },
    });
    const newUserId = Accounts.createUser(user);
    Roles.addUsersToRoles(newUserId, ['user']);
    return newUserId;
  },
  'users.adminSignup' : function usersAdminSignup (user, roles) {
    check(user, {
      email: String,
      password: String,
      organisation: String,
      profile: {
        name: {
          first: String,
          last: String,
        },
        username: String,
      },
    });
    check(roles, Array);
    if(Roles.userIsInRole(this.userId, ['admin', 'superadmin'])) {
      const newUserId = Accounts.createUser(user);
      Roles.addUsersToRoles(newUserId, roles);
      return newUserId;
    } else {
      console.error('Non-admin tried to perform admin role: signup');
    }
    
    
  },
  'users.updateRole': function usersUpdateRole(_id, role) {
    check(_id, String);
    check(role, String);
    if(Roles.userIsInRole(this.userId, ['admin', 'superadmin'])) {
      Roles.addUsersToRoles(_id, [role]);
    } else {
      console.error('Non-admin tried to perform admin role: role change');
    }
  },
  'users.adminEditProfile' : function usersAdminEditProfile(userId, profile, roles) {
    check(profile, {
      email: String,
      organisation: Match.Maybe(String),
      profile: {
        name: {
          first: String,
          last: String,
        },
        username: String,
        imageUrl: Match.Maybe(String),
      },
    });
    check(userId, String);
    check(roles, Array);
    
    if(Roles.userIsInRole(this.userId, ['admin', 'superadmin'])) {
      return adminEditProfile({ userId, profile, roles })
      .then(response => response)
      .catch((exception) => {
        handleMethodException(exception);
      });
     } else {
      console.error('Non-admin tried to perform admin role: profile update');
    }
    
  },
  'users.adminResetPassword' : function usersadminResetPassword(userId, newPassword) {
    check(userId, String);
    check(newPassword, String);
    if(Roles.userIsInRole(this.userId, ['admin', 'superadmin'])) {
      Accounts.setPassword(userId, newPassword);
    } else {
      console.error('Non-admin tried to perform admin role: reset password');
    }
    
  },
  'users.editProfile': function usersEditProfile(profile) {
    check(profile, {
      emailAddress: String,
      profile: {
        name: {
          first: String,
          last: String,
        },
        username: String,
        imageUrl: Match.Maybe(String),
      },
    });

    return editProfile({ userId: this.userId, profile })
      .then(response => response)
      .catch((exception) => {
        handleMethodException(exception);
      });
  },
  'users.exportData': function usersExportData() {
    return exportData({ userId: this.userId })
      .then(response => response)
      .catch((exception) => {
        handleMethodException(exception);
      });
  },
  'users.deleteAccount': function usersDeleteAccount() {
    return deleteAccount({ userId: this.userId })
      .then(response => response)
      .catch((exception) => {
        handleMethodException(exception);
      });
  },
  'users.adminRemoveAccount' : function usersAdminRemoveAccount (userId) {
    check(userId, String);

    if(Roles.userIsInRole(this.userId, ['admin', 'superadmin'])) {
      return deleteAccount({userId})
      .then(response => response)
      .catch((exception) => {
        handleMethodException(exception);
      });
    } else {
      console.error('Non-admin tried to perform admin role: remove account');    }  
  },
  'users.sendVerificationEmail': function usersSendVerificationEmail(userId) {
    return Accounts.sendVerificationEmail(userId);
  },
});

rateLimit({
  methods: [
    'users.sendVerificationEmail',
    'users.editProfile',
    'users.exportData',
    'users.deleteAccount',
    'users.adminRemoveAccount',
    'users.adminResetPassword' ,
    'users.adminSignup',
    'users.updateRole',
  ],
  limit: 5,
  timeRange: 1000,
});
