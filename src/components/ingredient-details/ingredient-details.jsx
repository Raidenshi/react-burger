import React from 'react';
import PropTypes from 'prop-types';

import ingredientStyles from './ingredient-details.module.css';

function IngredientDetails({ ingredient }) {
  return (
    <div className={ingredientStyles.container}>
      <p className="text text_type_main-large mt-10 mr-10 ml-10">
        Детали ингредиента
      </p>
      <img src={ingredient.image_large} alt="" className="mb-4" />
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
  ingredient: PropTypes.shape({
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
  }).isRequired,
};

export default IngredientDetails;
