// lib/store/core/hydration.ts
import {valueMap, persistMap} from "./internal";
import {Atom, PersistMeta} from "../types";

export function hydrateIfNeeded<T>(atom: Atom<T>) {
  const meta = persistMap.get(atom) as PersistMeta | undefined;
  if (!meta || meta.hydrated) return;

  try {
    const raw = meta.storage.getItem(meta.key);
    if (raw !== null) {
      const value = JSON.parse(raw);
      valueMap.set(atom, value);
    }
    meta.hydrated = true;
  } catch (e) {
    console.warn("Failed to hydrate atom from storage", e);
  }
}
