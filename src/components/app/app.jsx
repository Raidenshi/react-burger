import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ConstructorContext } from '../../services/ConstructorContext';
import { baseURL } from '../../services/api';

import appStyles from './app.module.css';

function App() {
  const dataURL = `${baseURL}/ingredients`;
  const orderURL = `${baseURL}/orders`;

  const [state, setState] = React.useState({
    isLoading: false,
    data: {},
  });
  const [modal, setModal] = React.useState({
    visible: false,
    ingredient: null,
  });
  const [addedIngredients, setAddedIngredients] = React.useState([]);
  const [orderData, setOrderData] = React.useState({});

  function closeModal() {
    setModal({ ingredient: null, visible: false });
  }

  function openModalOrder() {
    const addedIngredientsID = {
      ingredients: addedIngredients.map((el) => el._id),
    };
    console.log(JSON.stringify(addedIngredientsID));

    setModal({
      visible: true,
      ingredient: null,
    });

    const postOrder = async () => {
      try {
        const response = await fetch(orderURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(addedIngredientsID),
        });
        if (!response.ok) {
          throw new Error('Error occurred!');
        }
        const data = await response.json();
        setOrderData(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    postOrder();
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
        const result = await fetch(dataURL);
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
          <>
            <BurgerIngredients
              data={state.data}
              openModal={openModalIngredient}
            />
            <ConstructorContext.Provider value={{ addedIngredients }}>
              <BurgerConstructor openModal={openModalOrder} />
            </ConstructorContext.Provider>
          </>
        )}
      </main>
      {modal.visible && (
        <Modal closeModal={closeModal}>
          {modal.ingredient ? (
            <IngredientDetails ingredient={modal.ingredient} />
          ) : (
            <OrderDetails orderData={orderData} />
          )}
        </Modal>
      )}
    </>
  );
}

export default App;
