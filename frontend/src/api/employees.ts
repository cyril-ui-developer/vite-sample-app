import api from './api';

import { EmployeeProps } from './types';

const URLS = {
    employeesUrl: 'employees',
  };
  
  export const getEmployees = () => {
    return api.get<EmployeeProps[]>(URLS.employeesUrl);
  };
  