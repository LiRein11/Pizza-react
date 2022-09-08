import React, { useEffect, useState } from 'react';

import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoadign] = useState(true);

  useEffect(() => {
    fetch('https://6319b9746b4c78d91b41db16.mockapi.io/items')
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoadign(false);
      });
    window.scrollTo(0, 0); // Чтобы при первом рендере нас кидало вверх (избавление от скролла при переходе на страницу с другой страницы)
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
