import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
import { useFeedOrderData } from '../../hooks/useFeedOrderData';
import {
  WS_CONNECTION,
  WS_PRIVATE_CONNECTION,
} from '../../services/store/reducers/socketSlice';
import { IIngredient } from '../../types/ingredientsTypes';
import { Status, StatusColor } from '../../types/statusEnums';
import IconImage from '../../ui/icon-image/icon-image';
import LoadingSpinner from '../../ui/loading-spinner/loading-spinner';
import { getCookie } from '../../utils/cookie';

import styles from './feed-item-modal.module.css';

function FeedItemModal() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const socket = useAppSelector((store) => store.socketReducer);
  let order = null;

  if (location.pathname.includes('/feed')) {
    order = socket.data?.orders.find((order) => order._id === id);
  } else {
    order = socket.privateData?.orders.find((order) => order._id === id);
  }
  const { time, calculatedPrice, orderIngredients } = useFeedOrderData(order!);

  useEffect(() => {
    if (location.pathname.includes('/feed')) {
      if (!socket.isConnected && !socket.isConnecting) {
        dispatch(WS_CONNECTION('wss://norma.nomoreparties.space/orders/all'));
      }
    } else {
      if (!socket.isConnected && !socket.isConnecting) {
        dispatch(
          WS_PRIVATE_CONNECTION(
            `wss://norma.nomoreparties.space/orders?token=${
              getCookie('token')?.split(' ')[1]
            }`
          )
        );
      }
    }
  }, []);

  function itemCounter(item: IIngredient): number {
    return orderIngredients.filter((ingredient) => ingredient?._id == item._id)
      .length;
  }

  const orderSet = useMemo(
    () => Array.from(new Set(orderIngredients)),
    [orderIngredients]
  );

  const items = useMemo(
    () =>
      orderSet.map((ingredient, i) => (
        <div key={i} className={` mb-4 ${styles.item}`}>
          <IconImage ingredient={ingredient!} />
          <p
            className={`${styles.item_name} text text_type_main-default ml-4 mr-4`}
          >
            {ingredient?.name}
          </p>
          <div className={styles.item_price}>
            <span className="text text_type_digits-default mr-2">
              {`${itemCounter(ingredient!)} X ${ingredient?.price}`}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      )),
    [orderIngredients]
  );

  return (
    <div className={styles.container}>
      {order ? (
        <>
          <p className={`text text_type_digits-default mb-10 ${styles.number}`}>
            #{order.number}
          </p>
          <p className={`${styles.name} text text_type_main-medium mb-3`}>
            {order.name}
          </p>
          <p
            className={`text text_type_main-small text_color_${
              StatusColor[order.status]
            } mb-15`}
          >
            {Status[order.status]}
          </p>
          <p className="text text_type_main-medium mb-6">Состав:</p>
          <div className={`mb-10 ${styles.items_container}`}>{items}</div>
          <div className={styles.time_price}>
            <time className='"text text_type_digits-default text_color_inactive'>
              {time}
            </time>
            <div className={styles.price}>
              <p className="text text_type_digits-default mr-2">
                {calculatedPrice}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default FeedItemModal;
