import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import tabStyles from './ingredient-tabs.module.css';

function IngredientTabs() {
  const [current, setCurrent] = React.useState('Булки');
  return (
    <div className={tabStyles.tab}>
      <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

export default IngredientTabs;
