import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import DevInfo from '@/pages/info/components/dev-info';
import DevDirection from '@/pages/info/components/dev-direction';
import RecommendationPdp from '@/pages/info/components/recommendation-pdp';
import Video from '@/pages/info/components/video';
import Faq from '@/pages/info/components/faq';

const cx = classNames.bind(styles);

const InfoPage = () => {
  return (
    <div className={cx('wrapper')}>
      <h2>Информация о развитии</h2>

      <div className={cx('content')}>
        <DevInfo />
        <DevDirection />
        <RecommendationPdp />
        <Video />
        <Faq />
      </div>
    </div>
  );
};

export default InfoPage;
