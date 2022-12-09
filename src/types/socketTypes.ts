export interface SocketOrders {
  ingredients: string[];
  _id: string;
  status: 'created' | 'pending' | 'done' | 'canceled';
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface SocketResponse {
  success: string;
  orders: SocketOrders[];
  total: number;
  totalToday: number;
}

export interface SocketState {
  isConnecting: boolean;
  isConnected: boolean;

  data: SocketResponse | null;

  privateConnecting: boolean;
  privateConnected: boolean;

  privateData: SocketResponse | null;
}
