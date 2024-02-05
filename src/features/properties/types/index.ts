import { UserRoleType } from '@/features/user/types';

export type SkillType = {
  id: number;
  value: string;
};

export type DirectionType = {
  id: number;
  value: string;
};

export type GradeType = {
  id: number;
  value: string;
};

export type TypeType = {
  id: number;
  value: string;
};

export type CreatorType = {
  id: number;
  first_name: string;
  last_name: string;
  patronymic_name: string;
  position: string;
  role: UserRoleType;
  photo: string;
};

export type StatusType = {
  id: number;
  value: string;
};
