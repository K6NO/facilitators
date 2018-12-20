import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'reactstrap';
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
    const { username, name, viewportIsMobile, isEditor } = this.props;
    const user = Meteor.user();
    // const userIsAdmin = !!Roles.userIsInRole(user, ['admin', 'editor']);
    // const userIsEditor = !!Roles.userIsInRole(user, ['editor']);
    const shortRedLines = (
      <svg height="20" width="140">
        <line x1="10" y1="10" x2="140" y2="10" style={{
            stroke:"#ff5458bb",
            strokeWidth:"1"}} />
        </svg>
    );
    const longRedLines = (
      <svg height="20" width="220">
        <line x1="10" y1="10" x2="220" y2="10" style={{
            stroke:"#ff5458bb",
            strokeWidth:"1"}} />
        </svg>
    );
    return (
      <div className="AuthenticatedNavigation ">
        <Nav onClick={this.props.navbarCallback} navbar>
         
          {!isEditor && viewportIsMobile &&
            <NavItem>
            <span>{name ? name : username}</span>
            </NavItem>
          }
          <NavItem>
            <a href="http://newsgamer.com" target="_blank">More Info</a>
            {viewportIsMobile ? longRedLines : ''}
          </NavItem>
          <LinkContainer to="/stories">
            <NavItem>
              Newsgames
              {viewportIsMobile ? longRedLines : ''}
            </NavItem>
          </LinkContainer>
          
          {!isEditor && 
            <LinkContainer to="/profile">
            <NavItem onClick={this.handleScoreboardClick}>
              Scoreboard
              {viewportIsMobile ? shortRedLines : ''}
            </NavItem>
          </LinkContainer>}
          <NavItem onClick={()=> this.logoutUser()}>
              <span className="redBorder">Logout</span>
              {viewportIsMobile ? longRedLines : ''}
          </NavItem>
          {(user && !!Roles.userIsInRole(user, ['admin', 'editor'])
            && 
            <LinkContainer to="/editor/stories">
              <NavItem>
              <span className="redBorder">Editor</span>
                {viewportIsMobile ? longRedLines : ''}
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
