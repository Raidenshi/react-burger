import React from 'react';
import PropTypes from 'prop-types';
import IngredientTabs from '../ingredient-tabs/ingredient-tabs';
import IngredientsCard from '../ingredients-card/ingredients-card';
import dataProps from '../../utils/types';
import ingredientsStyles from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';

function BurgerIngredients({ openModal }) {
  const data = useSelector((store) => store.ingredientsReducer.data);
  return (
    <div className={ingredientsStyles.container}>
      <h1 className="pt-10 pb-5  text text_type_main-large">Соберите бургер</h1>
      <IngredientTabs />
      <div className={`${ingredientsStyles.overflow} mt-10`}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <ul className={ingredientsStyles.ingredients}>
          {data.map((el) => {
            if (el.type === 'bun')
              return (
                <IngredientsCard
                  element={el}
                  key={el._id}
                  openModal={openModal}
                />
              );
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10">Соусы</h2>
        <ul className={ingredientsStyles.ingredients}>
          {data.map((el) => {
            if (el.type === 'sauce')
              return (
                <IngredientsCard
                  element={el}
                  key={el._id}
                  openModal={openModal}
                />
              );
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10">Начинки</h2>
        <ul className={ingredientsStyles.ingredients}>
          {data.map((el) => {
            if (el.type === 'main')
              return (
                <IngredientsCard
                  element={el}
                  key={el._id}
                  openModal={openModal}
                />
              );
          })}
        </ul>
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;
