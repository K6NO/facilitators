import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem  } from 'reactstrap';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import CategorySelector from '../CategorySelector/CategorySelector';
import LoginModalController from '../../components/LoginModal/LoginModalController';
import './PublicNavigation.scss';

const PublicNavigation = props => (
  <div className="PublicNavigation">
    <Nav 
      navbar
      onClick={props.navbarCallback}>
      <NavItem>
        <LanguageSelector {...props} /> 
      </NavItem>
      <NavItem>
        <CategorySelector {...props} />
      </NavItem>
      <NavItem>
        About
      </NavItem>
      <NavItem>
        <LoginModalController            
          {...props}/>
      </NavItem>
    </Nav>
  </div>
);

export default PublicNavigation;

PublicNavigation.propTypes = {
  navbarCallback: PropTypes.func.isRequired,
  updateLocaleCallback : PropTypes.func.isRequired,
};
