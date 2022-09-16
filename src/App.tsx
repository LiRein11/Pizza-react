import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

import './scss/app.scss';
import FullPizza from './pages/FullPizza';
import MainLayout from './components/layouts/MainLayout';

// export const SearchContext = createContext(); //Из-за редакса больше не нужен

function App() {
  // const [searchValue, setSearchValue] = useState(''); // И это не нужно

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
