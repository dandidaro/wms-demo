import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getComputers } from "../../services/apiComputers";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useComputers() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isPending: isLoading,
    data: { computers, count } = {},
    error,
  } = useQuery({
    queryKey: ["computers", filter, page],
    queryFn: () => getComputers({ filter, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["computers", filter, page + 1],
      queryFn: () => getComputers({ filter, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["computers", filter, page - 1],
      queryFn: () => getComputers({ filter, page: page - 1 }),
    });

  return { isLoading, computers, error, count };
}

export default useComputers;
