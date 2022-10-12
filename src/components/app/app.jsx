import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import appStyles from './app.module.css';
import { ConstructorContext } from '../../services/ConstructorContext';

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
  const [addedIngredients, setAddedIngredients] = React.useState([]);

  function closeModal() {
    setModal({ ingredient: null, visible: false });
  }

  function openModalOrder() {
    setModal({
      visible: true,
      ingredient: null,
    });
  }

  function openModalIngredient(ingredient) {
    setModal({
      visible: true,
      ingredient: ingredient,
    });
  }

  React.useEffect(() => {
    const getingridientsData = async () => {
      try {
        setState({ ...state, isLoading: true });
        const result = await fetch(URL);
        if (!result.ok) {
          throw new Error('Error occurred!');
        }
        const ingrData = await result.json();
        setState({ isLoading: false, data: ingrData.data });
        setAddedIngredients([
          ingrData.data[0],
          ingrData.data[3],
          ingrData.data[4],
          ingrData.data[5],
          ingrData.data[5],
          ingrData.data[0],
        ]);
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
        {state.data.length && (
          <BurgerIngredients
            data={state.data}
            openModal={openModalIngredient}
          />
        )}
        {state.data.length && (
          <ConstructorContext.Provider value={{ addedIngredients }}>
            <BurgerConstructor openModal={openModalOrder} />
          </ConstructorContext.Provider>
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
