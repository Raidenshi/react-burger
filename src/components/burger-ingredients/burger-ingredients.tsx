import React from 'react';
import IngredientTabs from '../ingredient-tabs/ingredient-tabs';
import IngredientsCard from '../ingredients-card/ingredients-card';
import { useDrag } from 'react-dnd';
import { filterByType } from '../../utils/filterByType';
import { IIngredient } from '../../types/ingredientsTypes';
import { useAppSelector } from '../../hooks/useApp';

import ingredientsStyles from './burger-ingredients.module.css';

function BurgerIngredients({
  openModal,
}: {
  openModal: (element: IIngredient) => void;
}) {
  const data = useAppSelector((store) => store.ingredientsReducer.data);
  const [current, setCurrent] = React.useState<string>('Булки');

  const [] = useDrag(() => ({
    type: 'ingredient',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const refBun = React.useRef<HTMLInputElement>(null!);
  const refSauce = React.useRef<HTMLInputElement>(null!);
  const refMain = React.useRef<HTMLInputElement>(null!);
  const refCont = React.useRef<HTMLInputElement>(null!);

  const onScroll = () => {
    const offset = refCont.current.offsetTop;
    const scroll = refCont.current.scrollTop;
    const toSauce = refSauce.current.offsetTop - offset;
    const toMain = refMain.current.offsetTop - offset;
    if (scroll < toSauce / 2 + 30) setCurrent('Булки');
    if (scroll > toSauce / 2 + 30) setCurrent('Соусы');
    if (scroll > (toMain + toSauce) / 2 + 30) setCurrent('Начинки');
  };

  const onClick = (value: string): void => {
    setCurrent(value);
    if (value === 'Булки')
      refBun.current.scrollIntoView({ behavior: 'smooth' });
    if (value === 'Соусы')
      refSauce.current.scrollIntoView({ behavior: 'smooth' });
    if (value === 'Начинки')
      refMain.current.scrollIntoView({ behavior: 'smooth' });
  };

  const bun = React.useMemo(() => filterByType(data, 'bun'), [data]);
  const sauce = React.useMemo(() => filterByType(data, 'sauce'), [data]);
  const main = React.useMemo(() => filterByType(data, 'main'), [data]);

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
        <ul className={ingredientsStyles.ingredients}>
          {bun.map((el) => (
            <IngredientsCard key={el._id} element={el} openModal={openModal} />
          ))}
        </ul>
        <h2 className="text text_type_main-medium mt-10" ref={refSauce}>
          Соусы
        </h2>
        <ul className={ingredientsStyles.ingredients}>
          {sauce.map((el) => (
            <IngredientsCard key={el._id} element={el} openModal={openModal} />
          ))}
        </ul>
        <h2 className="text text_type_main-medium mt-10" ref={refMain}>
          Начинки
        </h2>
        <ul className={ingredientsStyles.ingredients}>
          {main.map((el) => (
            <IngredientsCard key={el._id} element={el} openModal={openModal} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BurgerIngredients;
