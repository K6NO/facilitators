import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import editProfile from './edit-profile';
import adminEditProfile from './admin-edit-profile';
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
        imageUrl: Match.Maybe(String),
      },
    });
    const newUserId = Accounts.createUser(user);
    Roles.addUsersToRoles(newUserId, ['user']);
    return newUserId;
  },
  'users.editProfile': function usersEditProfile(profile) {
    check(profile, {
        name: {
          first: Match.Maybe(String),
          last: Match.Maybe(String),
        },
        username: Match.Maybe(String),
        imageUrl: Match.Maybe(String),
        likes: Match.Maybe(Array),
    });

    return editProfile({ userId: Meteor.userId(), profile })
      .then(response => response)
      .catch((exception) => {
        handleMethodException(exception);
      });
  },
  'users.deleteAccount': function usersDeleteAccount() {
    return deleteAccount({ userId: Meteor.userId() })
      .then(response => response)
      .catch((exception) => {
        handleMethodException(exception);
      });
  },
  /* 
    Admin methods
  */
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
    if(Roles.userIsInRole(this.userId, ['admin'])) {
      const newUserId = Accounts.createUser(user);
      Roles.addUsersToRoles(newUserId, roles);
      return newUserId;
    } else {
      console.error('Non-admin tried to perform admin role: signup');
    }
  },
  'users.updateRole': function usersUpdateRole(_id, roles) {
    check(_id, String);
    check(roles, Array);
    const userId = Meteor.userId();
    if(Roles.userIsInRole(userId, ['admin'])) {
      Roles.addUsersToRoles(_id, roles);
      return userId;
    } else {
      throw new Meteor.Error('Users updateRole', 'Non-admin tried to perform admin role: role change');
    }
  },
  'users.updateOrg': function usersUpdateRole(_id, org) {
    check(_id, String);
    check(org, String);
    const userId = Meteor.userId();
    if(Roles.userIsInRole(userId, ['admin'])) {
      return Meteor.users.update(_id, {
        $set: {
          organisation: org
        }
      });
    } else {
      throw new Meteor.Error('Users updateRole', 'Non-admin tried to perform admin role: role change');
    }
  },
  'users.adminEditProfile' : function usersAdminEditProfile(userId, profile, roles) {
    check(profile, {
      email: String,
      organisation: Match.Maybe(String),
      profile: {
        name: {
          first: Match.Maybe(String),
          last: Match.Maybe(String),
        },
        username: Match.Maybe(String),
        imageUrl: Match.Maybe(String),
      },
    });
    check(userId, String);
    check(roles, Array);
    
    if(Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      return adminEditProfile({userId, profile, roles})
      .then(response => response)
      .catch((exception) => {
        handleMethodException(exception);
      });
     } else {
      console.error('Non-admin tried to perform admin role: profile update');
    }
    
  },
  'users.adminResetPassword' : function usersadminResetPassword(_id, newPassword) {
    check(_id, String);
    check(newPassword, String);
    if(Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      Accounts.setPassword(_id, newPassword);
    } else {
      console.error('Non-admin tried to perform admin role: reset password');
    }
  },
  'users.adminRemoveAccount' : function usersAdminRemoveAccount (userId) {
    check(userId, String);
    if(Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      // The parameter of deleteAccount must be embedded in {}
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
    'users.adminEditProfile',
    'users.editProfile',
    'users.deleteAccount',
    'users.adminRemoveAccount',
    'users.adminResetPassword' ,
    'users.adminSignup',
    'users.updateRole',
    'users.updateOrg',
    'user.signup,'
  ],
  limit: 5,
  timeRange: 1000,
});
