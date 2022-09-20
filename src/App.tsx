import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import MainLayout from './components/layouts/MainLayout';
import './scss/app.scss';
// import NotFound from './pages/NotFound';
// import FullPizza from './pages/FullPizza';
// import Cart from './pages/Cart';

const Cart = React.lazy(() => import(/* webpackChunkName: 'Cart' */'./pages/Cart'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: 'FullPizza' */ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: 'NotFound' */ './pages/NotFound'));

// export const SearchContext = createContext(); //Из-за редакса больше не нужен

function App() {
  // const [searchValue, setSearchValue] = useState(''); // И это не нужно

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<div>Идёт загрузка...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Идёт загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
