import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import dataProps from '../../utils/types';

import cardStyles from './ingredients-card.module.css';

function IngredientsCard({ element, openModal }) {
  return (
    <li className={`mt-6 mb-8 ml-4 mr-4 ${cardStyles.card}`}>
      <img
        src={element.image}
        alt={element.name}
        className={`mr-4 ml-4 ${cardStyles.image}`}
        onClick={() => openModal(element)}
      />
      <div className="mt-1 mb-1">
        <span className="text text_type_digits-default mr-3">
          {element.price}
          <CurrencyIcon />
        </span>
      </div>
      <span className={`text text_type_main-small ${cardStyles.name}`}>
        {element.name}
      </span>
    </li>
  );
}

IngredientsCard.propTypes = {
  element: dataProps,
  openModal: PropTypes.func.isRequired,
};

export default IngredientsCard;
