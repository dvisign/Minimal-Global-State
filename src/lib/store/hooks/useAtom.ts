import {useSyncExternalStore, useCallback} from "react";
import {get} from "../core/getter";
import {set} from "../core/setter";
import {subscribe} from "../core/subscribe";
import type {Atom} from "../types";

export function useAtom<T>(atom: Atom<T>): [T, (val: T) => void] {
  const subscribeFn = useCallback(
    (callback: () => void) => subscribe(atom, callback),
    [atom]
  );

  const getSnapshot = useCallback(() => get(atom), [atom]);

  const state = useSyncExternalStore(subscribeFn, getSnapshot);

  return [state, (val: T) => set(atom, val)];
}
