import React from 'react';

import styles from './feed-item-page.module.css';

function FeedItemPage({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}

export default FeedItemPage;
