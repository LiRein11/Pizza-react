import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setSort} from '../redux/slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const {categoryId, sort} = useSelector((state) => state.filter);
  console.log(categoryId);

  const { searchValue } = useContext(SearchContext);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoadign] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  // const [categoriesId, setCategoriesId] = useState(0);
  // const [sortId, setSortId] = useState({
  //   name: 'популярности',
  //   sortProperty: 'rating',
  // });

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  };

  const onChangeSelect = (id) => {
    dispatch(setSort(id));
  };

  useEffect(() => {
    setIsLoadign(true);

    const categorySort = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
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
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

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
        <Categories value={categoryId} onChangeCategory={(id) => onChangeCategory(id)} />
        <Sort value={sort} onChangeSelect={(id) => onChangeSelect(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : items}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
