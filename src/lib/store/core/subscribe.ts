// /core/subscribe/index.ts
import {Atom} from "../types";
import {subscriberMap} from "./internal";

export function subscribe<T>(
  atom: Atom<T>,
  callback: (val: T) => void
): () => void {
  let subs = subscriberMap.get(atom);
  if (!subs) {
    subs = new Set();
    subscriberMap.set(atom, subs);
  }

  subs.add(callback);

  return () => {
    subs!.delete(callback);
    if (subs!.size === 0) {
      subscriberMap.delete(atom);
    }
  };
}
