import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

import modalStyles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

function Modal({ closeModal }) {
  const ref = React.useRef(null);
  const modal = useSelector((store) => store.ingredientsReducer.modal);

  React.useEffect(() => {
    ref.current.focus();
  }, []);

  const handleKeyDown = (e) => {
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
          <CloseIcon />
        </button>
        {modal === 'ingredient' ? <IngredientDetails /> : <OrderDetails />}
      </div>
      <ModalOverlay closeModal={closeModal} />
    </>,

    modalRoot
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
