import {useCallback, FormEventHandler} from "react";
import {useInput} from "@/hooks/useInput";
import {useCreateTodo} from "@/queries/todos/useCreateTodo";

function TodoInput() {
  const [value, onChange, setValue] = useInput("");
  const {mutate} = useCreateTodo();

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (!value.trim()) return;
      mutate(value, {
        onSuccess: () => setValue(""),
      });
    },
    [value]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 mb-4 justify-center">
      <input
        value={value}
        onChange={onChange}
        placeholder="할 일을 입력하세요"
        className="px-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
        추가
      </button>
    </form>
  );
}

export default TodoInput;
