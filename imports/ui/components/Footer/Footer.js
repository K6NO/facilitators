import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Link } from 'react-router-dom';
import { year } from '../../../modules/dates';
import styled from 'styled-components';
import './Footer.scss';

const copyrightYear = () => {
  const currentYear = year();
  return currentYear === '2018' ? '2018' : `2018-${currentYear}`;
};
const StyledLink = styled.a`
  font-size: 1rem;
  color: white;
  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
  }
`;
const StyledFooter = styled.div`
  background: #57c214;
  height: ${props => props.isMobile ? "40px" : "80px"};
`;
const Footer = () => (
  <StyledFooter className="Footer">
    <div className="container">
      <p className="pull-left">&copy; {copyrightYear()} Ecofacilitators</p>
      <ul className="pull-right">
        <li><StyledLink href="/terms">{i18n.__('footer.terms')}</StyledLink></li>
        <li><StyledLink href="https://app.termly.io/document/privacy-policy/939e7c91-b05f-40ba-8f01-e7464acde377">{i18n.__('footer.privacy')}</StyledLink></li>
      </ul>
    </div>
  </StyledFooter>
);

export default Footer;
