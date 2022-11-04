import React from 'react';
import PropTypes from 'prop-types';

import buttonStyles from './app-header-button.module.css';
import { NavLink } from 'react-router-dom';
import { isActiveLink } from '../../utils/isActiveLink';

function AppHeaderButton({ children, text, to }) {
  return (
    <NavLink
      className={`${buttonStyles.button} p-4 `}
      style={isActiveLink}
      to={to}
    >
      {children}
      <span className={`text text_type_main-default`}>{text}</span>
    </NavLink>
  );
}

AppHeaderButton.propTypes = {
  isActive: PropTypes.bool,
  text: PropTypes.string,
  to: PropTypes.string,
};

export default AppHeaderButton;
