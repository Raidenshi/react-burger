import React from 'react';
import { Link } from 'react-router-dom';
import pepega from '../../images/Pepega.png';

import styles from './page-404.module.css';

function Page404() {
  return (
    <div className={styles.container}>
      <img src={pepega} alt="pepega" className="mt-20" />
      <p className="text text_type_main-large mt-6">Страница не найдена</p>
      <Link to="/" className={`${styles.link} text text_type_main-medium mt-6`}>
        Вернуться на главную
      </Link>
    </div>
  );
}

export default Page404;
