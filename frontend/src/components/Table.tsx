import {
    TableHeaderProps,
    TableRowsProps,
    TableProps,
    TableDataProps,
  } from '@components/types';
  
  // The 'extends' means “is assignable” instead of “inherits”;
  // 'K extends keyof T' means that any value of type K can be assigned to the string literal union types
  const TableHeader = <T, K extends keyof T>({
    tableColumns,
  }: TableHeaderProps<T, K>) => {
    const headers = tableColumns.map((column, index) => {
      return (
        <th scope="col" className="py-3 px-6" key={`headCell-${index}`}>
          {column.header}
        </th>
      );
    });
  
    return (
      <thead>
        <tr>{headers}</tr>
      </thead>
    );
  };
  
  export const TableData: React.FC<TableDataProps> = ({
    className = 'py-4 px-6',
    children,
  }) => {
    return (
      <td className={className} role="gridcell">
        {children}
      </td>
    );
  };
  
  const TableRows = <T, K extends keyof T>({
    data,
    TableRow,
  }: TableRowsProps<T, K>) => {
    const rows = data.map((row, index) => {
      return (
        <tr
          key={`row-${index}`}
          className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
        >
          <TableRow {...row} />
        </tr>
      );
    });
  
    return <tbody>{rows}</tbody>;
  };
  
  const Table = <T, K extends keyof T>({
    data,
    tableColumns,
    TableRow,
  }: TableProps<T, K>) => {
    return (
      <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <TableHeader tableColumns={tableColumns} />
          <TableRows
            data={data}
            tableColumns={tableColumns}
            TableRow={TableRow}
          />
        </table>
      </div>
    );
  };
  
  export default Table;