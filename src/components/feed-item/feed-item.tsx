import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { useFeedOrderData } from '../../hooks/useFeedOrderData';
import { SocketOrders } from '../../types/socketTypes';
import { Status, StatusColor } from '../../types/statusEnums';
import IconImage from '../../ui/icon-image/icon-image';

import styles from './feed-item.module.css';

interface IFeedItem {
  order: SocketOrders;
  profile?: boolean;
}

function FeedItem({ order, profile }: IFeedItem) {
  const location = useLocation();

  const { orderIngredients, name, time, calculatedPrice } =
    useFeedOrderData(order);

  const images = orderIngredients.map((ingredient, i) => {
    if (i === 7) {
      return (
        <IconImage
          ingredient={ingredient!}
          key={i}
          counter={true}
          length={orderIngredients.length - i}
          extraClass={styles.offset}
        />
      );
    }
    if (i > 7) {
      return;
    }
    return (
      <IconImage ingredient={ingredient!} key={i} extraClass={styles.offset} />
    );
  });

  const to = profile ? `/profile/orders/${order._id}` : `/feed/${order._id}`;

  return (
    <Link to={to} state={{ background: location }} className={styles.link}>
      <div className={`${styles.card} mb-4`}>
        <div className={`${styles.number} mb-6`}>
          <p className="text text_type_digits-default">{`#${order.number}`}</p>
          <time
            className="text text_type_digits-default text_color_inactive"
            dateTime={order.createdAt}
          >
            {time}
          </time>
        </div>
        <p className="text text_type_main-medium mb-6">{name}</p>
        {profile ? (
          <p
            className={`text text_type_main-small text_color_${
              StatusColor[order.status]
            } mb-6`}
          >
            {Status[order.status]}
          </p>
        ) : (
          ''
        )}
        <div className={styles.images_price}>
          <div className={styles.images}>{images}</div>
          <div className={styles.price}>
            <span className="mr-2 text text_type_digits-default">
              {calculatedPrice}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FeedItem;
