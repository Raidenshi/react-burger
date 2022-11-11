import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ingredientStyles from './ingredient-page.module.css';

function IngredientPage() {
  const { id } = useParams();
  const data = useSelector((store) => store.ingredientsReducer.data);
  let ingredient = useSelector(
    (store) => store.ingredientsReducer.currentIngredient
  );
  if (JSON.stringify(ingredient) === '{}') {
    ingredient = data.find((el) => el._id === id);
  }

  return (
    <div className={ingredientStyles.container}>
      {data.length && (
        <>
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
        </>
      )}
    </div>
  );
}

export default IngredientPage;
