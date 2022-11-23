import React, { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
import PropTypes from 'prop-types';
import { UPDATE_CONSTRUCTOR_LIST } from '../../services/store/reducers/IngredientsSlice';

import styles from './constructor-list.module.css';
import ConstrctorListCard from '../constructor-list-card/constructor-list-card';

function ConstructorList({ border }: { border: string }) {
  const dispatch = useAppDispatch();
  const addedIngredients = useAppSelector(
    (store) => store.ingredientsReducer.addedIngredients
  );

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = addedIngredients[dragIndex];
      const newCards = [...addedIngredients];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);
      dispatch(UPDATE_CONSTRUCTOR_LIST(newCards));
    },
    [addedIngredients, dispatch]
  );

  const overflow = useMemo(() => {
    if (addedIngredients.length > 7) {
      return styles.overflow;
    }
    return '';
  }, [addedIngredients]);

  return (
    <ul className={`${styles.list} ${overflow}`} style={{ border: border }}>
      {addedIngredients.map((item, index) => (
        <ConstrctorListCard
          key={item.uniqueID}
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
