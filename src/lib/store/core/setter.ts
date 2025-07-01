import {valueMap, subscriberMap, persistMap} from "./internal";
import {Atom} from "@/lib/store/types";

export function set<T>(atom: Atom<T>, newValue: T): void {
  const prev = valueMap.get(atom);
  if (Object.is(prev, newValue)) return;

  valueMap.set(atom, newValue);

  const persist = persistMap.get(atom);
  if (persist) {
    try {
      persist.storage.setItem(persist.key, JSON.stringify(newValue));
    } catch (e) {
      console.warn("Failed to persist atom to storage", e);
    }
  }

  const subs = subscriberMap.get(atom);
  subs?.forEach((cb) => cb(newValue));
}
