export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
} // Интерфейс типизирует объект. Его используют обычно для типизации стейта(но не обязательно, можно и тайпом всё делать). Также обычно используют для типизации больших данных (мейби вложенных и тд.)
