import {useMutation, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/lib/axios";

interface UpdatePayload {
  id: number;
  description: string;
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, description}: UpdatePayload) => {
      return apiClient.post(`/update-todo/${id}`, {description});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["todoList"]});
    },
  });
};
