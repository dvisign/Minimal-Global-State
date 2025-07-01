// /lib/store/core/internalMaps.ts
import {Atom} from "../types";

// 현재 상태값 저장
export const valueMap = new WeakMap<Atom<any>, any>();

// 구독자 콜백 저장
export const subscriberMap = new WeakMap<Atom<any>, Set<(val: any) => void>>();

// ⬇️ persist 용 메타데이터 저장
export const persistMap = new WeakMap<
  Atom<any>,
  {
    key: string;
    storage: Storage;
    hydrated?: boolean;
  }
>();
