import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComputer as deleteComputerApi } from "../../services/apiComputers";
import toast from "react-hot-toast";

export function useDeleteComputer() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteComputer } = useMutation({
    mutationFn: deleteComputerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["computers"] });
      toast.success("Computer successfully deleted");
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteComputer };
}
