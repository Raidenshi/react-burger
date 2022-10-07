import React from 'react';
import PropTypes from 'prop-types';
import overlayStyles from './modal-overlay.module.css';

function ModalOverlay({ closeModal }) {
  return <div className={overlayStyles.overlay} onClick={closeModal}></div>;
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func,
};

export default ModalOverlay;
