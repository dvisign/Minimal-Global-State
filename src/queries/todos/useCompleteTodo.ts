import {useMutation, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/lib/axios";

const completeTodo = async (id: number) => {
  return apiClient.post(`/complete-todo/${id}`);
};

export const useCompleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: completeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["todoList"]});
    },
  });
};
