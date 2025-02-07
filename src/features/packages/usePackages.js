import { useQuery } from "@tanstack/react-query";
import { getPackages } from "../../services/apiPackages";

function usePackages() {
  const {
    isPending: isLoading,
    data: packages,
    error,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: getPackages,
  });

  return { isLoading, packages, error };
}

export default usePackages;
