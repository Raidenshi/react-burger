import React from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import constructorStyles from './burger-constructor.module.css';

function BurgerConstructor({ data, openModal }) {
  return (
    <div className={constructorStyles.container}>
      <ul className={constructorStyles.list}>
        <li className="mr-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </li>
        <li className="mr-4">
          <DragIcon type="primary" />
          <ConstructorElement
            text="Филе Люминесцентного тетраодонтимформа"
            price={data[3].price}
            thumbnail={data[3].image}
          />
        </li>
        <li className="mr-4">
          <DragIcon type="primary" />
          <ConstructorElement
            text="Говяжий метеорит (отбивная)"
            price={data[4].price}
            thumbnail={data[4].image}
          />
        </li>
        <li className="mr-4">
          <DragIcon type="primary" />
          <ConstructorElement
            text="Биокотлета из марсианской Магнолии"
            price={data[5].price}
            thumbnail={data[5].image}
          />
        </li>
        <li className="mr-4">
          <DragIcon type="primary" />
          <ConstructorElement
            text="Биокотлета из марсианской Магнолии"
            price={data[5].price}
            thumbnail={data[5].image}
          />
        </li>
        <li className="mr-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={1255}
            thumbnail={data[0].image}
          />
        </li>
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    }).isRequired
  ),
  openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
