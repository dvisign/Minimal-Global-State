import TodoList from "@/examples/todo/components/TodoList";
import TodoInput from "@/examples/todo/components/TodoInput";
import TodoFilter from "@/examples/todo/components/TodoFilter";

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
