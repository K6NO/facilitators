import React from 'react';
import { Link } from 'react-router-dom';
// import { Grid } from 'reactstrap';
import { year } from '../../../modules/dates';

import './Footer.scss';

const copyrightYear = () => {
  const currentYear = year();
  return currentYear === '2017' ? '2017' : `2017-${currentYear}`;
};

const Footer = () => (
  <div className="Footer">
    <div className="container">
      <p className="pull-left">&copy; {copyrightYear()} NewsGamer</p>
      <ul className="pull-right">
        <li><Link to="/terms">Terms<span className="hidden-xs"> of Service</span></Link></li>
        <li><a href="https://app.termly.io/document/privacy-policy/939e7c91-b05f-40ba-8f01-e7464acde377">Privacy<span className="hidden-xs"> Policy</span></a></li>
      </ul>
    </div>
  </div>
);

Footer.propTypes = {};

export default Footer;
