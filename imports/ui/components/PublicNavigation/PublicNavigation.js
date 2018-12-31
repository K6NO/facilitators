import React from 'react';
import { Nav, NavItem  } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';

import LoginModalController from '../../components/LoginModal/LoginModalController';
import './PublicNavigation.scss';

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
