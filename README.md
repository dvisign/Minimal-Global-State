# 🧪 Custom Atom 상태관리 라이브러리

React를 기반으로 작동하지만, 프레임워크에 종속되지 않도록 설계된 최소 단위의 상태관리 라이브러리입니다.  
`createAtom`, `useAtom`, `persistAtom` 등을 통해 전역 상태를 생성하고 구독할 수 있으며, React 외 환경에서도 사용할 수 있도록 core와 react hook을 분리하여 설계했습니다.

## 📦 주요 기능

- `createAtom`: 상태의 기본 단위인 Atom을 생성합니다.
- `useAtom`: React 환경에서 상태를 subscribe하고 값을 읽고 쓸 수 있는 hook입니다.
- `persistAtom`: Atom 값을 localStorage 또는 sessionStorage에 저장할 수 있는 wrapper입니다.
- `subscribe`: React 외부에서 수동으로 상태를 구독할 수 있는 인터페이스.
- `set`, `get`: Atom의 값을 수동으로 읽거나 변경할 수 있는 API입니다.
- `hydrateIfNeeded`: 초기 렌더 시 Atom을 스토리지로부터 동기화합니다.

---

# 설계 시 고려한 사항 및 기술적 선택

1. React와의 의존성 분리
   useSyncExternalStore를 통해 React 환경에서만 상태를 구독하도록 제한

core 로직(createAtom, get, set, subscribe)은 React에 의존하지 않음

2. 구독자 관리 최적화
   subscribe는 Set을 사용하여 중복 없이 구독자 관리

구독자가 0이 되면 WeakMap에서 해당 Atom 관련 정보를 제거하여 메모리 누수 방지

3. Persist 기능 분리
   persistAtom을 통해 optional하게 상태의 영속성을 부여

hydrateIfNeeded는 최초 호출 시 1회만 수행되어 불필요한 JSON parsing을 피함

---

# 동일 값 판단 방식

내부적으로 Object.is(prev, next)를 사용하여 shallow comparison 수행

값이 같으면 subscriber 호출 및 렌더링 생략

---

# React 연동 시 문제 및 해결

1. useSyncExternalStore의 getSnapshot이 계속 호출됨

- 원인: getSnapshot이 순수하지 않거나, 초기화 순서에서 hydrateIfNeeded가 값 없이 반환되는 경우
- 해결: valueMap에 값이 없으면 atomStore의 초기값으로 fallback, hydrate 로직을 get 호출 이전에 강제 수행하여 React에서 무한 렌더 방지

2. DevTools에서 불필요한 깜빡임 (리렌더처럼 보임)

- 원인: React.StrictMode의 이중 호출 + useSyncExternalStore의 특성
- 해결: 실제 렌더 여부는 useEffect(() => {})를 통해 확인

---

# 선택 요구사항 구현 내용

- Frameworkless: get, set, subscribe만으로 동작 가능

---

# 구현하지 못한 부분과 계획

1. 파생 Atom: 현재 구현된 core에서 getter는 value만 꺼내 줄 뿐, 어떤 atom이 value를 get했는지 추적 할 수 없기 때문, 그렇기 때문에 getter 호출 시점에 추적 할 수 있는 값과, 계산로직을 저장하고 호출 할 수 있는 재 계산 메소드가 필요.
2. 비동기 Atom: 구조 개선 필요

   - value를 동기적 값만 제공
   - getter에서 promise를 반환하지 않음

3. 배치 업데이트: setter 함수들을 모아 하나의 큐에서 처리하도록 변경 필요
