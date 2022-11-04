import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileForm from '../../components/profile-form/profile-form';
import { isActiveLink } from '../../utils/isActiveLink';

import styles from './profile-page.module.css';

function ProfilePage() {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <NavLink
          style={isActiveLink}
          to="/profile"
          className={`${styles.button} text text_type_main-medium`}
        >
          Профиль
        </NavLink>
        <NavLink
          style={isActiveLink}
          to="/*"
          className={`${styles.button} text text_type_main-medium`}
        >
          История заказов
        </NavLink>
        <NavLink
          style={isActiveLink}
          to="/*"
          className={`${styles.button} text text_type_main-medium`}
        >
          Выход
        </NavLink>
        <span
          className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
      <ProfileForm />
    </div>
  );
}

export default ProfilePage;
