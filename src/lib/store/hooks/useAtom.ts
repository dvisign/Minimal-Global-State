import {useSyncExternalStore} from "react";
import {get} from "../core/getter";
import {set} from "../core/setter";
import {subscribe} from "../core/subscribe";
import type {Atom} from "../types";

export function useAtom<T>(atom: Atom<T>): [T, (val: T) => void] {
  const state = useSyncExternalStore(
    (callback) => subscribe(atom, callback),
    () => get(atom)
  );

  return [state, (val: T) => set(atom, val)];
}
