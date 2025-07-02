import {useAtom} from "@/lib/store/hooks/useAtom";
import {createAtom} from "@/lib/store/core/createAtom";
import {persistAtom} from "@/lib/store/core/persist";

const counterAtom = persistAtom(createAtom(0), {
  key: "example-counter",
  storage: localStorage,
});

function PersistExample() {
  const [count, setCount] = useAtom(counterAtom);
  console.log("rerender");
  return (
    <div className="p-6 space-y-4 border rounded-md shadow h-[250px]">
      <h2 className="text-xl font-bold">캐싱 상태관리 예제</h2>
      <p className="text-lg">Count: {count}</p>
      <div className="flex gap-2">
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
          +
        </button>
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">
          -
        </button>
      </div>
      <p className="text-sm text-gray-500">localStorage에 캐싱 됩니다</p>
    </div>
  );
}

export default PersistExample;
