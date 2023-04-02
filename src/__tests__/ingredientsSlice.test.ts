import ingredientReducer, {
  REQUEST_DATA,
  REQUEST_DATA_SUCCESS,
  REQUEST_DATA_FAILED,
  SET_CURRENT_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT,
  ADD_INGREDIENT,
  UPDATE_CONSTRUCTOR_LIST,
} from '../services/store/reducers/IngredientsSlice';
import { IIngredient, IIngredientsState } from '../types/ingredientsTypes';
import * as uuid from 'uuid';

jest.mock('uuid');
describe('utils', () => {
  it('test', () => {
    jest.spyOn(uuid, 'v4').mockReturnValue('mockedValue');
  });
});

const initialState: IIngredientsState = {
  dataRequest: false,
  dataFailed: false,
  dataError: '',
  data: [],

  addedIngredients: [],
  currentIngredient: null,
};

const dataMock: IIngredient[] = [
  {
    _id: '60d3b41abdacab0026a733c6',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
  },
  {
    _id: '60d3b41abdacab0026a733c6',
    name: 'Соус Space-X',
    type: 'sauce',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
  },
];

describe('ingredientsSlice', () => {
  it('should return default state', () => {
    const result = ingredientReducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  it('should change status with "REQUEST_DATA" action', () => {
    const state = ingredientReducer(initialState, REQUEST_DATA());

    expect(state.dataRequest).toEqual(true);
    expect(state.dataFailed).toEqual(false);
  });

  it('should change status and data with "REQUEST_DATA_SUCCESS" action', () => {
    const state = ingredientReducer(
      initialState,
      REQUEST_DATA_SUCCESS(dataMock)
    );

    expect(state.dataRequest).toEqual(false);
    expect(state.dataFailed).toEqual(false);
    expect(state.data).toEqual(dataMock);
  });

  it('should change status and error with "REQUEST_DATA_FAILED" action', () => {
    const state = ingredientReducer(initialState, REQUEST_DATA_FAILED('error'));

    expect(state.dataRequest).toEqual(false);
    expect(state.dataFailed).toEqual(true);
    expect(state.dataError).toEqual('error');
  });

  it('should set ingredient with "SET_CURRENT_INGRDIENT" action', () => {
    const state = ingredientReducer(
      initialState,
      SET_CURRENT_INGREDIENT(dataMock[0])
    );

    expect(state.currentIngredient).toEqual(dataMock[0]);
  });

  it('should delete ingredient with "CLEAR_CURRENT_INGREDIENT" action', () => {
    const state = ingredientReducer(initialState, CLEAR_CURRENT_INGREDIENT());

    expect(state.currentIngredient).toEqual(null);
  });

  it('should add 2 buns with "ADD_INGREDIENT" action', () => {
    const state = ingredientReducer(initialState, ADD_INGREDIENT(dataMock[0]));

    expect(state.addedIngredients).toEqual([dataMock[0], dataMock[0]]);
  });

  it('should add 1 non-bun with "ADD_INGREDIENT" action', () => {
    const state = ingredientReducer(initialState, ADD_INGREDIENT(dataMock[1]));

    expect(state.addedIngredients).toEqual([dataMock[1]]);
  });

  it('should update added ingredients with "UPDATE_CONSTRUCTOR_LIST" action', () => {
    const state = ingredientReducer(
      initialState,
      UPDATE_CONSTRUCTOR_LIST(dataMock)
    );

    expect(state.addedIngredients).toEqual(dataMock);
  });
});
