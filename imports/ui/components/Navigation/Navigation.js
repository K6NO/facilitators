import React from 'react';
import PropTypes from 'prop-types';
import {   Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand, } from 'reactstrap';
import PublicNavigation from '../PublicNavigation/PublicNavigation';
import AuthenticatedNavigation from '../AuthenticatedNavigation/AuthenticatedNavigation';
import onClickOutside from 'react-onclickoutside'

import './Navigation.scss';

class Navigation extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
    }
  };
  

  toggleNavbar = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  handleClickOutside = () => {
    const navbar = document.getElementById('navbarCollapse');
    const open = $('#navbarCollapse').hasClass('show');
    if(open) {
      navbar.classList.add('hide');
      this.setState({
        isOpen: !this.state.isOpen,
      })
    }
  };
  render () { 
    const { props } = this;
    const logoUrl = props.isMobile 
      ? "/img/ui/logo@0.15x.png" 
      : "/img/ui/logo@0.25x.png";

    return (
      <div>
      <Navbar light expand="md">  
        <NavbarBrand className="mr-auto" href="/">
          <img className="img-responsive" src={logoUrl}/>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
        <Collapse 
          isOpen={this.state.isOpen} 
          id="navbarCollapse" 
          navbar>
          {!props.authenticated ? 
            <PublicNavigation navbarCallback={this.toggleNavbar} {...props}/> 
            : <AuthenticatedNavigation navbarCallback={this.toggleNavbar} {...props} />}
        </Collapse>
      </Navbar>
      </div>
    );
  }
};

Navigation.defaultProps = {
};

Navigation.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default onClickOutside(Navigation);
