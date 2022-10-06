import React from 'react';
import IngridientTabs from '../ingridient-tabs/ingridient-tabs';
import IngridientsCard from '../ingridients-card/ingridients-card';

import ingridientsStyles from './burger-ingridients.module.css';

function BurgerIngridients({ data }) {
  return (
    <div className={ingridientsStyles.container}>
      <h1 className="pt-10 pb-5  text text_type_main-large">Соберите бургер</h1>
      <IngridientTabs />
      <div className={`${ingridientsStyles.overflow} mt-10`}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <ul className={ingridientsStyles.ingridients}>
          {data.map((el) => {
            if (el.type === 'bun')
              return <IngridientsCard element={el} key={el._id} />;
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10">Соусы</h2>
        <ul className={ingridientsStyles.ingridients}>
          {data.map((el) => {
            if (el.type === 'sauce')
              return <IngridientsCard element={el} key={el._id} />;
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10">Начинки</h2>
        <ul className={ingridientsStyles.ingridients}>
          {data.map((el) => {
            if (el.type === 'main')
              return <IngridientsCard element={el} key={el._id} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default BurgerIngridients;
