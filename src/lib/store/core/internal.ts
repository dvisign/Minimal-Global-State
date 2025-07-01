import {Atom} from "../types";

export const valueMap = new WeakMap<Atom<any>, any>();
export const subscriberMap = new WeakMap<Atom<any>, Set<(val: any) => void>>();
