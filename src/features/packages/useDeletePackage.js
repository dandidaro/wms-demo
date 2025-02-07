import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePackage as deletePackageApi } from "../../services/apiPackages";
import toast from "react-hot-toast";

export function useDeletePackage() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deletePackage } = useMutation({
    mutationFn: deletePackageApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      toast.success("Package successfully deleted");
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deletePackage };
}
