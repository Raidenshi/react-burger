import React from 'react';
import { useAppSelector } from '../../hooks/useApp';
import FeedItem from '../feed-item/feed-item';

import styles from './feed-list.module.css';

function FeedList() {
  const data = useAppSelector((store) => store.socketReducer.data);
  const feedItems = data?.orders.map((order) => <FeedItem order={order} />);

  return <div className={styles.container}>{feedItems}</div>;
}

export default FeedList;
