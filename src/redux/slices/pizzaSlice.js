import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { categorySort, sortBy, order, search, currentPage } = params;
  const { data } = await axios.get(
    `https://6319b9746b4c78d91b41db16.mockapi.io/items?page=${currentPage}&limit=4&${categorySort}&sortBy=${sortBy}&order=${order}${search}`,
  ); // Отправь запрос
  return data; // Верни ответ
}); // Асинхронный экшкен (action)

const initialState = {
  items: [],
  status: 'loading', // loading | succes | error
};
const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = []; // Перед отправкой запроса очищаем старые пиццы
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload; // Добавляем пиццы 
      state.status = 'succes';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = []; // При ошибке очищаем пиццы
    },
  }, // В экстра редюсеры передается логика, не связанная с обычными выполнениями каких-то действий. Сюда идут например асинхронные экшены, какие-то специфичные ключи, специфичные типы экшена и тд. fullfiled значит то, что если успешно выполняется запрос, то тогда делается что-то. Другие действия выполняются также, если загрузка идёт, если ошибка и если успешно. Эта конструкция замена конструкции try/catch
});

export const selectPizzaData = (state) => state.pizza;

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
