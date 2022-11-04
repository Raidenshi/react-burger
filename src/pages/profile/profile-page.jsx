import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useSelector } from 'react-redux';

import styles from './profile-page.module.css';

function ProfilePage() {
  const user = useSelector((store) => store.userReducer.user);

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
        <Input
          extraClass="mb-6"
          icon={'EditIcon'}
          placeholder={'Имя'}
          type={'text'}
          value={user.name}
          disabled={true}
        />
        <Input
          extraClass="mb-6"
          icon={'EditIcon'}
          placeholder={'Логин'}
          type={'email'}
          value={user.email}
          disabled={true}
        />
        <Input
          icon={'EditIcon'}
          placeholder={'Пароль'}
          type={'password'}
          disabled={true}
        />
      </form>
    </div>
  );
}

export default ProfilePage;
