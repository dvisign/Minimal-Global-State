import {valueMap, persistMap} from "./internal";
import {atomStore} from "./createAtom";
import {Atom} from "../types";

export function hydrateIfNeeded<T>(atom: Atom<T>) {
  const meta = persistMap.get(atom);
  const hasValue = valueMap.has(atom);
  if (hasValue) return;

  let hydrated = false;

  if (meta && !meta.hydrated) {
    try {
      const raw = meta.storage.getItem(meta.key);
      if (raw !== null) {
        const parsed = JSON.parse(raw);
        valueMap.set(atom, parsed);
        hydrated = true;
      }
      meta.hydrated = true;
    } catch (e) {
      console.warn("Failed to hydrate atom", e);
    }
  }

  if (!hydrated) {
    const internal = atomStore.get(atom);
    if (internal) {
      valueMap.set(atom, internal.value);
    }
  }
}
