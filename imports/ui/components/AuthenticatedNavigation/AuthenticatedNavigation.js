import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'reactstrap';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import CategorySelector from '../CategorySelector/CategorySelector';
import * as eventAnalytics from '../../components/Analytics/analyticsUtil';
import './AuthenticatedNavigation.scss';

class AuthenticatedNavigation extends React.Component {
  constructor(props){
    super(props);
  }

  logoutUser = () => {
    const { history } = this.props;
    Meteor.logout();
    history.push('/');
  }

  handleScoreboardClick = () => {
    eventAnalytics.registerEvent('Users', 'Visit Profile page');
  }

  render() {
    const { navbarCallback, viewportIsMobile, ...props } = this.props;
    const user = Meteor.user();
    console.log(props.history)
    return (
      <div className="AuthenticatedNavigation ">
        <Nav navbar>
          <NavItem>
            <LanguageSelector {...props} /> 
          </NavItem>
          <NavItem>
            <CategorySelector {...props} />
          </NavItem>
          <NavItem className={`pl-3 ${viewportIsMobile && 'pt-2'}`}>
            {i18n.__('menu.about')}
          </NavItem >
          <NavItem className={`pl-3 ${viewportIsMobile && 'pt-4'}`}
            onClick={()=> this.logoutUser()}>
            {i18n.__('menu.signout')}
          </NavItem>
          {(user && !!Roles.userIsInRole(user, ['admin', 'editor'])
            && 
          <LinkContainer to="/editor">
            <NavItem className={`pl-3 ${viewportIsMobile && 'pt-4'}`}>
            {i18n.__('menu.editor')}
            </NavItem>
          </LinkContainer>
          )}
        </Nav>
        
      </div>
    );
  }
};

AuthenticatedNavigation.propTypes = {
  history: PropTypes.object.isRequired,
  viewportIsMobile: PropTypes.bool.isRequired,  
};

export default withRouter(AuthenticatedNavigation);
