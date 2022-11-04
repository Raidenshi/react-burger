import React from 'react';
import AppHeaderButton from '../app-header-button/app-header-button';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import headerStyles from './app-header.module.css';

function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.container}>
        <nav className={headerStyles.navbar}>
          <AppHeaderButton text="Конструктор" to="/">
            <BurgerIcon type="primary" />
          </AppHeaderButton>
          <AppHeaderButton text="Лента заказов" to="*">
            <ListIcon type="secondary" />
          </AppHeaderButton>
        </nav>
        <a className={headerStyles.logo}>
          <Logo />
        </a>
        <AppHeaderButton text="Личный кабинет" to="/profile">
          <ProfileIcon type="secondary" />
        </AppHeaderButton>
      </div>
    </header>
  );
}

export default AppHeader;
