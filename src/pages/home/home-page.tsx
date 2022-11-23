import React from 'react';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './home-page.module.css';
import { IIngredient } from '../../types/ingredientsTypes';

interface IHomePage {
  openModalIngredient: (element: IIngredient) => void;
  openModalOrder: () => void;
}

function HomePage({ openModalIngredient, openModalOrder }: IHomePage) {
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
