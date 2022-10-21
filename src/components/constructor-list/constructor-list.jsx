import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { UPDATE_CONSTRUCTOR_LIST } from '../../services/store/reducers/IngredientsSlice';

import styles from './constructor-list.module.css';
import ConstrctorListCard from '../constructor-list-card/constructor-list-card';

function ConstructorList({ border }) {
  const dispatch = useDispatch();
  const addedIngredients = useSelector(
    (store) => store.ingredientsReducer.addedIngredients
  );

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = addedIngredients[dragIndex];
      const newCards = [...addedIngredients];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);
      dispatch(UPDATE_CONSTRUCTOR_LIST(newCards));
    },
    [addedIngredients, dispatch]
  );

  return (
    <ul className={styles.list} style={{ border: border }}>
      {addedIngredients.map((item, index) => (
        <ConstrctorListCard
          key={`${item._id}${index}`}
          index={index}
          item={item}
          moveCard={moveCard}
        />
      ))}
    </ul>
  );
}

export default ConstructorList;

ConstructorList.propTypes = {
  border: PropTypes.string.isRequired,
};
