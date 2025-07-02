import {useQuery} from "@tanstack/react-query";
import {apiClient} from "@/lib/axios";

interface TodoListInterface {
  id: number;
  description: string;
  completed: boolean;
  completedAt?: string;
}

const fetchTodoList = async (): Promise<TodoListInterface[]> => {
  return apiClient.get("/todo-list");
};

export const useTodoList = () => {
  return useQuery({
    queryKey: ["todoList"],
    queryFn: fetchTodoList,
  });
};
