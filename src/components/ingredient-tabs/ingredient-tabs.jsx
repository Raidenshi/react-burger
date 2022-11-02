import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import tabStyles from './ingredient-tabs.module.css';

function IngredientTabs({ current, onClick }) {
  return (
    <div className={tabStyles.tab}>
      <Tab value="Булки" active={current === 'Булки'} onClick={onClick}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={onClick}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={onClick}>
        Начинки
      </Tab>
    </div>
  );
}

export default IngredientTabs;
