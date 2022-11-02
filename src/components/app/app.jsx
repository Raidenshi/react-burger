import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../services/store/actions/getData';
import { postOrder } from '../../services/store/actions/postOrder';
import {
  CLOSE_MODAL,
  OPEN_MODAL,
} from '../../services/store/reducers/modalSlice';
import {
  CLEAR_CURRENT_INGREDIENT,
  SET_CURRENT_INGREDIENT,
} from '../../services/store/reducers/IngredientsSlice';
import { CLEAR_ORDER } from '../../services/store/reducers/orderSlice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import appStyles from './app.module.css';

function App() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.ingredientsReducer.data);
  const addedIngredients = useSelector(
    (store) => store.ingredientsReducer.addedIngredients
  );
  const isVisible = useSelector((store) => store.modalReducer.isVisible);

  function closeModal() {
    dispatch(CLOSE_MODAL());
    dispatch(CLEAR_ORDER());
    dispatch(CLEAR_CURRENT_INGREDIENT());
  }

  function openModalOrder() {
    const addedIngredientsID = {
      ingredients: addedIngredients.map((el) => el._id),
    };
    dispatch(OPEN_MODAL('order'));
    dispatch(postOrder(addedIngredientsID));
  }

  function openModalIngredient(ingredient) {
    dispatch(OPEN_MODAL('ingredient'));
    dispatch(SET_CURRENT_INGREDIENT(ingredient));
  }

  React.useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <>
      <AppHeader />
      <main className={appStyles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients openModal={openModalIngredient} />
          <BurgerConstructor openModal={openModalOrder} />
        </DndProvider>
      </main>
      {isVisible && <Modal closeModal={closeModal} />}
    </>
  );
}

export default App;
