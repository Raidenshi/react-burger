import { IIngredient } from '../types/ingredientsTypes';

export const isType = (type: string, item: IIngredient): boolean => {
  return item.type === type;
};
