import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import { getData } from '../../services/store/actions/getData';
import { postOrder } from '../../services/store/actions/postOrder';
import { useDispatch, useSelector } from 'react-redux';
import {
  CLOSE_MODAL,
  OPEN_MODAL_INGREDIENT,
} from '../../services/store/reducers/IngredientsSlice';

import appStyles from './app.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.ingredientsReducer.data);
  const addedIngredients = [data[0], data[4], data[5], data[4]];
  const [modal, setModal] = React.useState({ visible: false });

  function closeModal() {
    setModal({ visible: false });
    dispatch(CLOSE_MODAL());
  }

  function openModalOrder() {
    const addedIngredientsID = {
      ingredients: addedIngredients.map((el) => el._id),
    };
    setModal({ visible: true });
    dispatch(postOrder(addedIngredientsID));
  }

  function openModalIngredient(ingredient) {
    setModal({ visible: true });
    dispatch(OPEN_MODAL_INGREDIENT(ingredient));
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
      {modal.visible && <Modal closeModal={closeModal} />}
    </>
  );
}

export default App;
