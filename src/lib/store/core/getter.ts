import {Atom} from "../types";
import {valueMap} from "./internal";
import {hydrateIfNeeded} from "./hydration";

export function get<T>(atom: Atom<T>): T {
  hydrateIfNeeded(atom);
  return valueMap.get(atom)!;
}
