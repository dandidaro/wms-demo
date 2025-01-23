import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUpdateComputer } from "../../services/apiComputers";

export function useCreateComputer() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createComputer } = useMutation({
    mutationFn: createUpdateComputer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["computers"] });
      toast.success("New computer successfully added");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isCreating, createComputer };
}
