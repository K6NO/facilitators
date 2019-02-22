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
const StyledFooter = styled.div`
  background: #57c214;
  height: ${props => props.isMobile ? "40px" : "80px"};
`;
const StyledList = styled.ul`
  float: left;  
  list-style: none;
  padding: 0;
`;
const StyledListItem = styled.li`
  float: left;
  &:first-child {
    margin-right: 15px;
  }
`;
const StyledLink = styled.a`
  font-size: 1.3rem;
  color: white;
  font-weight: 100;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    color: #263810;
  };
`;
const StyledText = styled.p`
  color: white;
  font-size: 1.3rem;
  font-weight: 100;
  letter-spacing: 1px;
`;

const Footer = () => (
  <StyledFooter className="Footer">
    <div className="container pt-5">
      <StyledText className="pull-left">&copy; {copyrightYear()} Ecofacilitators</StyledText>
      <StyledList className="pull-right">
        <StyledListItem>
          <StyledLink href="/terms">{i18n.__('footer.terms')}</StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink href="https://app.termly.io/document/privacy-policy/939e7c91-b05f-40ba-8f01-e7464acde377">{i18n.__('footer.privacy')}</StyledLink>
        </StyledListItem>
      </StyledList>
    </div>
  </StyledFooter>
);

export default Footer;
