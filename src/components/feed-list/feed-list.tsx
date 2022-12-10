import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
import {
  WS_CLOSE_CONNECTION,
  WS_CONNECTION,
} from '../../services/store/reducers/socketSlice';
import LoadingSpinner from '../../ui/loading-spinner/loading-spinner';
import FeedItem from '../feed-item/feed-item';

import styles from './feed-list.module.css';

function FeedList() {
  const dispatch = useAppDispatch();
  const socket = useAppSelector((store) => store.socketReducer);
  const data = useAppSelector((store) => store.socketReducer.data);

  useEffect(() => {
    if (!socket.isConnected && !socket.isConnecting) {
      dispatch(WS_CONNECTION('wss://norma.nomoreparties.space/orders/all'));
    }
    return () => {
      dispatch(WS_CLOSE_CONNECTION());
    };
  }, []);

  const feedItems = data?.orders.map((order) => (
    <FeedItem order={order} key={order.number} />
  ));

  return data ? (
    <div className={styles.container}>{feedItems}</div>
  ) : (
    <LoadingSpinner />
  );
}

export default FeedList;
