import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { IForm } from '../../types/formTypes';

interface IProfileFormInput {
  placeholder: string;
  type: 'password' | 'text' | 'email' | undefined;
  name: string;
  form: IForm;
  setForm: React.Dispatch<React.SetStateAction<IForm>>;
  handleInputChange: any;
  value: string;
}

function ProfileFormInput({
  placeholder,
  type,
  name,
  form,
  setForm,
  handleInputChange,
  value,
}: IProfileFormInput) {
  const ref = React.useRef<HTMLInputElement>(null!);
  const [disabled, setDisabled] = React.useState<boolean>(true);

  const onIconClick = () => {
    setTimeout(() => ref.current.focus(), 0);
    setDisabled(!disabled);
    if (name === 'password') {
      setForm({ ...form, password: '' });
    }
  };

  const onBlur = () => {
    setDisabled(!disabled);
    if (name === 'password' && value === '') {
      setForm({ ...form, password: '********' });
    }
  };

  return (
    <Input
      ref={ref}
      extraClass="mb-6"
      icon={disabled ? 'EditIcon' : 'CloseIcon'}
      disabled={disabled}
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      onIconClick={onIconClick}
      onBlur={onBlur}
      onChange={handleInputChange}
    />
  );
}

export default ProfileFormInput;
