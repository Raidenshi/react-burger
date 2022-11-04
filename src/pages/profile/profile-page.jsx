import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

import styles from './profile-page.module.css';

function ProfilePage() {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <button className={`${styles.button} text text_type_main-medium`}>
          Профиль
        </button>
        <button className={`${styles.button} text text_type_main-medium`}>
          История заказов
        </button>
        <button className={`${styles.button} text text_type_main-medium`}>
          Выход
        </button>
        <span
          className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
      <form>
        <Input extraClass="mb-6" icon={'EditIcon'} placeholder={'Имя'} />
        <Input extraClass="mb-6" icon={'EditIcon'} placeholder={'Логин'} />
        <Input icon={'EditIcon'} placeholder={'Пароль'} />
      </form>
    </div>
  );
}

export default ProfilePage;
