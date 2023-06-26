import { useState } from 'react'
import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'

import EmployeesList from "@components/tabs/EmployeesList";

function App() {
  const queryClient = new QueryClient()
  const [isActiveTab, setIsActiveTab] = useState(true);

  const handleTabChange = () => setIsActiveTab(!isActiveTab);

  return (
    <QueryClientProvider client={queryClient}>
    <div className=" App">
      <header className="my-10 mx-10 font-bold">
        <h1>
          Reusable Table Demonstrating the React Component Composition Pattern
        </h1>
        <ul className="flex flex-wrap justify-center border-b border-gray-200 my-10 mx-10">
          <li className="mr-55">
            <button
              onClick={handleTabChange}
              aria-current="page"
              className={`${
                isActiveTab && "bg-gray-100 text-blue-600"
              } inline-block text-gray-500 hover:text-gray-600 hover:bg-gray-50 rounded-t-lg py-4 px-4 text-sm font-medium text-center`}
            >
              Employees
            </button>
          </li>
          <li className="mr-5">
            <button
              onClick={handleTabChange}
              className={`${
                !isActiveTab && "bg-gray-100 text-blue-600"
              } inline-block text-gray-500 hover:text-gray-600 hover:bg-gray-50 rounded-t-lg py-4 px-4 text-sm font-medium text-center`}
            >
              Customers
            </button>
          </li>
        </ul>
      </header>

      <div className="flex justify-center">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          {isActiveTab ? (
            <EmployeesList />
          ) : (
            // <CustomersList data={data.customers} />
            <h1>hi</h1>
          )}
        </div>
      </div>
    </div>
    </QueryClientProvider>
  );}

export default App
