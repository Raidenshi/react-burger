import React from 'react';
import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import dataProps from '../../utils/types';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

import cardStyles from './ingredients-card.module.css';
import { Link } from 'react-router-dom';

function IngredientsCard({ element, openModal }) {
  const addedIngredients = useSelector(
    (store) => store.ingredientsReducer.addedIngredients
  );

  const count = React.useMemo(
    () => addedIngredients.filter((el) => element._id === el._id).length
  );

  const [{ opacity }, drag] = useDrag(() => ({
    type: 'ingredient',
    item: { element },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  }));

  return (
    <li className={`mt-6 mb-8 ml-4 mr-4 ${cardStyles.card}`}>
      <Link to={`/ingredient/${element._id}`}>
        <img
          src={element.image}
          alt={element.name}
          className={`mr-4 ml-4 ${cardStyles.image}`}
          onClick={() => openModal(element)}
          ref={drag}
          style={{ opacity: opacity }}
        />
      </Link>
      {count > 0 && <Counter count={count} size="default" />}
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
