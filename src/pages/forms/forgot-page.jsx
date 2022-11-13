import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { passwordForgotRequest } from '../../services/store/actions/auth';

import styles from './forms.module.css';

function ForgotPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.userReducer.user);
  const { form, handleChange } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(passwordForgotRequest(form)).then(() => {
      navigate('/reset-password');
    });
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
          type={'email'}
          placeholder={'Укажите e-mail'}
          extraClass="mb-6"
          name={'email'}
          value={form.email || ''}
          onChange={handleChange}
        />
        <Button
          type="primary"
          size="medium"
          extraClass="mb-20"
          htmlType="submit"
        >
          Восстановить
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

export default ForgotPage;
