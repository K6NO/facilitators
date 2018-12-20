import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
/* If edit mode
    for existing users save password immediately, clear state
    for new users store in state and save later with entire profile
*/
const storePassword = (user, userFromState) => {
    if(userFromState.password.length > 5) {
        // Save password
        if (confirm('Reset password? This is permanent!')) {
            // for existing users update password right away
            if(user._id) {
                const userId = user._id;
                const newPassword = userFromState.password;
                Meteor.call('users.adminResetPassword', userId, newPassword, (error) => {
                    if(error) {
                        Bert.alert(error.reason, 'danger');
                    } else {
                        Bert.alert('Password reset', 'success');
                    }
                });
                return true;               
            } else {
                // for new users store password in state and close panel
                return false;
            }
        }            
    } else {
        Bert.alert('Password must be at least 6 characters.', 'danger');
        return false;
    }
}
export default storePassword;