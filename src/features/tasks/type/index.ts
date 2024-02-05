import { SkillType, StatusType, TypeType } from '@/features/properties/types';

export type TaskType = {
  id: number;
  title: string;
  starting_date: string;
  deadline: string;
  pdp_id: number;
  type: TypeType;
  status: StatusType;
  description: string;
  skills: SkillType[];
  link: string;
  chief_comment: string;
  employee_comment: string;
};

export type UpdateTaskType = {
  taskId: number;
  body: Partial<
    Omit<TaskType, 'skills'> & {
      type_id: number;
      status_id: number;
      skills: string[];
    }
  >;
};

export type SetTaskToTemplateRequestType = {
  task_id: number;
};
