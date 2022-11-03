export const handleInputChange = (event, form, setForm) => {
  const name = event.target.name;
  const value = event.target.value;
  setForm({
    ...form,
    [name]: value,
  });
};
