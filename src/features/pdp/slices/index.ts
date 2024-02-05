import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PdpType } from '@/features/pdp/types';
import { pdpApi } from '@/features/pdp/services';

type PdpStateType = {
  pdp: PdpType | null;
  signal: boolean;
};

const initialState: PdpStateType = {
  pdp: null,
  signal: false,
};

export const pdpSlice = createSlice({
  name: 'pdpSlice',
  initialState,
  reducers: {
    setPdp: (state, action: PayloadAction<PdpType>) => {
      state.pdp = action.payload;
    },
    setStartQueryRequest: (state, action: PayloadAction<boolean>) => {
      state.signal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(pdpApi.endpoints.getPdpById.matchFulfilled, (state, { payload }) => {
      state.pdp = payload;
    });
  },
  selectors: {
    getPdp: (state) => state.pdp,
    getSignal: (state) => state.signal,
  },
});

export const { actions: pdpActions, selectors: pdpSelectors } = pdpSlice;
