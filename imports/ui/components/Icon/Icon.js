import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ icon, size }) => (<i className={`fas fa-${icon} fa-${size} fa-fw`} />);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string,
};
Icon.defaultProps = {
  size: 'sm',
};

export default Icon;
