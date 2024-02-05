import { PdpType } from '@/features/pdp/types';

export type UserRoleType = 'chief' | 'employee';

export type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  patronymic_name: string;
  position: string;
  role: UserRoleType;
  photo: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
};

export type EmployeeType = {
  id: number;
  first_name: string;
  last_name: string;
  patronymic_name: string;
  position: string;
  role: UserRoleType;
  photo: string;
  pdp: Omit<PdpType, 'user_id' | 'tasks'>;
};

export type UpdateUserType = Pick<
  UserType,
  'first_name' | 'last_name' | 'patronymic_name' | 'photo'
>;

export type UpdateUserByIdType = {
  id: string;
  body: UpdateUserType;
};
