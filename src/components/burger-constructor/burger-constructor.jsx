import React from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import dataProps from '../../utils/types';

import constructorStyles from './burger-constructor.module.css';

function BurgerConstructor({ data, openModal }) {
  const addedIngredients = [
    data[0],
    data[3],
    data[4],
    data[5],
    data[5],
    data[0],
  ];
  return (
    <div className={constructorStyles.container}>
      <ul className={constructorStyles.list}>
        {addedIngredients.map((el, i) => {
          const checkInMiddle = i > 0 && i !== addedIngredients.length - 1;
          let constructorProps = {
            text: el.name,
            price: el.price,
            thumbnail: el.image,
          };
          if (i === 0) {
            constructorProps = {
              ...constructorProps,
              type: 'top',
              text: `${el.name} (верх)`,
              isLocked: true,
            };
          } else if (i === addedIngredients.length - 1) {
            constructorProps = {
              ...constructorProps,
              type: 'bottom',
              text: `${el.name} (низ)`,
              isLocked: true,
            };
          }
          return (
            <li className="mr-4" key={`${el._id}${i}`}>
              {checkInMiddle && <DragIcon type="primary" />}
              <ConstructorElement {...constructorProps} />
            </li>
          );
        })}
      </ul>
      <div className={constructorStyles.order}>
        <div className="mr-10">
          <span className="text text_type_digits-medium mr-2">7695</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="medium"
          htmlType="button"
          onClick={openModal}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataProps).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
