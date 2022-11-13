import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { updateUser } from '../../services/store/actions/auth';
import ProfileFormInput from '../profile-form-input/profile-form-input';

function ProfileForm() {
  const user = useSelector((store) => store.userReducer.user);
  const dispatch = useDispatch();

  const initName = user.name;
  const initEmail = user.email;
  const initPass = '********';

  const { form, handleChange, setForm } = useForm({
    name: user.name,
    email: user.email,
    password: initPass,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let changedFields = {};

    if (form.name !== initName) {
      changedFields = { name: form.name };
    }
    if (form.email !== initEmail) {
      changedFields = { ...changedFields, email: form.email };
    }
    if (form.password !== initPass) {
      changedFields = { ...changedFields, password: form.password };
    }
    if (JSON.stringify(changedFields) !== '{}') {
      dispatch(updateUser(changedFields));
    }
  };

  const handleCancel = () => {
    setForm({
      name: user.name,
      email: user.email,
      password: initPass,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProfileFormInput
        placeholder={'Имя'}
        type={'text'}
        name={'name'}
        handleInputChange={handleChange}
        form={form}
        setForm={setForm}
        value={form.name}
      />
      <ProfileFormInput
        placeholder={'E-mail'}
        type={'email'}
        name={'email'}
        handleInputChange={handleChange}
        form={form}
        setForm={setForm}
        value={form.email}
      />
      <ProfileFormInput
        placeholder={'Пароль'}
        type={'password'}
        name={'password'}
        handleInputChange={handleChange}
        form={form}
        setForm={setForm}
        value={form.password}
      />
      <div>
        <Button htmlType="submit">Сохранить</Button>
        <Button
          type="secondary"
          size="small"
          htmlType="reset"
          onClick={handleCancel}
        >
          Отменить изменения
        </Button>
      </div>
    </form>
  );
}

export default ProfileForm;
