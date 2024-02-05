import { useAppDispatch, useAppSelector } from '@/libs/store.ts';
import { modalActions, modalSelectors } from '@/shared/slices/modal-slice.ts';

export const useModal = () => {
  const modal = useAppSelector(modalSelectors.getModal);
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal());
  };

  const handleOpenModal = (name: string) => {
    dispatch(modalActions.openModal(name));
  };

  const handleSetModalInfo = (data: unknown) => {
    dispatch(modalActions.setModalInfo(data));
  };

  return {
    ...modal,
    onOpen: handleOpenModal,
    onClose: handleCloseModal,
    setInfo: handleSetModalInfo,
  };
};
