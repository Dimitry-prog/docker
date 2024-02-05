import { useGetEmployeesQuery } from '@/features/user/services';
import { useAppSelector } from '@/libs/store.ts';
import { userSelectors } from '@/features/user/slices';
import { useEffect, useState } from 'react';
import { EmployeeType } from '@/features/user/types';

export const useFilteredEmployees = () => {
  const [filteredEmployees, setFilteredEmployees] = useState<EmployeeType[]>([]);
  const { data, isLoading } = useGetEmployeesQuery();
  const search = useAppSelector(userSelectors.getSearchQuery);

  useEffect(() => {
    setFilteredEmployees(
      data?.filter((employee) => employee.last_name.toLowerCase().includes(search.toLowerCase())) ||
        []
    );
  }, [search]);

  return {
    employees: search ? filteredEmployees : data ? data : [],
    isLoading,
  };
};
