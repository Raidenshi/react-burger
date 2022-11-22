import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

interface IModal {
  closeModal: () => void;
  children: React.ReactNode;
}

function Modal({ closeModal, children }: IModal) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  return createPortal(
    <>
      <div
        className={modalStyles.modal}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        ref={ref}
      >
        <button className={modalStyles.button} onClick={closeModal}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay closeModal={closeModal} />
    </>,

    modalRoot as Element
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
