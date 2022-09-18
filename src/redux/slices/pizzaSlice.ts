import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

// type FetchPizzasArgs = Record<string, string>;

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSLiceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSLiceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

export type SearchPizzaParams = {
  sortBy: string;
  categoryId: string;
  order: string;
  search: string;
  currentPage: string;
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { categoryId, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>( // В get передавать пиццы не обязательно
      `https://6319b9746b4c78d91b41db16.mockapi.io/items?page=${currentPage}&limit=4&${categoryId}&sortBy=${sortBy}&order=${order}${search}`,
    ); // Отправь запрос
    return data; // Верни ответ
  },
); // Асинхронный экшкен (action)

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = []; // Перед отправкой запроса очищаем старые пиццы
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload; // Добавляем пиццы
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = []; // При ошибке очищаем пиццы
    });
  },

  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = []; // Перед отправкой запроса очищаем старые пиццы
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload; // Добавляем пиццы
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = 'error';
  //     state.items = []; // При ошибке очищаем пиццы
  //   },
  // }, // В экстра редюсеры передается логика, не связанная с обычными выполнениями каких-то действий. Сюда идут например асинхронные экшены, какие-то специфичные ключи, специфичные типы экшена и тд. fullfiled значит то, что если успешно выполняется запрос, то тогда делается что-то. Другие действия выполняются также, если загрузка идёт, если ошибка и если успешно. Эта конструкция замена конструкции try/catch. Юзается это без тс, с тс как юзать выше пример.
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
