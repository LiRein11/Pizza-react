import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';

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
