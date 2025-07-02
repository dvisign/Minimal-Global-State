import {useCallback} from "react";
import {useAtom} from "@/lib/store/hooks/useAtom";
import {useInput} from "@/hooks/useInput";
import {filterAtom, EnumTodoFilterTypes, editingIdAtom} from "@/stores/todo";
import {useTodoList} from "@/queries/todos/useTodoList";
import {useUpdateTodo} from "@/queries/todos/useUpdateTodo";
import {useCompleteTodo} from "@/queries/todos/useCompleteTodo";
import {formatDate} from "@/utils";

function TodoList() {
  const {data: todoList} = useTodoList();
  const [filter] = useAtom(filterAtom);
  const [editingId, setEditingId] = useAtom(editingIdAtom);
  const {mutate: updateTodo} = useUpdateTodo();
  const {mutate: complateTodo} = useCompleteTodo();
  const [editText, onEditTextChange, setEditText] = useInput("");

  const handleSave = useCallback(
    (id: number) => {
      updateTodo(
        {id, description: editText},
        {
          onSuccess: () => {
            setEditingId(null);
            setEditText("");
          },
        }
      );
    },
    [editText, editingId, setEditingId]
  );

  const handleComplete = useCallback(
    (id: number) => {
      complateTodo(id);
    },
    [complateTodo]
  );

  if (!todoList) return <p className="text-center mt-6">로딩 중...</p>;
  if (todoList.length === 0)
    return <p className="text-center mt-6">등록된 일정이 없습니다.</p>;

  const filtered = todoList.filter((todo) => {
    if (filter === EnumTodoFilterTypes.COMPLETED) return todo.completed;
    if (filter === EnumTodoFilterTypes.ACTIVE) return !todo.completed;
    return true;
  });

  if (filtered.length === 0)
    return (
      <div className="mt-6 mx-auto max-w-md border border-dashed border-gray-300 bg-gray-50 rounded-md p-4 text-center text-gray-600">
        선택된 조건에 해당하는 일정이 없습니다.
      </div>
    );

  return (
    <ul className="flex flex-col gap-3 items-center mt-6">
      {filtered.map((todo) => (
        <li
          key={todo.id}
          className="w-[80%] p-4 rounded-md border border-gray-300 shadow-sm flex justify-between items-center">
          <div className="flex-1">
            {editingId === todo.id ? (
              <>
                <input
                  value={editText}
                  onChange={onEditTextChange}
                  className="border px-2 py-1 w-full mb-1 rounded"
                />
                <button
                  onClick={() => handleSave(todo.id)}
                  className="text-sm px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mt-1">
                  저장
                </button>
              </>
            ) : (
              <>
                <p className="text-lg">{todo.description}</p>
                <span
                  className={`text-sm ${
                    todo.completed ? "text-green-600" : "text-yellow-600"
                  }`}>
                  {todo.completed ? "완료" : "진행중"}
                </span>
                {todo.completed && todo.completedAt && (
                  <p className="text-xs text-gray-500 mt-1">
                    완료일: {formatDate(todo.completedAt)}
                  </p>
                )}
              </>
            )}
          </div>
          {!todo.completed && editingId !== todo.id && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditText(todo.description);
                  setEditingId(todo.id);
                }}
                className="text-sm px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500">
                수정
              </button>
              <button
                type="button"
                className="text-sm px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                onClick={() => handleComplete(todo.id)}>
                진행완료
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
