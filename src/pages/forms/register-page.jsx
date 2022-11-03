import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './forms.module.css';

function RegisterPage() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <span className="text text_type_main-medium mb-6">Регистрация</span>
        <Input type={'text'} placeholder={'Имя'} extraClass="mb-6" />
        <Input type={'email'} placeholder={'E-mail'} extraClass="mb-6" />
        <Input
          type={'password'}
          placeholder={'Password'}
          icon={'ShowIcon'}
          extraClass="mb-6"
        />
        <Button type="primary" size="medium" extraClass="mb-20">
          Зарегистрироваться
        </Button>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Уже зарегистрированы ? <Link>Войти</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
