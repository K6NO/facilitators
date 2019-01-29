import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
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
    const { navbarCallback, props } = this.props;
    const user = Meteor.user();
    
    return (
      <div className="AuthenticatedNavigation ">
        <Nav onClick={navbarCallback} navbar>
          <NavItem 
            // onClick={props.navbarCallback}
            >
            <LanguageSelector {...props} /> 
          </NavItem>
          <NavItem 
            // onClick={props.navbarCallback}
            >
            <CategorySelector {...props} />
          </NavItem>
          <NavItem 
            // onClick={props.navbarCallback}
            >
            About
          </NavItem>
          <NavItem onClick={()=> this.logoutUser()}>
            Logout
          </NavItem>
          {(user && !!Roles.userIsInRole(user, ['admin', 'editor'])
            && 
          <LinkContainer to="/editor">
            <NavItem>
            Editor
            </NavItem>
          </LinkContainer>
          )}
        </Nav>
        
      </div>
    );
  }
};

AuthenticatedNavigation.propTypes = {
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  viewportIsMobile: PropTypes.bool.isRequired,
  
};

export default withRouter(AuthenticatedNavigation);
