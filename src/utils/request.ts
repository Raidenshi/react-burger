export const request = async (url: string, options?: any): Promise<any> => {
  const result = await fetch(url, options);
  if (!result.ok) {
    const error = await result.json();
    throw new Error(error.message);
  } else return result.json();
};
