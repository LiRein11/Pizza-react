import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';
import { Pizza, PizzaSLiceState, Status } from './types';

// type FetchPizzasArgs = Record<string, string>;

const initialState: PizzaSLiceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

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

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
