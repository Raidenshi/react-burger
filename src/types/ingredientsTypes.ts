export interface IIngredient {
  _id: string;
  uniqueID?: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IIngredientsState {
  dataRequest: boolean;
  dataFailed: boolean;
  dataError: string;
  data: IIngredient[];
  addedIngredients: IIngredient[];
  currentIngredient: IIngredient | null;
}
