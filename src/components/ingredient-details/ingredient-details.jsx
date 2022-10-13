import React from 'react';
import PropTypes from 'prop-types';
import dataProps from '../../utils/types';

import ingredientStyles from './ingredient-details.module.css';

function IngredientDetails({ ingredient }) {
  return (
    <div className={ingredientStyles.container}>
      <p className="text text_type_main-large mt-10 mr-10 ml-10">
        Детали ингредиента
      </p>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className={`${ingredientStyles.image} mb-4`}
      />
      <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
      <div className={ingredientStyles.details}>
        <p className="text text_type_main-default text_color_inactive">{`Калории, ккал ${ingredient.calories}`}</p>
        <p className="text text_type_main-default text_color_inactive">{`Белки, г ${ingredient.proteins}`}</p>
        <p className="text text_type_main-default text_color_inactive">{`Жиры, г ${ingredient.fat}`}</p>
        <p className="text text_type_main-default text_color_inactive">{`Углеводы, г ${ingredient.carbohydrates}`}</p>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: dataProps,
};

export default IngredientDetails;
