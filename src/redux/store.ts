import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/slice';
import cart from './cart/slice';
import pizza from './pizza/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    // Редюсеры
    filter,
    cart,
    pizza,
  },
});

type FuncType = typeof store.getState;
export type RootState = ReturnType<FuncType>; // Глобальный(главный) стейт, в котором содержится типизация фильтрации, корзины, пиццы, все их стейты будут находиться внутри RootState. getState это весь редакст, эта функция возвращает весь стейт хранилища. Тайпоф просит тип этой функции. ReturnType переданную функцию и её содержимое превращает в тип 

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch  // Хук, который делает диспатч типизированным, чтобы он мог принимать асинхронные экшены.
