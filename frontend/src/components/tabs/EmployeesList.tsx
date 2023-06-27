import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { useState } from "react";

import Table, { TableData } from "../Table";
import { EmployeeProps } from "@api/types";
import { TableRowsProps } from "@components/types";
import { fetchEmployeesByPage } from "@api/employees";
import Pagination from "@components/Pagination";

function EmployeesList() {
  const [page, setPage] = useState(1);

  const {
    data: employees,
    isLoading,
    isSuccess,
    isError,
    isFetching,
    isPreviousData
  } = useQuery<EmployeeProps[]>(
    ["fetch-employees", page],
    () => fetchEmployeesByPage(page),
    { keepPreviousData: true }
  );

  const handleSetPage = (value: number) => {
    setPage(value);
  };

  const tableColumns = [
    {
      key: "firstName",
      header: "Name and Job Title",
      width: 150,
    },
    {
      key: "project",
      header: "Project",
    },
    {
      key: "teamName",
      header: "Team",
    },
    {
      key: "workLocation",
      header: "Location",
    },
    {
      key: "hireDate",
      header: "Hire Date",
    },
  ];

  const EmployeeInitials = ({ firstName, lastName, avatarUrl, jobTitle }) => (
    <div className="flex">
      <div className="flex-shrink-0 w-10 h-10">
        {avatarUrl ? (
          <img
            alt="employee"
            src={avatarUrl}
            className="object-cover border-2 border-gray-350 rounded-full"
          />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </div>
      <div className="ml-3">
        <p className="text-gray-900 whitespace-no-wrap">
          {firstName} {lastName}
        </p>
        <p className="text-gray-600 whitespace-no-wrap">{jobTitle}</p>
      </div>
    </div>
  );

  const TableRow = (props: TableRowsProps) => {
    const {
      firstName,
      lastName,
      avatarUrl,
      jobTitle,
      project,
      teamName,
      workLocation,
      hireDate,
    } = props;

    return (
      <>
        <TableData>
          <EmployeeInitials
            firstName={firstName}
            lastName={lastName}
            avatarUrl={avatarUrl}
            jobTitle={jobTitle}
          />
        </TableData>
        <TableData>{project || "-"}</TableData>
        <TableData>{teamName || "-"}</TableData>
        <TableData>{workLocation || "-"}</TableData>
        <TableData>{hireDate || "-"}</TableData>
      </>
    );
  };
  return (
    <>
      <h2 className="font-bold">Employees List</h2>
      <div className="flex justify-center">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          {isError ? (
            <p className="text-red-900">
              There was a problem with fetching employees
            </p>
          ) : null}
          {isLoading ? <p>Fetching employees</p> : null}
          {isSuccess && employees?.data.length > 0 ? (
            <>
              <Table
                tableColumns={tableColumns}
                TableRow={TableRow}
                data={employees.data}
              />
              <Pagination
                data={employees}
                isPreviousData={isPreviousData}
                onSetPage={handleSetPage}
              />
              {isFetching ? <span>Loading...</span> : null}{" "}
            </>
          ) : (
            <>No data</>
          )}
        </div>
      </div>
    </>
  );
}

export default EmployeesList;
