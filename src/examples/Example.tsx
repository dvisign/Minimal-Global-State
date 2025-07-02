import PersistExample from "./example/Persist";
import BasicExample from "./example/Basic";

const Example = () => {
  return (
    <div className="flex gap-5 items-center justify-center mt-5">
      <div className="w-[300px]">
        <BasicExample />
      </div>
      <div className="w-[300px]">
        <PersistExample />
      </div>
    </div>
  );
};

export default Example;
