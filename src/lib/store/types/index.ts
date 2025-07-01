// Atom<T>는 외부에서 사용하는 식별자 역할만 함
export interface Atom<T> {
  __atom__: true;
  __type__?: T; // 이게 있어야 useAtom에서 T를 추론할 수 있음
}

// 내부 저장소 타입: 외부에 노출되지 않음
export interface InternalAtom<T> {
  value: T;
  subscribers: Set<Subscriber<T>>;
}

// 구독자 콜백 타입
export type Subscriber<T> = (nextValue: T) => void;

// 파생 Atom 생성을 위한 getter 타입
export type Getter = <T>(atom: Atom<T>) => T;

// 파생 Atom
export interface DerivedAtom<T> extends Atom<T> {
  __derived__: true;
}

// 비동기 Atom (Suspense 대응용)
export interface AsyncAtom<T> extends Atom<T> {
  __async__: true;
  read(): T; // Suspense 호환 시 내부에서 throw
}
