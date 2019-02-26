import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import { Nav, NavItem, NavLink  } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { StyledAboutNavLink } from '../MainStyledComponents/MainStyledComponents';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import CategorySelector from '../CategorySelector/CategorySelector';
import LoginModalController from '../../components/LoginModal/LoginModalController';
import './PublicNavigation.scss';

const PublicNavigation = props => (
  
  <div className="PublicNavigation">
    <Nav 
      navbar
      >
      <NavItem>
        <LanguageSelector {...props} />
      </NavItem>
      <NavItem>
        <CategorySelector {...props} />
      </NavItem>
      <NavItem className={`pl-3 pl-md-4 pr-md-4 ${props.isMobile && 'pt-2'}`}>
        <StyledAboutNavLink href="/about">{i18n.__('menu.about')}</StyledAboutNavLink>
      </NavItem>
      <NavItem className={`pl-3 ${props.isMobile && 'pt-2'}`}>
        <LoginModalController            
          {...props}/>
      </NavItem>
    </Nav>
  </div>
);

export default withRouter(PublicNavigation);

PublicNavigation.propTypes = {
  navbarCallback: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired
};
