import React, { useEffect } from 'react';
import FeedList from '../../components/feed-list/feed-list';
import FeedTable from '../../components/feed-table/feed-table';
import { useAppDispatch } from '../../hooks/useApp';
import { WS_CONNECTION } from '../../services/store/reducers/socketSlice';

import styles from './feed-page.module.css';

function FeedPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(WS_CONNECTION());
  });

  return (
    <>
      <h1 className={`${styles.title} text text_type_main-large`}>
        Лента заказов
      </h1>
      <div className={styles.container}>
        <FeedList />
        <FeedTable />
      </div>
    </>
  );
}

export default FeedPage;
