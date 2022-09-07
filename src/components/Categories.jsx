import React, { useState } from 'react';

const Categories = () => {
  const [actived, setActived] = useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onClickAddDa = (index) => {
    setActived(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li key={i} onClick={() => onClickAddDa(i)} className={actived === i ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
