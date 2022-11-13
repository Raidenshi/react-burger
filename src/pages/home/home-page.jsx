import React from 'react';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './home-page.module.css';

function HomePage({ openModalIngredient, openModalOrder }) {
  return (
    <>
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients openModal={openModalIngredient} />
          <BurgerConstructor openModal={openModalOrder} />
        </DndProvider>
      </main>
    </>
  );
}

export default HomePage;
