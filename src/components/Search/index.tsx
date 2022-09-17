import React, { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';


import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search:React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>(''); // Состояние для того, чтобы сделать локально контролируемый инпут
  // const { setSearchValue } = useContext(SearchContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = useCallback(
    debounce((str:string) => {
      dispatch(setSearchValue(str));
    }, 250),
    [],
  ); // Сохранение ссылки на отложенную функцию юс калбеком, чтобы не пересоздавалась каждый раз

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value); // Моментально получать информацию и изменять состояние
    updateSearchValue(event.target.value);
  }; // Каждый раз когда меняется инпут, вызывается калбечная функция

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    // document.querySelector('input').focus()  // Для того, чтобы нажатие на крестик очищался инпут и возвращало курсор на инпут (так делать плохо, потому что обращение идет не через реакт, а через js напрямую к DOM элементу)
    // if (inputRef.current) {
    //   inputRef.current.focus();
    // } Или так пофиксить тс
    inputRef.current?.focus(); // Или так. Тут юзается оператор опциональной последовательноссти (optional chaining) = ?
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="612.08px"
        height="612.08px"
        viewBox="0 0 612.08 612.08">
        <g>
          <path
            d="M237.927,0C106.555,0,0.035,106.52,0.035,237.893c0,131.373,106.52,237.893,237.893,237.893
		c50.518,0,97.368-15.757,135.879-42.597l0.028-0.028l176.432,176.433c3.274,3.274,8.48,3.358,11.839,0l47.551-47.551
		c3.274-3.274,3.106-8.703-0.028-11.838L433.223,373.8c26.84-38.539,42.597-85.39,42.597-135.907C475.82,106.52,369.3,0,237.927,0z
		 M237.927,419.811c-100.475,0-181.918-81.443-181.918-181.918S137.453,55.975,237.927,55.975s181.918,81.443,181.918,181.918
		S338.402,419.811,237.927,419.811z"
          />
        </g>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput} // Эти 2 строки нужны для управления инпутом (управляемый инпут (контролируемый))
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          onClick={onClickClear} // Очистка интпута
          className={styles.iconClear}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512">
          <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
