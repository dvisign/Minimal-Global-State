import {
  useCallback,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

export type UseInputReturnTypes<T> = [
  T,
  (_: ChangeEvent<HTMLInputElement>) => void,
  Dispatch<SetStateAction<T>>
];

export const useInput = <T>(initialData: T): UseInputReturnTypes<T> => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as T);
  }, []);
  return [value, handler, setValue];
};
