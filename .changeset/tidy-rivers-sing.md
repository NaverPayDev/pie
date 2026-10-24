---
"@naverpay/svg-manager": major
---

[svg-manager] SvgUniqueID를 useId 기반으로 재작성

매 렌더마다 새 난수로 id를 만들어 SSR hydration 불일치를 일으키던 방식을 React `useId`로 교체하고, id 스코핑 로직을 단순화합니다. 생성된 id는 `toSafeId`로 selector/url-safe 토큰으로 정규화되어 서버와 클라이언트에서 동일한 결과를 냅니다.

**Breaking Changes**

- 공개 `toSingleton` export 제거
- `'use client'` 컴포넌트로 전환 (RSC에서 client 경계 생성)

> `useId`는 React 18+ 전용이지만 peerDependencies는 기존과 동일한 `^18 || ^19`로, 이번 변경으로 새로 생긴 요건은 아닙니다.

Issue: [#193](https://github.com/NaverPayDev/pie/issues/193)
