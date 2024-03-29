import api from './api';

import { EmployeeProps } from './types';

const URLS = {
    employeesUrl: 'employees',
  };
  
  export const fetchEmployees = () => {
    return api.get<EmployeeProps[]>(URLS.employeesUrl).then((res:unknown) => res);
  };
  
  export const fetchEmployeesByPage = (page: number) =>
api.get<EmployeeProps>(`${URLS.employeesUrl}?_page=${page}&_limit=3`).then((res:unknown) => res)