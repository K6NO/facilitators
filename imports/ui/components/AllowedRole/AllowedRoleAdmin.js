import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class AllowedRoleAdmin extends React.Component {
  componentWillMount() {
    this.props.setAfterLoginPath(`${window.location.pathname}${window.location.search}`);
  }

  render() {
    const {
      loggingIn, authenticated, component, path, exact, allowedRoles, ...rest
    } = this.props;
  
    const user = Meteor.user();
    const allowed = Roles.userIsInRole(user, ['admin']);

    return (
      <Route
        path={path}
        exact={exact}
        render={props => {
          if (! authenticated) {
            return (<Redirect to="/" />);
          }

          return allowed ?
            (React.createElement(component, {
              ...props, ...rest, loggingIn, authenticated,
            })) :
            (<div>You are not allowed to do that</div>);
        }}
      />
    );
  }
}

AllowedRoleAdmin.defaultProps = {
  path: '',
  exact: false,
};

AllowedRoleAdmin.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  setAfterLoginPath: PropTypes.func.isRequired,
  path: PropTypes.string,
  exact: PropTypes.bool,
};

export default AllowedRoleAdmin;
