import {Atom, InternalAtom} from "../types";

// 전역 저장소: Atom → InternalAtom 매핑
const atomStore = new WeakMap<Atom<any>, InternalAtom<any>>();

export function createAtom<T>(initialValue: T): Atom<T> {
  const atom: Atom<T> = {
    __atom__: true,
    __type__: undefined as unknown as T, // 타입스크립트용 더미 필드
  };

  const internal: InternalAtom<T> = {
    value: initialValue,
    subscribers: new Set(),
  };

  atomStore.set(atom, internal);

  return atom;
}

// 👉 내부 atomStore는 get/set/subscribe에서도 재사용할 수 있도록 export
export {atomStore};
