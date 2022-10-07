import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import cardStyles from './ingredients-card.module.css';

function IngredientsCard({ element }) {
  return (
    <li className={`mt-6 mb-8 ml-4 mr-4 ${cardStyles.card}`}>
      <img
        src={element.image}
        alt=""
        className={`mr-4 ml-4 ${cardStyles.image}`}
      />
      <div className="mt-1 mb-1">
        <span className="text text_type_digits-default mr-3">
          {element.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <span className={`text text_type_main-small ${cardStyles.name}`}>
        {element.name}
      </span>
    </li>
  );
}

IngredientsCard.propTypes = {
  element: PropTypes.shape({
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

export default IngredientsCard;
