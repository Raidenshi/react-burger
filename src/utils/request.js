export const request = async (url, options) => {
  const result = await fetch(url, options);
  if (!result.ok) {
    const error = await result.json();
    throw new Error(error.message);
  } else return result.json();
};
