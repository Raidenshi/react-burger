export const request = async (url, options) => {
  const result = await fetch(url, options);
  if (!result.ok) {
    throw new Error(`Error ${result.status} occurred!`);
  } else return result.json();
};
