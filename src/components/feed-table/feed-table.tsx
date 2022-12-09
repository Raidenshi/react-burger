import React, { useMemo } from 'react';
import { useAppSelector } from '../../hooks/useApp';

import styles from './feed-table.module.css';

function FeedTable() {
  const data = useAppSelector((store) => store.socketReducer.data);

  const readyOrders = useMemo(
    () =>
      data?.orders.map((order) => {
        if (order.status == 'done') {
          return (
            <li
              className="text text_type_digits-default text_color_success"
              key={order.number}
            >
              {order.number}
            </li>
          );
        }
      }),
    [data]
  );
  const pendingOrders = useMemo(
    () =>
      data?.orders.map((order) => {
        if (order.status == 'pending' || order.status == 'created') {
          return (
            <li className="text text_type_digits-default" key={order.number}>
              {order.number}
            </li>
          );
        }
      }),
    [data]
  );

  return (
    <div className={styles.container}>
      <div className={styles.orders_table}>
        <div className={styles.table}>
          <p className="text text_type_main-medium pb-6">Готовы:</p>
          <ul className={styles.list}>{readyOrders}</ul>
        </div>
        <div className={styles.table}>
          <p className="text text_type_main-medium pb-6">В работе:</p>
          <ul className={styles.list}>{pendingOrders}</ul>
        </div>
      </div>
      <p className="text text_type_main-medium mt-15">
        Выполнено за всё время:
      </p>
      <p className={`${styles.number} text text_type_digits-large mb-15`}>
        {data?.total}
      </p>
      <p className="text text_type_main-medium">Выполнено за сегодня:</p>
      <p className={`${styles.number} text text_type_digits-large`}>
        {data?.totalToday}
      </p>
    </div>
  );
}

export default FeedTable;
