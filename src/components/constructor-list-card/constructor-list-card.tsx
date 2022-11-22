import React, { useRef } from 'react';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag } from 'react-dnd';
import { UPDATE_CONSTRUCTOR_LIST } from '../../services/store/reducers/IngredientsSlice';
import { IIngredient } from '../../types/ingredientsTypes';
import { useAppDispatch, useAppSelector } from '../../hooks/useApp';

import styles from './constructor-list-card.module.css';

interface IConstructorListCard {
  index: number;
  item: IIngredient;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface ICardProps {
  text: string;
  price: number;
  thumbnail: string;
  isLocked?: boolean;
  type?: 'top' | 'bottom' | undefined;
}

function ConstrctorListCard({ index, item, moveCard }: IConstructorListCard) {
  const dispatch = useAppDispatch();
  const addedIngredients = useAppSelector(
    (store) => store.ingredientsReducer.addedIngredients
  );

  let cardProps: ICardProps = {
    text: item.name,
    price: item.price,
    thumbnail: item.image,
  };

  if (item.type === 'bun' && index === 0)
    cardProps = {
      ...cardProps,
      isLocked: true,
      text: `${cardProps.text} (верх)`,
      type: 'top',
    };
  if (item.type === 'bun' && index === addedIngredients.length - 1)
    cardProps = {
      ...cardProps,
      isLocked: true,
      text: `${cardProps.text} (низ)`,
      type: 'bottom',
    };

  const ref = useRef<HTMLLIElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => ({ id: item._id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  if (item.type !== 'bun') drag(drop(ref));
  const preventDefault = (e: React.SyntheticEvent) => e.preventDefault();

  const handleClose = (item: IIngredient) => {
    const newList = addedIngredients.filter(
      (el) => el.uniqueID !== item.uniqueID
    );
    dispatch(UPDATE_CONSTRUCTOR_LIST(newList));
  };

  return (
    <li
      className={item.type === 'bun' ? styles.item_bun : styles.item}
      ref={ref}
      style={{ opacity }}
      onDrop={preventDefault}
      data-handler-id={handlerId}
    >
      {item.type !== 'bun' && <DragIcon type="primary" />}
      <ConstructorElement
        {...cardProps}
        handleClose={() => handleClose(item)}
      />
    </li>
  );
}

export default ConstrctorListCard;
