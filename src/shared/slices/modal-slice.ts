import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalStateType = {
  name: string;
  isOpen: boolean;
  modalInfo: unknown;
};

const initialState: ModalStateType = {
  name: '',
  isOpen: false,
  modalInfo: null,
};

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.name = '';
      state.isOpen = false;
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.isOpen = true;
    },
    setModalInfo: (state, action: PayloadAction<unknown>) => {
      state.modalInfo = action.payload;
    },
  },
  selectors: {
    getModal: (state) => state,
    getModalName: (state) => state.name,
    isModalOpen: (state) => state.isOpen,
    getModalInfo: (state) => state.modalInfo,
  },
});

export const {
  reducer: modalReducer,
  actions: modalActions,
  selectors: modalSelectors,
} = modalSlice;
