import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUpdateComputer } from "../../services/apiComputers";

export function useUpdateComputer() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateComputer } = useMutation({
    mutationFn: (newComputer, id) => createUpdateComputer(newComputer, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["computers"] });
      toast.success("Computer successfully updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, updateComputer };
}
