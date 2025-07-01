// /core/getter/index.ts
import {Atom} from "../types";
import {valueMap} from "./internal";

export function get<T>(atom: Atom<T>): T {
  return valueMap.get(atom)!;
}
