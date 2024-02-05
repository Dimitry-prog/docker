import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskType } from '../type';

interface TaskState {
  task: TaskType[];
}

const initialState: TaskState = {
  task: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TaskType[]>) => {
      state.task = action.payload;
    },
  },
  selectors: {
    getTasks: (state) => state,
  },
});

export const { actions: taskActions, selectors: taskSelectors } = taskSlice;
