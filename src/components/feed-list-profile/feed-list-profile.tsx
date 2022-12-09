import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
import { WS_PRIVATE_CONNECTION } from '../../services/store/reducers/socketSlice';
import LoadingSpinner from '../../ui/loading-spinner/loading-spinner';
import { getCookie } from '../../utils/cookie';
import FeedItem from '../feed-item/feed-item';

import styles from './feed-list-profile.module.css';

function FeedListProfile() {
  const dispatch = useAppDispatch();
  const socket = useAppSelector((store) => store.socketReducer);
  const data = useAppSelector((store) => store.socketReducer.privateData);

  useEffect(() => {
    if (!socket.privateConnected && !socket.privateConnecting) {
      dispatch(
        WS_PRIVATE_CONNECTION(
          `wss://norma.nomoreparties.space/orders?token=${
            getCookie('token')?.split(' ')[1]
          }`
        )
      );
    }
  }, []);

  const feedItems = data?.orders.map((order) => (
    <FeedItem order={order} key={order.number} profile={true} />
  ));

  return data ? (
    <div className={styles.container}>{feedItems}</div>
  ) : (
    <LoadingSpinner />
  );
}

export default FeedListProfile;
