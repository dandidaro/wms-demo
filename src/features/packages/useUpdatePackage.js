import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdatePackage } from "../../services/apiPackages";
import toast from "react-hot-toast";

export function useUpdatePackage() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updatePackage } = useMutation({
    mutationFn: (newPackage, id) => createUpdatePackage(newPackage, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      toast.success("Package successfully added");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, updatePackage };
}
