import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
} // Интерфейс типизирует объект. Его используют обычно для типизации стейта(но не обязательно, можно и тайпом всё делать). Также обычно используют для типизации больших данных (мейби вложенных и тд.)

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItem(state, action) {
    //   state.items.push(action.payload);
    //   state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price, 0);
    // },
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
    },
    removeItem(state, action:PayloadAction<string>) {
      // const findItem = state.items.find((obj) => obj.id === action.payload);
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      
      // state.totalPrice = state.totalPrice - state.items.price * state.items.count;
    },
    minusItem(state, action:PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      
      if (findItem) {
        if (findItem.count > 0) {
          findItem.count--;
          state.totalPrice = state.totalPrice - findItem.price;
        }
      }
      // if(state.items.id<0){
      //   removeItem(state.items.id)
      // }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
