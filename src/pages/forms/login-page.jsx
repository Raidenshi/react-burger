import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { login } from '../../services/store/actions/auth';

import styles from './forms.module.css';

function LoginPage() {
  const user = useSelector((store) => store.userReducer.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const { form, handleChange } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  const fromPage = location.state?.from?.pathname || '/';
  if (user) {
    if (fromPage === '/order') {
      return <Navigate to={'/'} />;
    }
    return <Navigate to={fromPage} />;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <span className="text text_type_main-medium mb-6">Вход</span>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          extraClass="mb-6"
          value={form.email}
          name={'email'}
          onChange={handleChange}
        />
        <Input
          type={'password'}
          placeholder={'Password'}
          icon={'ShowIcon'}
          extraClass="mb-6"
          value={form.password}
          name={'password'}
          onChange={handleChange}
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
          Вы - новый пользователь?{' '}
          <Link to="/register" className={styles.link}>
            Зарегестрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{' '}
          <Link to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
