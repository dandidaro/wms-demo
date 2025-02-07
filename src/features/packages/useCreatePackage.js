import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdatePackage } from "../../services/apiPackages";
import toast from "react-hot-toast";

export function useCreatePackage() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createPackage } = useMutation({
    mutationFn: createUpdatePackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      toast.success("New package successfully added");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isCreating, createPackage };
}
