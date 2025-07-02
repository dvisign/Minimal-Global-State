import {Atom, InternalAtom} from "../types";

export const atomStore = new WeakMap<Atom<any>, InternalAtom<any>>();

export function createAtom<T>(initialValue: T): Atom<T> {
  const atom: Atom<T> = {
    __atom__: true,
    __type__: undefined as unknown as T,
  };

  const internal: InternalAtom<T> = {
    value: initialValue,
    subscribers: new Set(),
  };

  atomStore.set(atom, internal);

  return atom;
}
