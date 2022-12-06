import React from 'react';
import AppHeaderButton from '../app-header-button/app-header-button';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import headerStyles from './app-header.module.css';
import { Link } from 'react-router-dom';

function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.container}>
        <nav className={headerStyles.navbar}>
          <AppHeaderButton text="Конструктор" to="/">
            <BurgerIcon type="primary" />
          </AppHeaderButton>
          <AppHeaderButton text="Лента заказов" to="/feed">
            <ListIcon type="secondary" />
          </AppHeaderButton>
        </nav>
        <Link to={'/'} className={headerStyles.logo}>
          <Logo />
        </Link>
        <AppHeaderButton text="Личный кабинет" to="/profile">
          <ProfileIcon type="secondary" />
        </AppHeaderButton>
      </div>
    </header>
  );
}

export default AppHeader;
