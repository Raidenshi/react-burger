import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './forms.module.css';

function LoginPage() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <span className="text text_type_main-medium mb-6">Вход</span>
        <Input type={'email'} placeholder={'E-mail'} extraClass="mb-6" />
        <Input
          type={'password'}
          placeholder={'Password'}
          icon={'ShowIcon'}
          extraClass="mb-6"
        />
        <Button type="primary" size="medium" extraClass="mb-20">
          Войти
        </Button>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы - новый пользователь ? <Link>Зарегестрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль ? <Link>Восстановить пароль</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
