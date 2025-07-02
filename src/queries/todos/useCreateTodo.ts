import {useMutation, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/lib/axios";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: string) =>
      apiClient.post("/create-todo", {todoItem: todo}),

    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["todoList"]});
    },
  });
};
