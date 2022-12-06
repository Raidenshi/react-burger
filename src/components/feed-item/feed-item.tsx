import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo } from 'react';
import { useAppSelector } from '../../hooks/useApp';
import { SocketOrders } from '../../types/socketTypes';

import styles from './feed-item.module.css';

function FeedItem({ order }: { order: SocketOrders }) {
  const ingredientsData = useAppSelector(
    (store) => store.ingredientsReducer.data
  );

  const orderIngredients = useMemo(
    () =>
      order.ingredients.map((el) =>
        ingredientsData.find((ingredient) => ingredient._id == el)
      ),
    [order]
  );

  const calculatedPrice = useMemo(
    () => orderIngredients.reduce((a: number, b: any) => a + b.price, 0),
    [orderIngredients]
  );

  const images = orderIngredients.map((ingredient, i) => {
    return (
      <img
        key={i}
        alt={ingredient?.name}
        src={ingredient?.image}
        className={styles.image}
      />
    );
  });

  const name = useMemo(
    () =>
      order.name.length <= 40 ? order.name : `${order.name.slice(0, 36)}...`,
    [order]
  );

  return (
    <div className={`${styles.card} mb-4`}>
      <div className={`${styles.number} mb-6`}>
        <p className="text text_type_digits-default">{`#${order.number}`}</p>
        <time
          className="text text_type_digits-default text_color_inactive"
          dateTime={order.createdAt}
        >
          {order.createdAt}
        </time>
      </div>
      <p className="text text_type_main-medium mb-6">{name}</p>
      <div className={styles.images_price}>
        <div className={styles.images}>{images}</div>
        <div className={styles.price}>
          <span className="mr-2 text text_type_digits-default">
            {calculatedPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default FeedItem;
