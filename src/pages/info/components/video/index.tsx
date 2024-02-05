import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { useAppDispatch } from '@/libs/store.ts';
import { modalActions } from '@/shared/slices/modal-slice.ts';
import { useState } from 'react';

const cx = classNames.bind(styles);

const Video = () => {
  const [tabName, setTabName] = useState<'chief' | 'employee'>('chief');
  const dispatch = useAppDispatch();

  const handleVideoModal = () => {
    dispatch(modalActions.openModal(tabName));
  };

  return (
    <>
      <section className={cx('wrapper')}>
        <h2>Как оформить ИПР</h2>

        <div className={cx('container')}>
          <div className={cx('buttons')}>
            <Button
              onClick={() => setTabName('chief')}
              variant={tabName === 'chief' ? 'primary' : 'secondary'}
            >
              Я руководитель
            </Button>
            <Button
              onClick={() => setTabName('employee')}
              variant={tabName === 'employee' ? 'primary' : 'secondary'}
              size="s"
            >
              Я сотрудник
            </Button>
          </div>

          <div
            onClick={handleVideoModal}
            className={cx('video', tabName === 'employee' && 'video_employee')}
          />
        </div>
      </section>

      <Modal
        name="chief"
        body={
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/9bZkp7q19f0?si=REnXXfnqvEPy-9IQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        }
      />

      <Modal
        name="employee"
        body={
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/5NPBIwQyPWE?si=BbIuuRjE1oJC5_Q3"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        }
      />
    </>
  );
};

export default Video;
