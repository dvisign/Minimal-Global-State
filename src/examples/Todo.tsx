import TodoList from "@/components/todo/TodoList";
import TodoInput from "@/components/todo/TodoInput";
import TodoFilter from "@/components/todo/TodoFilter";

function Todo() {
  return (
    <>
      <TodoFilter />
      <TodoInput />
      <TodoList />
    </>
  );
}

export default Todo;
