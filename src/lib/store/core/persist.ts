import {persistMap} from "./internal";
import {Atom} from "../types";
import {atomStore} from "./createAtom";

export function persistAtom<T>(
  atom: Atom<T>,
  options: {key: string; storage: Storage}
): Atom<T> {
  persistMap.set(atom, {
    key: options.key,
    storage: options.storage,
    hydrated: false,
  });

  try {
    const raw = options.storage.getItem(options.key);
    if (raw === null) {
      const internal = atomStore.get(atom);
      if (internal) {
        options.storage.setItem(options.key, JSON.stringify(internal.value));
      }
    }
  } catch (e) {
    console.warn("Failed to initialize persist atom", e);
  }

  return atom;
}
