import React from 'react';
import PropTypes from 'prop-types';
import IngredientTabs from '../ingredient-tabs/ingredient-tabs';
import IngredientsCard from '../ingredients-card/ingredients-card';
import ingredientsStyles from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';

function BurgerIngredients({ openModal }) {
  const data = useSelector((store) => store.ingredientsReducer.data);
  const [current, setCurrent] = React.useState('Булки');

  const refBun = React.useRef();
  const refSauce = React.useRef();
  const refMain = React.useRef();
  const refCont = React.useRef();

  const onScroll = () => {
    const offset = refCont.current.offsetTop;
    const scroll = refCont.current.scrollTop;
    const toSauce = refSauce.current.offsetTop - offset;
    const toMain = refMain.current.offsetTop - offset;
    if (scroll < toSauce / 2 + 30) setCurrent('Булки');
    if (scroll > toSauce / 2 + 30) setCurrent('Соусы');
    if (scroll > (toMain + toSauce) / 2 + 30) setCurrent('Начинки');
  };

  const onClick = (value) => {
    setCurrent(value);
    if (value === 'Булки')
      refBun.current.scrollIntoView({ behavior: 'smooth' });
    if (value === 'Соусы')
      refSauce.current.scrollIntoView({ behavior: 'smooth' });
    if (value === 'Начинки')
      refMain.current.scrollIntoView({ behavior: 'smooth' });
  };

  const sorted = {
    bun: [],
    sauce: [],
    main: [],
  };

  data.forEach((el) => {
    if (el.type === 'bun')
      sorted.bun.push(
        <IngredientsCard element={el} key={el._id} openModal={openModal} />
      );
    if (el.type === 'sauce')
      sorted.sauce.push(
        <IngredientsCard element={el} key={el._id} openModal={openModal} />
      );
    if (el.type === 'main')
      sorted.main.push(
        <IngredientsCard element={el} key={el._id} openModal={openModal} />
      );
  });

  return (
    <div className={ingredientsStyles.container}>
      <h1 className="pt-10 pb-5  text text_type_main-large">Соберите бургер</h1>
      <IngredientTabs current={current} onClick={onClick} />
      <div
        className={`${ingredientsStyles.overflow} mt-10`}
        onScroll={onScroll}
        ref={refCont}
      >
        <h2 className="text text_type_main-medium" ref={refBun}>
          Булки
        </h2>
        <ul className={ingredientsStyles.ingredients}>{sorted.bun}</ul>
        <h2 className="text text_type_main-medium mt-10" ref={refSauce}>
          Соусы
        </h2>
        <ul className={ingredientsStyles.ingredients}>{sorted.sauce}</ul>
        <h2 className="text text_type_main-medium mt-10" ref={refMain}>
          Начинки
        </h2>
        <ul className={ingredientsStyles.ingredients}>{sorted.main}</ul>
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;
