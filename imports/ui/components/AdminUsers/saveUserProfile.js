import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
const saveUserProfile = (user, userFromState, closeCallback, resetUserStateCallback) => {
    const firstName = userFromState.name.split(' ')[0];
    const lastName = userFromState.name.split(' ')[1] || ' ';
    const profileUpdateObject = {
        email: userFromState.email,
        organisation: userFromState.organisation,
        profile: {
            name: {
                first: firstName,
                last: lastName,
            },
            username: userFromState.username,
        },
    };
    const roles = userFromState.roles;
    if(user._id) {
        // for existing user update the profile
        Meteor.call('users.adminEditProfile', user._id, profileUpdateObject, roles, (error) => {
            if(error) {
                console.error(error.message)
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert('User profile saved', 'success');
            }
        });
    } else {
        // for new user create account
        profileUpdateObject.password = userFromState.password;
        Meteor.call('users.adminSignup', profileUpdateObject, roles, (error) => {
            if(error) {
                Bert.alert(error.reason, 'danger');
            } else {
                resetUserStateCallback();
                closeCallback();
            }
        });
    }
};
export default saveUserProfile;