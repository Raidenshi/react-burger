import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_INGREDIENT } from '../../services/store/reducers/IngredientsSlice';
import ConstructorList from '../constructor-list/constructor-list';
import { v4 as uuidv4 } from 'uuid';
import constructorStyles from './burger-constructor.module.css';

function BurgerConstructor({ openModal }) {
  const dispatch = useDispatch();
  const [{ border }, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop(item) {
      dispatch(ADD_INGREDIENT({ ...item.element, uniqueID: uuidv4() }));
    },
    collect: (monitor) => ({
      border: monitor.canDrop() ? '2px solid #4c4cff' : '2px solid transparent',
    }),
  }));

  const addedIngredients = useSelector(
    (store) => store.ingredientsReducer.addedIngredients
  );

  const calculatedPrice = useMemo(
    () => addedIngredients.reduce((a, b) => a + b.price, 0),
    [addedIngredients]
  );

  return (
    <div className={constructorStyles.container} ref={drop}>
      <ConstructorList border={border} />
      <div className={constructorStyles.order}>
        <div className="mr-10">
          <span className="text text_type_digits-medium mr-2">
            {calculatedPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="medium"
          htmlType="button"
          onClick={openModal}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
