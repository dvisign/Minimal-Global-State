import {useAtom} from "@/lib/store/hooks/useAtom";
import {filterAtom, EnumTodoFilterTypes} from "@/stores/todo";

const TodoFilter = () => {
  const [filter, setFilter] = useAtom(filterAtom);

  return (
    <div className="flex gap-2 mt-6 mb-4 justify-center">
      {[
        {label: "전체", value: EnumTodoFilterTypes.ALL},
        {label: "진행 중", value: EnumTodoFilterTypes.ACTIVE},
        {label: "완료", value: EnumTodoFilterTypes.COMPLETED},
      ].map(({label, value}) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={`px-4 py-1 rounded-md text-sm border ${
            filter === value
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          } transition-colors`}>
          {label}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;
