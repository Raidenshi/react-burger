import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { handleInputChange } from '../../utils/handleInputChange';

import styles from './forms.module.css';

function ResetPage() {
  const user = useSelector((store) => store.userReducer.user);
  const [form, setForm] = useState({
    password: '',
    token: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <span className="text text_type_main-medium mb-6">
          Восстановление пароля
        </span>
        <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
          icon={'ShowIcon'}
          extraClass="mb-6"
          value={form.password}
          name={'password'}
          onChange={(e) => handleInputChange(e, form, setForm)}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          extraClass="mb-6"
          value={form.token}
          name={'token'}
          onChange={(e) => handleInputChange(e, form, setForm)}
        />
        <Button
          type="primary"
          size="medium"
          extraClass="mb-20"
          htmlType="submit"
        >
          Войти
        </Button>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль?{' '}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ResetPage;
