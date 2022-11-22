export interface IOrder {
  success: boolean;
  name: string;
  order: { number: number };
}

export interface IOrderState {
  orderRequest: boolean;
  orderFailed: boolean;
  orderError: string;
  order: IOrder | null;
}
