import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { devInfoCards } from '@/libs/constants.ts';
import Button from '@/components/ui/button';

const cx = classNames.bind(styles);

const DevInfo = () => {
  return (
    <section className={cx('wrapper')}>
      <ul className={cx('cards')}>
        {devInfoCards.map((card) => (
          <li className={cx('card')} key={card.id}>
            <h3 className={cx('heading')}>{card.label}</h3>
            <p className={cx('text')}>{card.text}</p>
            <Button
              type="button"
              className={cx('button')}
              variant="accent"
              size="l"
              href="/employee_development_plan"
            >
              Подробнее
            </Button>
            <img className={cx('image')} src={card.src} alt={card.label} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DevInfo;
