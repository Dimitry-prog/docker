import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { devDirectionMock } from '@/libs/constants.ts';

const cx = classNames.bind(styles);

const DevDirection = () => {
  return (
    <section className={cx('wrapper')}>
      <h2>Направления развития внутри компании</h2>

      <ul className={cx('list')}>
        {devDirectionMock.map((direc) => (
          <li className={cx('card')} key={direc.id}>
            <h4>{direc.label}</h4>
            <img src={direc.src} alt={direc.label} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DevDirection;
