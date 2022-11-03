import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './forms.module.css';

function ResetPage() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <span className="text text_type_main-medium mb-6">
          Восстановление пароля
        </span>
        <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
          icon={'ShowIcon'}
          extraClass="mb-6"
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          extraClass="mb-6"
        />
        <Button type="primary" size="medium" extraClass="mb-20">
          Войти
        </Button>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль ? <Link>Войти</Link>
        </p>
      </form>
    </div>
  );
}

export default ResetPage;
