import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { selectPizzaData } from '../redux/pizza/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { SearchPizzaParams } from '../redux/pizza/types';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  // const { searchValue } = useContext(SearchContext);

  // const [categoriesId, setCategoriesId] = useState(0);
  // const [sortId, setSortId] = useState({
  //   name: 'популярности',
  //   sortProperty: 'rating',
  // });

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // const onChangeSelect = (id) => {
  //   dispatch(setSort(id));
  // };

  const getPizzas = async () => {
    const categorySort = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    //   fetch(
    //     `https://6319b9746b4c78d91b41db16.mockapi.io/items?page=${currentPage}&limit=4&${categorySort}&sortBy=${sortBy}&order=${order}${search}`,
    //   )
    //     .then((res) => res.json())
    //     .then((arr) => {
    //       setPizzas(arr);
    //       setIsLoading(false);
    //     });  // Fetch запрос
    // await axios
    //   .get(
    //     `https://6319b9746b4c78d91b41db16.mockapi.io/items?page=${currentPage}&limit=4&${categorySort}&sortBy=${sortBy}&order=${order}${search}`,
    //   )
    //   .then((res) => {
    //     setPizzas(res.data);
    //     setIsLoading(false);
    //     // console.log('Первое');
    //   });
    // console.log('Второе') // Именно благодаря асинхронности это будет ждать, пока выполнится запрос на сервер с ответом, поэтому второе, без асинхронности это выполнится первым. Async всегда кидается на главную функцию, где используется await. Но если в функции есть еще функция, где нужно использовать await, то и на эту функцию нужен async.

    // try {
    // setPizzas(res.data);
    dispatch(
      fetchPizzas({
        sortBy,
        categoryId: String(categoryId),
        order,
        search,
        currentPage: String(currentPage),
      }),
    );
    // } catch (error) {
    //   console.log(error, 'error');
    //   alert('Ошибка при получении пицц');
    // }
    // Благодаря async await можно избежать использования .then, выше все способы обращения к серверу. Больше не нужно, тк вся логика теперь в редаксе.

    window.scrollTo(0, 0); // Скролл вверх
  };

  // Если изменили параметры и был первый рендер происходит вшитие (после второго рендера (isMounted = false)). Это фикс того, чтобы при первом открытии приложения туда не вшивались параметры пицц, а была просто начальная страница. (15)
  useEffect(() => {
    if (isMounted.current) {
      const params = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId: categoryId > 0 ? categoryId : null,
        currentPage,
      });

      const queryString = qs.stringify(params, { skipNulls: true });

      navigate(`/?${queryString}`);
    }

    if (!window.location.search) {
      dispatch(fetchPizzas({} as SearchPizzaParams));
    }
  }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер, то проверяем и сравниваем URL-параметры и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams; // Убираем первый символ ?, потому что его не должно быть изначально

      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        }),
      );
      isSearch.current = true;
    }
  }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0); // Чтобы при первом рендере нас кидало вверх (избавление от скролла при переходе на страницу с другой страницы)
    getPizzas();

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   }
    //   return false;
    // })  // Фильтрация по поиску пицц и вывод массива пицц через React.js (но если массив не статичный, то нужно с беком работать)
    .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  // value={sort} onChangeSelect={(id) => onChangeSelect(id)}

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
