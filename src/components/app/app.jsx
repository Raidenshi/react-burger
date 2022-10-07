import { isVisible } from '@testing-library/user-event/dist/utils';
import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import appStyles from './app.module.css';

function App() {
  const URL = 'https://norma.nomoreparties.space/api/ingredients';
  const [state, setState] = React.useState({
    isLoading: false,
    data: {},
  });
  const [modal, setModal] = React.useState({
    visible: false,
    ingredient: null,
  });

  function closeModal() {
    setModal({ ingredient: null, visible: false });
  }

  function openModal(e) {
    if (e.target.localName == 'img') {
      setModal({
        visible: true,
        ingredient: state.data.data.find((el) => el.image === e.target.src),
      });
    } else if (e.target.localName == 'button') {
      setModal({
        visible: true,
        ingredient: null,
      });
    }
  }

  React.useEffect(() => {
    const getingridientsData = async () => {
      try {
        setState({ ...state, isLoading: true });
        const result = await fetch(URL);
        const ingrData = await result.json();
        setState({ isLoading: false, data: ingrData });
      } catch (err) {
        console.log(err);
      }
    };

    getingridientsData();
  }, []);

  return (
    <>
      <AppHeader />
      <main className={appStyles.main}>
        {state.data.data && (
          <BurgerIngredients data={state.data.data} openModal={openModal} />
        )}
        {state.data.data && (
          <BurgerConstructor data={state.data.data} openModal={openModal} />
        )}
      </main>
      {modal.visible && (
        <Modal closeModal={closeModal}>
          {modal.ingredient ? (
            <IngredientDetails ingredient={modal.ingredient} />
          ) : (
            <OrderDetails />
          )}
        </Modal>
      )}
    </>
  );
}

export default App;
