import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import cardStyles from './ingridients-card.module.css';

function IngridientsCard({ element }) {
  return (
    <li className={`mt-6 mb-8 ml-4 mr-4 ${cardStyles.card}`}>
      <img src={element.image} alt="" className="mr-4 ml-4" />
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

export default IngridientsCard;
