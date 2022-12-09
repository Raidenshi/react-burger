import { useMemo } from 'react';
import { SocketOrders } from '../types/socketTypes';
import { useAppSelector } from './useApp';

export function useFeedOrderData(order: SocketOrders) {
  const ingredientsData = useAppSelector(
    (store) => store.ingredientsReducer.data
  );

  const orderIngredients = useMemo(
    () =>
      order?.ingredients.map((el) =>
        ingredientsData.find((ingredient) => ingredient._id == el)
      ),
    [order]
  );

  const calculatedPrice = useMemo(
    () => orderIngredients?.reduce((a: number, b: any) => a + b.price, 0),
    [orderIngredients]
  );

  const name = useMemo(
    () =>
      order?.name.length <= 60 ? order?.name : `${order?.name.slice(0, 56)}...`,
    [order]
  );

  const time = new Date(order?.createdAt).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return { orderIngredients, calculatedPrice, name, time };
}
