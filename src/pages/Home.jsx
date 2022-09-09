import React, { useEffect, useState } from 'react';

import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoadign] = useState(true);
  const [categoriesId, setCategoriesId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortId, setSortId] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  useEffect(() => {
    setIsLoadign(true);

    const categorySort = categoriesId > 0 ? `category=${categoriesId}` : '';
    const sortBy = sortId.sortProperty.replace('-', '');
    const order = sortId.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://6319b9746b4c78d91b41db16.mockapi.io/items?page=${currentPage}&limit=4&${categorySort}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoadign(false);
      });
    window.scrollTo(0, 0); // Чтобы при первом рендере нас кидало вверх (избавление от скролла при переходе на страницу с другой страницы)
  }, [categoriesId, sortId, searchValue, currentPage]);

  const items = pizzas
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   }
    //   return false;
    // })  // Фильтрация по поиску пицц и вывод массива пицц через React.js (но если массив не статичный, то нужно с беком работать)
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoriesId} onChangeCategory={(id) => setCategoriesId(id)} />
        <Sort value={sortId} onChangeSelect={(id) => setSortId(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : items}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
