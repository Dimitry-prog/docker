import {
  CreatorType,
  DirectionType,
  GradeType,
  SkillType,
  TypeType,
} from '@/features/properties/types';

export type TemplateType = {
  id: number;
  title: string;
  description: string;
  skills: SkillType[];
  user: CreatorType;
  direction: DirectionType;
  grade: GradeType;
  type: TypeType;
  link: string;
  duration: number;
  recommendation: string;
};

export type RequestTemplateType = {
  title: string;
  description: string;
  skills: string[];
  direction_id: number;
  grade_id: number;
  type_id: number;
  link: string;
  duration: number;
  recommendation: string;
};

export type RequestUpdateTemplateType = {
  templateId: number;
  body: Partial<RequestTemplateType>;
};

export type TemplateQueryType = {
  q: string;
  direction: number | string;
  skills: number[];
  grade: number[];
  type: number | string;
  creator: string;
};

export type SetTemplateToUsersRequestType = {
  users_ids: number[];
  template_id: number;
};
