import React from 'react';
import PropTypes from 'prop-types';

import buttonStyles from './app-header-button.module.css';

function AppHeaderButton(props) {
  const classActive = props.isActive ? '' : 'text_color_inactive';
  return (
    <a className={`${buttonStyles.button} p-4`}>
      {props.children}
      <span className={`text text_type_main-default ${classActive}`}>
        {props.text}
      </span>
    </a>
  );
}

AppHeaderButton.propTypes = {
  isActive: PropTypes.bool,
  text: PropTypes.string,
};

export default AppHeaderButton;
