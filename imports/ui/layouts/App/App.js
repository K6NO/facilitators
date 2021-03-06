/* eslint-disable jsx-a11y/no-href */
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import i18n from 'meteor/universe:i18n';
import Navigation from '../../components/Navigation/Navigation';
import Authenticated from '../../components/Authenticated/Authenticated';
import AllowedRole from '../../components/AllowedRole/AllowedRole';
import AllowedRoleAdmin from '../../components/AllowedRole/AllowedRoleAdmin';
import Public from '../../components/Public/Public';
import AnalyticsTracker from '../../components/Analytics/Analytics';
import LandingPage from '../../pages/LandingPage/LandingPage';
import AboutPage from '../../pages/AboutPage/AboutPage';
import AdminPage from '../../pages/AdminPage/AdminPage';
import EditorPage from '../../pages/EditorPage/EditorPage';
import VerifyEmail from '../../pages/VerifyEmail/VerifyEmail';
import RecoverPassword from '../../pages/RecoverPassword/RecoverPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import NotFound from '../../pages/NotFound/NotFound';
import Footer from '../../components/Footer/Footer';
import Terms from '../../pages/Terms/Terms';
import Privacy from '../../pages/Privacy/Privacy';
import getUserName from '../../../modules/get-user-name';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      afterLoginPath: null,
      locale: i18n.getLocale(),
      isMobile: false
    };
  }

  componentDidMount () {
    i18n.onChangeLocale ((newLocale) => {
      if(this.state.locale !== newLocale) {
        this.setState({
          locale: newLocale,
        });
      }
    });
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      isMobile : window.innerWidth < 500
    });
  }

  setAfterLoginPath = (afterLoginPath) => {
    this.setState({ afterLoginPath });
  }

  render() {
    const { props, state, setAfterLoginPath } = this;
    const isMobile = this.state.isMobile;
            
    return (
      <Router>
        {!props.loading ? (
          <div className="App">
          <AnalyticsTracker />
            <Navigation 
              isMobile={isMobile}
              {...props} 
              {...state}
            />
            <Switch>
              {/* Public */}
              <Public exact name="index" path="/" component={LandingPage} isMobile={isMobile} {...props} {...state} />
              <Public exact name="category" path="/category/:cat" component={LandingPage}  {...props} {...state} />
              <Public exact name="about" path="/about" component={AboutPage} isMobile={isMobile} {...props} {...state} />

              <Authenticated exact path="/profile" component={Profile} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />

              <Route name="verify-email" path="/verify-email/:token" component={VerifyEmail}    />
              <Route name="recover-password" path="/recover-password" component={RecoverPassword}    />
              <Route name="reset-password" path="/reset-password/:token" component={ResetPassword}   />
              <Route name="terms" path="/terms" component={Terms} />
              <Route name="privacy" path="/privacy" component={Privacy} />        
              
              {/* Editor */}
              <AllowedRole allowedRoles={['admin', 'user']} exact path="/editor" component={EditorPage} setAfterLoginPath={setAfterLoginPath} {...props} {...state}/>
              
              {/* Admin  */}
              <AllowedRoleAdmin allowedRoles={['admin']} exact path="/editor/admin" component={AdminPage} setAfterLoginPath={setAfterLoginPath} {...props} {...state}/>
              
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </div>
        ) : ''}
      </Router>
    );
  }
}

App.defaultProps = {
  userId: '',
  emailAddress: '',
  username: '',
};

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  emailAddress: PropTypes.string,
  emailVerified: PropTypes.bool.isRequired,
  username: PropTypes.string,
  authenticated: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
  const emailAddress = user && user.emails && user.emails[0].address;
  const username = user && user.profile && user.profile.username;
  
  return {
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    name: name || emailAddress,
    user,
    username,
    userId,
    emailAddress,
    emailVerified: user && user.emails ? user && user.emails && user.emails[0].verified : true,
  };
})(App);