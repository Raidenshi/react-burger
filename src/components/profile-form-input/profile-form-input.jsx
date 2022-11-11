import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React from 'react';

function ProfileFormInput({
  placeholder,
  type,
  name,
  form,
  setForm,
  handleInputChange,
  value,
}) {
  const ref = React.useRef();
  const [disabled, setDisabled] = React.useState(true);

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

ProfileFormInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  setForm: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
