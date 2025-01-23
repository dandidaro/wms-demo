import { useQuery } from "@tanstack/react-query";
import { getComputers } from "../../services/apiComputers";

function useComputers() {
  const {
    isPending: isLoading,
    data: computers,
    error,
  } = useQuery({
    queryKey: ["computers"],
    queryFn: getComputers,
  });

  return { isLoading, computers, error };
}

export default useComputers;
