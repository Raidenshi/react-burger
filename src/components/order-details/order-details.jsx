import React from 'react';
import done from '../../images/done.png';
import PropTypes from 'prop-types';

import orderStyles from './order-details.module.css';

function OrderDetails({ orderData }) {
  return (
    <div className={`mt-30 mb-30 ${orderStyles.container}`}>
      {orderData.success && (
        <>
          <p className="text text_type_digits-large">
            {orderData.order.number}
          </p>
          <p className="text text_type_main-medium mt-8">
            Идентификатор заказа
          </p>
          <img
            src={done}
            alt="Заказ подтверждён"
            className={`${orderStyles.image} mt-15 mb-15`}
          />
          <p className="text text_type_main-default mb-2">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
};

export default OrderDetails;
