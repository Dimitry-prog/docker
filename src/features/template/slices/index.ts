import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TemplateQueryType, TemplateType } from '@/features/template/types';

type TemplateStateType = {
  template: TemplateType | null;
  query: TemplateQueryType;
  signal: boolean;
};

const initialState: TemplateStateType = {
  template: null,
  query: {
    q: '',
    direction: '',
    skills: [],
    grade: [],
    type: '',
    creator: '',
  },
  signal: false,
};

export const templateSlice = createSlice({
  name: 'templateSlice',
  initialState,
  reducers: {
    setTemplate: (state, action: PayloadAction<TemplateType>) => {
      state.template = action.payload;
    },
    setQuery: (state, action: PayloadAction<TemplateQueryType>) => {
      state.query = action.payload;
    },
    setStartQueryRequest: (state, action: PayloadAction<boolean>) => {
      state.signal = action.payload;
    },
  },
  selectors: {
    getTemplate: (state) => state.template,
    getTemplateQuery: (state) => state.query,
    getSignal: (state) => state.signal,
  },
});

export const { actions: templateActions, selectors: templateSelectors } = templateSlice;
