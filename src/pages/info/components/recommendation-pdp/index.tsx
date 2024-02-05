import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { card } from '@/libs/constants.ts';

const cx = classNames.bind(styles);

const RecommendationPdp = () => {
  return (
    <section className={cx('recommendation-pdp')}>
      <h2 className={cx('recommendation-pdp__title')}>Рекомендации по составлению ИПР</h2>

      <nav>
        <ul className={cx('cards')}>
          {card.map((list) => (
            <li className={cx('card')} key={list.id}>
              <img className={cx('card__icon')} src={list.imgSrc} alt={list.title} />
              <p className={cx('card__text')}>{list.title}</p>
              <p className={cx('card__about')}>{list.about}</p>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default RecommendationPdp;
