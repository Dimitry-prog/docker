import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './api.ts';
import { modalSlice } from '@/shared/slices/modal-slice.ts';
import { userSlice } from '@/features/user/slices';
import { authSlice } from '@/features/auth/slices';
import { taskSlice } from '@/features/tasks/slices';
import { pdpSlice } from '@/features/pdp/slices';
import { templateSlice } from '@/features/template/slices';

const rootReducer = combineSlices(
  api,
  authSlice,
  userSlice,
  templateSlice,
  pdpSlice,
  taskSlice,
  modalSlice
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
