import React from 'react';
import { IIngredient } from '../../types/ingredientsTypes';

import styles from './icon-image.module.css';

interface IconImage {
  ingredient: IIngredient;
  extraClass?: string;
  counter?: boolean;
  length?: number;
}

function IconImage({
  ingredient,
  extraClass,
  counter,
  length,
}: IconImage): JSX.Element {
  return (
    <div className={`${styles.image_container} ${extraClass}`}>
      <div className={styles.background}>
        <img
          alt={ingredient.name}
          src={ingredient.image_mobile}
          className={styles.image}
        />
      </div>
      {counter ? (
        <div className={`${styles.counter} text text_type_digits-default`}>
          {`+${length}`}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default IconImage;
