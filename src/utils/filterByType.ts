import { IIngredient } from '../types/ingredientsTypes';

export const filterByType = (
  array: IIngredient[],
  type: string
): IIngredient[] => {
  return array.filter((item) => item.type === type);
};
