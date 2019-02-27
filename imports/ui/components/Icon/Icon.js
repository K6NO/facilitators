import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ icon, size, style }) => (<i className={`${style} fa-${icon} fa-${size} fa-fw`} />);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string,
};
Icon.defaultProps = {
  size: 'sm',
  style: 'fas'
};

export default Icon;
