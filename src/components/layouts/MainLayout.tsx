import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

const MainLayout:React.FC = () => {
  return (
    <div className="wrapper">
      {/* <SearchContext.Provider value={{ searchValue, setSearchValue }}> */}
      <Header />
      <div className="content"><Outlet/></div>
      {/* </SearchContext.Provider> соответственно тоже больше не нужно*/}
    </div>
  );
};

export default MainLayout;
