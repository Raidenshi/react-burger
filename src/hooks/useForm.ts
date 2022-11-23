import { useState } from 'react';
import { IForm } from '../types/formTypes';

export function useForm(inputValues: IForm) {
  const [form, setForm] = useState<IForm>(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };
  return { form, handleChange, setForm };
}
