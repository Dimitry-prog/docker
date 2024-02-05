import { EmployeeType, UserType } from '@/features/user/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../services';
import { authApi } from '@/features/auth/services';

type UserStateType = {
  user: UserType | null;
  employees: EmployeeType[];
  searchQuery: string;
};

const initialState: UserStateType = {
  user: null,
  employees: JSON.parse(localStorage.getItem('employees') ?? '[]'),
  searchQuery: '',
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addMatcher(userApi.endpoints.getUser.matchRejected, (state) => {
      state.user = null;
      localStorage.removeItem('token');
    });
    builder.addMatcher(userApi.endpoints.getEmployees.matchFulfilled, (state, { payload }) => {
      state.employees = payload;
      localStorage.setItem('employees', JSON.stringify(payload));
    });
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.user = null;
    });
  },
  selectors: {
    getCurrentUser: (state) => state.user,
    getEmployees: (state) => state.employees,
    getSearchQuery: (state) => state.searchQuery,
  },
});

export const { actions: userActions, selectors: userSelectors } = userSlice;
