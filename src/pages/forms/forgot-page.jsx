import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleInputChange } from '../../utils/handleInputChange';

import styles from './forms.module.css';

function ForgotPage() {
  const [form, setForm] = useState({
    email: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

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
          value={form.email}
          onChange={(e) => handleInputChange(e, form, setForm)}
        />
        <Button type="primary" size="medium" extraClass="mb-20">
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
