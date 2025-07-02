import {valueMap, persistMap} from "./internal";
import {atomStore} from "./createAtom";
import {Atom} from "../types";

export function hydrateIfNeeded<T>(atom: Atom<T>) {
  const meta = persistMap.get(atom);
  const hasValue = valueMap.has(atom);
  if (hasValue) return;

  // 퍼시스트가 있다면: 스토리지에서 복원
  if (meta && !meta.hydrated) {
    try {
      const raw = meta.storage.getItem(meta.key);
      if (raw !== null) {
        const parsed = JSON.parse(raw);
        valueMap.set(atom, parsed);
      }
      meta.hydrated = true;
    } catch (e) {
      console.warn("Failed to hydrate atom", e);
    }
    return;
  }

  // 퍼시스트가 없는 경우: 초기값 fallback
  const internal = atomStore.get(atom);
  if (internal) {
    valueMap.set(atom, internal.value);
  }
}
