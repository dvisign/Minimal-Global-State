import {createAtom} from "@/lib/store/core/createAtom";

export const EnumTodoFilterTypes = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
};
export type TodoFilterTypes =
  (typeof EnumTodoFilterTypes)[keyof typeof EnumTodoFilterTypes];

export const filterAtom = createAtom<TodoFilterTypes>(EnumTodoFilterTypes.ALL);

export const editingIdAtom = createAtom<number | null>(null);
