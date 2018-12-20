import React from 'react';
import { Nav, NavItem  } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';

import LoginModalController from '../../components/LoginModal/LoginModalController';
import './PublicNavigation.scss';

const shortRedLines = (
  <svg height="20" width="140">
    <line x1="10" y1="10" x2="140" y2="10" style={{
        stroke:"#ff5458bb",
        strokeWidth:"1"}} />
    </svg>
);
const PublicNavigation = props => (
  <div className="PublicNavigation">
    <Nav navbar>
      {props.viewportIsMobile && 
      <NavItem 
        id="imageLi"
        onClick={props.navbarCallback}>
        <img className="menuLogo" src="/img/ui/NewsGamer_logo_white.png" alt="Newsgamer logo"/>
      </NavItem>
      }
      <NavItem>
        <a href="http://newsgamer.com" target="_blank">More Info</a>
      </NavItem>
      <LinkContainer to="/stories">
          <NavItem
            onClick={props.navbarCallback}
          >
            Newsgames
            {props.viewportIsMobile && shortRedLines}
          </NavItem>
      </LinkContainer>
      <NavItem
        onClick={props.navbarCallback}>
        <LoginModalController            
          className={"menuModal"} 
          {...props}/>
      </NavItem>
    </Nav>
  </div>
);

export default PublicNavigation;
