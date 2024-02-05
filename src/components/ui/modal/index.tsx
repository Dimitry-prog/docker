import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { MouseEventHandler, ReactNode, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/libs/store.ts';
import { modalActions, modalSelectors } from '@/shared/slices/modal-slice.ts';
import { useScrollDisabled } from '@/shared/hooks/use-scroll-disabled.ts';

const cx = classNames.bind(styles);

type ModalProps = {
  name: string;
  title?: string;
  body?: ReactNode;
  footer?: ReactNode;
};

const Modal = ({ name, title, body, footer }: ModalProps) => {
  const modalName = useAppSelector(modalSelectors.getModalName);
  const isOpen = useAppSelector(modalSelectors.isModalOpen);
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);

  useScrollDisabled(isOpen);

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal());
  };

  const handleCloseByOverlay: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === modalRef.current) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const closeByEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    document.addEventListener('keydown', closeByEsc);

    return () => {
      document.removeEventListener('keydown', closeByEsc);
    };
  }, []);

  return (
    <>
      {isOpen && modalName === name ? (
        <div
          ref={modalRef}
          onClick={handleCloseByOverlay}
          className={cx('wrapper', isOpen && 'open')}
        >
          <div className={cx('container')}>
            <div className={cx('header', title && 'header_title')}>
              {title && <h3 className={cx('title')}>{title}</h3>}

              <button
                onClick={handleCloseModal}
                type="button"
                aria-label="close modal"
                className={cx('close')}
              />
            </div>

            {body}

            {footer}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
