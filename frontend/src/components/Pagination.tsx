import { useEffect, useState } from "react";

type PaginationProps = {
  data: unknown;
  isPreviousData: boolean;
  onSetPage: (value: number) => void;
};

export const usePagination = () => {
  const [page, setPage] = useState(1);

  const setNextPage = () => {
    setPage((old) => old + 1);
  };
  const setPreviousPage = () => {
    setPage((old) => Math.max(old - 1, 0));
  };

  return {page, setNextPage, setPreviousPage};
};
const Pagination: React.FC<PaginationProps> = ({ isPreviousData, data, onSetPage }) => {
  const {page, setNextPage, setPreviousPage} = usePagination();


  useEffect(() => {
    onSetPage(page);
  }, [page]);
   /*
This code snippet demonstrates the Link property of the HTTP header. 
The Link header is a string that contains a list of URLs for the different pages of data,
 separated by commas. By splitting the Link header into an array of strings and searching
  for the rel="prev" and rel="next" links, you can determine the URLs for the previous and next pages of data.
  */
  const linkHeader = data?.headers?.get("Link");
  const links = linkHeader?.split(",");
  const prevLink = links?.find((l) => l.includes('rel="prev"'));
  const nextLink = links?.find((l) => l.includes('rel="next"'));

  return (
    <div className="flex space-x-3 items-center justify-center mt-4">
      <button
        onClick={setPreviousPage}
        className={
          page === 1
            ? "text-gray-400 flex items-center px-4 py-2  bg-gray-300 rounded-md"
            : "flex items-center px-4 py-2 text-gray-500 bg-gray-300 rounded-md"
        }
        disabled={page === 1 || !prevLink}
      >
        Previous
      </button>{" "}
      <span className="text-lg font-italic">{page}</span>
      <button
        onClick={setNextPage}
        className={
          isPreviousData || !nextLink
            ? "text-gray-400 flex items-center px-4 py-2 bg-gray-300 rounded-md"
            : "flex items-center px-4 py-2 text-gray-500 bg-gray-300 rounded-md"
        }
        // Disable the Next Page button until we know a next page is available
        disabled={isPreviousData || !nextLink}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
