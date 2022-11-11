import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { register } from '../../services/store/actions/auth';

import styles from './forms.module.css';

function RegisterPage() {
  const user = useSelector((store) => store.userReducer.user);
  const dispatch = useDispatch();
  const { form, handleChange } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(form));
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <span className="text text_type_main-medium mb-6">Регистрация</span>
        <Input
          type={'text'}
          placeholder={'Имя'}
          value={form.name}
          extraClass="mb-6"
          name={'name'}
          onChange={handleChange}
        />
        <Input
          type={'email'}
          placeholder={'E-mail'}
          value={form.email}
          extraClass="mb-6"
          name={'email'}
          onChange={handleChange}
        />
        <Input
          type={'password'}
          placeholder={'Password'}
          value={form.password}
          icon={'ShowIcon'}
          extraClass="mb-6"
          name={'password'}
          onChange={handleChange}
        />
        <Button
          type="primary"
          size="medium"
          extraClass="mb-20"
          htmlType="submit"
        >
          Зарегистрироваться
        </Button>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Уже зарегистрированы?{' '}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
