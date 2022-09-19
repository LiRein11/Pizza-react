import React from 'react';

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void; // Воид означает что функция ничего не вернет (undefined). В аргумент не обязательно передавать также i, назвать можно как угодно.
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
