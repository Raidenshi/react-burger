import { NavLink, Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useApp';
import { logOut } from '../../services/store/actions/auth';
import { LOGOUT } from '../../services/store/reducers/userSlice';
import { isActiveLink } from '../../utils/isActiveLink';

import styles from './profile-page.module.css';

function ProfilePage() {
  const dispatch = useAppDispatch();
  async function handleLogout(): Promise<void> {
    dispatch(logOut());
    dispatch(LOGOUT());
  }

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <NavLink
          style={isActiveLink}
          to="/profile/"
          className={`${styles.button} text text_type_main-medium`}
        >
          Профиль
        </NavLink>
        <NavLink
          style={isActiveLink}
          to="/profile/orders"
          className={`${styles.button} text text_type_main-medium`}
        >
          История заказов
        </NavLink>
        <button
          onClick={handleLogout}
          className={`${styles.button} text text_type_main-medium`}
        >
          Выход
        </button>
        <span
          className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
      <Outlet />
    </div>
  );
}

export default ProfilePage;
