import React from 'react';
import PropTypes from 'prop-types';
import IngridientTabs from '../ingredient-tabs/ingredient-tabs';
import IngridientsCard from '../ingredients-card/ingredients-card';

import ingredientsStyles from './burger-ingredients.module.css';

function BurgerIngredients({ data, openModal }) {
  return (
    <div className={ingredientsStyles.container}>
      <h1 className="pt-10 pb-5  text text_type_main-large">Соберите бургер</h1>
      <IngridientTabs />
      <div className={`${ingredientsStyles.overflow} mt-10`}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <ul className={ingredientsStyles.ingredients} onClick={openModal}>
          {data.map((el) => {
            if (el.type === 'bun')
              return <IngridientsCard element={el} key={el._id} />;
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10">Соусы</h2>
        <ul className={ingredientsStyles.ingredients} onClick={openModal}>
          {data.map((el) => {
            if (el.type === 'sauce')
              return <IngridientsCard element={el} key={el._id} />;
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10">Начинки</h2>
        <ul className={ingredientsStyles.ingredients} onClick={openModal}>
          {data.map((el) => {
            if (el.type === 'main')
              return <IngridientsCard element={el} key={el._id} />;
          })}
        </ul>
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    }).isRequired
  ),
  openModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;
