import {Atom} from "../types";
import {valueMap} from "./internal";
import {hydrateIfNeeded} from "./hydration";

export function get<T>(atom: Atom<T>): T {
  hydrateIfNeeded(atom); // ⬅️ 여기서 실행
  return valueMap.get(atom)!;
}
