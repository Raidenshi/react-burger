import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { ADD_INGREDIENT } from '../../services/store/reducers/IngredientsSlice';
import ConstructorList from '../constructor-list/constructor-list';
import constructorStyles from './burger-constructor.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
import { IIngredient } from '../../types/ingredientsTypes';

function BurgerConstructor({ openModal }: { openModal: () => void }) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [{ border }, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop(item: { element: IIngredient }) {
      dispatch(ADD_INGREDIENT(item.element));
    },
    collect: (monitor) => ({
      border: monitor.canDrop() ? '2px solid #4c4cff' : '2px solid transparent',
    }),
  }));

  const addedIngredients = useAppSelector(
    (store) => store.ingredientsReducer.addedIngredients
  );

  const calculatedPrice = useMemo(
    () => addedIngredients.reduce((a: number, b: any) => a + b.price, 0),
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
        <Link to="/order" state={{ background: location }}>
          <Button
            type="primary"
            size="medium"
            htmlType="button"
            onClick={openModal}
            disabled={addedIngredients.length < 1}
          >
            Оформить заказ
          </Button>
        </Link>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
