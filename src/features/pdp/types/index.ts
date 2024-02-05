import { TaskType } from '@/features/tasks/type';

export type PdpType = {
  id: number;
  goal: string;
  starting_date: string;
  deadline: string;
  user_id: number;
  tasks: TaskType[];
  done: number;
  total: number;
};

export type UpdatePdpType = {
  pdpId: number;
  body: {
    goal: string;
    deadline: string;
    starting_date: string;
  };
};
