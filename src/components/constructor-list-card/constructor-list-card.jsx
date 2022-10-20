import React from 'react';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './constructor-list-card.module.css';

function ConstrctorListCard({ index, item, moveCard }) {
  const cardProps = {
    text: item.name,
    price: item.price,
    thumbnail: item.image,
  };
  return (
    <li className={styles.item}>
      <DragIcon type="primary" />
      <ConstructorElement {...cardProps} />
    </li>
  );
}

export default ConstrctorListCard;
