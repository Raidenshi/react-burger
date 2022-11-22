import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { passwordResetRequest } from '../../services/store/actions/auth';

import styles from './forms.module.css';

function ResetPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.userReducer.user);
  const resettingPassword = useAppSelector(
    (store) => store.userReducer.resettingPassword
  );
  const { form, handleChange } = useForm({});

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(passwordResetRequest(form));
  };

  if (user || !resettingPassword) {
    return <Navigate to="/forgot-password" />;
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
          value={form.password || ''}
          name={'password'}
          onChange={handleChange}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          extraClass="mb-6"
          value={form.token || ''}
          name={'token'}
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
