import React from 'react';
import done from '../../images/done.png';

import orderStyles from './order-details.module.css';

function OrderDetails() {
  return (
    <div className={`mt-30 mb-30 ${orderStyles.container}`}>
      <p className="text text_type_digits-large">034536</p>
      <p className="text text_type_main-medium mt-8">Идентификатор заказа</p>
      <img src={done} alt="Заказ подтверждён" className="mt-15 mb-15" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
