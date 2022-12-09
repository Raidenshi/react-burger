import FeedList from '../../components/feed-list/feed-list';
import FeedTable from '../../components/feed-table/feed-table';

import styles from './feed-page.module.css';

function FeedPage() {
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
