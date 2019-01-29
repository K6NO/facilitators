import React from 'react';
import { Nav, NavItem  } from 'reactstrap';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import CategorySelector from '../CategorySelector/CategorySelector';
import LoginModalController from '../../components/LoginModal/LoginModalController';
import './PublicNavigation.scss';

const PublicNavigation = props => (
  <div className="PublicNavigation">
    <Nav navbar>
      <NavItem 
        onClick={props.navbarCallback}>
        <LanguageSelector {...props} /> 
      </NavItem>
      <NavItem 
        onClick={props.navbarCallback}>
        <CategorySelector {...props} />
      </NavItem>
      <NavItem 
        onClick={props.navbarCallback}>
        About
      </NavItem>
      <NavItem
        onClick={props.navbarCallback}>
        <LoginModalController            
          {...props}/>
      </NavItem>
    </Nav>
  </div>
);

export default PublicNavigation;
