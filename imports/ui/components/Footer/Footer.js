import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Link } from 'react-router-dom';
import { year } from '../../../modules/dates';

import './Footer.scss';

const copyrightYear = () => {
  const currentYear = year();
  return currentYear === '2018' ? '2018' : `2018-${currentYear}`;
};

const Footer = () => (
  <div className="Footer">
    <div className="container">
      <p className="pull-left">&copy; {copyrightYear()} Ecofacilitators</p>
      <ul className="pull-right">
        <li><Link to="/terms">{i18n.__('footer.terms')}</Link></li>
        <li><a href="https://app.termly.io/document/privacy-policy/939e7c91-b05f-40ba-8f01-e7464acde377">{i18n.__('footer.privacy')}</a></li>
      </ul>
    </div>
  </div>
);

export default Footer;
