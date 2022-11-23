import React from 'react';
import overlayStyles from './modal-overlay.module.css';

function ModalOverlay({ closeModal }: { closeModal: () => void }) {
  return <div className={overlayStyles.overlay} onClick={closeModal}></div>;
}

export default ModalOverlay;
