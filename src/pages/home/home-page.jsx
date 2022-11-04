import React from 'react';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import Modal from '../../components/modal/modal';
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

import styles from './home-page.module.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.userReducer.user);
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
    if (user) {
      dispatch(OPEN_MODAL('order'));
      dispatch(postOrder(addedIngredientsID));
    } else {
      navigate('/login');
    }
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
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients openModal={openModalIngredient} />
          <BurgerConstructor openModal={openModalOrder} />
        </DndProvider>
        {isVisible && <Modal closeModal={closeModal} />}
      </main>
    </>
  );
}

export default HomePage;
