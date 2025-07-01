// /core/setter/index.ts
import {Atom} from "../types";
import {valueMap, subscriberMap} from "./internal";

export function set<T>(atom: Atom<T>, newValue: T): void {
  const prev = valueMap.get(atom);
  if (Object.is(prev, newValue)) return;

  valueMap.set(atom, newValue);

  const subs = subscriberMap.get(atom);
  subs?.forEach((cb) => cb(newValue));
}
