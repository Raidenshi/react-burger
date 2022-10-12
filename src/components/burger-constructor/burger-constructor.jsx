import React from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import constructorStyles from './burger-constructor.module.css';
import { ConstructorContext } from '../../services/ConstructorContext';

function BurgerConstructor({ openModal }) {
  const { addedIngredients } = React.useContext(ConstructorContext);

  const createList = (el, i) => {
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
  };

  const calculatePrice = (list) => {
    return list.reduce((a, b) => a + b.price, 0);
  };

  return (
    <div className={constructorStyles.container}>
      <ul className={constructorStyles.list}>
        {addedIngredients.map(createList)}
      </ul>
      <div className={constructorStyles.order}>
        <div className="mr-10">
          <span className="text text_type_digits-medium mr-2">
            {calculatePrice(addedIngredients)}
          </span>
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
  openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
