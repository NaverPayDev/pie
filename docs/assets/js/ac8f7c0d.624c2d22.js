"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4627],{6421:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>t,metadata:()=>a,toc:()=>o});var l=s(5723),r=s(4639);const t={},i="@naverpay/vanilla-store",a={id:"@naverpay/vanilla-store/README",title:"@naverpay/vanilla-store",description:"NPM Version",source:"@site/docs/@naverpay/vanilla-store/README.md",sourceDirName:"@naverpay/vanilla-store",slug:"/@naverpay/vanilla-store/",permalink:"/pie/docs/docs/@naverpay/vanilla-store/",draft:!1,unlisted:!1,editUrl:"https://github.com/NaverPayDev/pie/tree/main/packages/@naverpay/vanilla-store/README.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"\ud55c\uae00\\_\uc5ec\ubd80",permalink:"/pie/docs/docs/@naverpay/utils/src/utils/\ud55c\uae00_\uc5ec\ubd80"}},c={},o=[{value:"key features",id:"key-features",level:2},{value:"Minimum requirements",id:"minimum-requirements",level:2},{value:"Comparison",id:"comparison",level:2},{value:"Features",id:"features",level:2},{value:"<code>createVanillaStore</code>",id:"createvanillastore",level:3},{value:"Signatures",id:"signatures",level:4},{value:"Example",id:"example",level:4},{value:"<code>createVanillaSelect</code>",id:"createvanillaselect",level:3},{value:"Signatures",id:"signatures-1",level:4},{value:"Example",id:"example-1",level:4},{value:"<code>useStore</code>",id:"usestore",level:3},{value:"Signatures",id:"signatures-2",level:4},{value:"Example",id:"example-2",level:4},{value:"<code>useStoreSelector</code>",id:"usestoreselector",level:3},{value:"Signatures",id:"signatures-3",level:4},{value:"Example",id:"example-3",level:4}];function d(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h1,{id:"naverpayvanilla-store",children:"@naverpay/vanilla-store"}),"\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.img,{src:"https://img.shields.io/npm/v/%40naverpay%2Fvanilla-store",alt:"NPM Version"}),"\n",(0,l.jsx)(n.img,{src:"https://img.shields.io/bundlephobia/min/%40naverpay%2Fvanilla-store",alt:"NPM bundle size"}),"\n",(0,l.jsx)(n.img,{src:"https://img.shields.io/npm/dw/%40naverpay%2Fvanilla-store",alt:"NPM Downloads"})]}),"\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.code,{children:"@naverpay/vanilla-store"})," is a zero-dependency and extremely lightweight React state management solution."]}),"\n",(0,l.jsx)(n.h2,{id:"key-features",children:"key features"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"dual package exports (commonjs, esmodule)"}),"\n",(0,l.jsx)(n.li,{children:"fully tested"}),"\n",(0,l.jsx)(n.li,{children:"support external sync with Session and Local Storage"}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"minimum-requirements",children:"Minimum requirements"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"react@^18.0.0"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/NaverPayDev/browserslist-config",children:"https://github.com/NaverPayDev/browserslist-config"})}),"\n"]}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsx)(n.p,{children:'"Why does it only support React 18 or later?"'}),"\n",(0,l.jsxs)(n.p,{children:["It operates based on React@18's useSyncExternalStore, therefore, lower versions are not supported. While it is possible to provide backward compatibility using a ",(0,l.jsx)(n.a,{href:"https://www.npmjs.com/package/use-sync-external-store",children:"shim"}),", we are not considering it as it unnecessarily increases the bundle size."]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"comparison",children:"Comparison"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://bundlephobia.com/package/recoil@0.7.7",children:"recoil"}),": 79.4kb"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://bundlephobia.com/package/jotai@2.8.0",children:"jotai"}),": 8.7kb"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"@naverpay/vanilla-store"}),": ",(0,l.jsx)(n.a,{href:"https://bundlephobia.com/package/@naverpay/vanilla-store@0.1.0",children:"3.8kb"})," with polyfill!"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"features",children:"Features"}),"\n",(0,l.jsx)(n.h3,{id:"createvanillastore",children:(0,l.jsx)(n.code,{children:"createVanillaStore"})}),"\n",(0,l.jsx)(n.p,{children:"\uc2a4\ud1a0\uc5b4\ub97c \ub9cc\ub4dc\ub294 API \uc785\ub2c8\ub2e4. \ucef4\ud3ec\ub10c\ud2b8 \uc678\ubd80 \ub4f1 \ubc18\ubcf5\uc801\uc73c\ub85c \uc2e4\ud589\ub420 \uc5ec\uc9c0\uac00 \uc5c6\ub294 \ub3c5\ub9bd\uc801\uc778 \ud658\uacbd\uc5d0\uc11c \uc0dd\uc131\ud574\uc57c \uc62c\ubc14\ub974\uac8c \ud55c\ubc88\ub9cc \ub9cc\ub4e4\uc5b4\uc9c8 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,l.jsx)(n.h4,{id:"signatures",children:"Signatures"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"const createVanillaStore: (initialState: State, equalityFn?: (left: State, right: State) => boolean, options?: {\n    persist: {\n        type: PersistType;\n        key: string;\n        typeAssertion: (value: unknown) => value is State;\n    } | undefined;\n}): {\n    set: SetAction<State>;\n    get: () => State;\n    subscribe: (callback: () => void) => () => void;\n    persistStore: Persistent<State> | null;\n}\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.strong,{children:"arguments"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"arguments[0]"})," (required): \ub9cc\ub4e4\uace0\uc790 \ud558\ub294 \uc2a4\ud1a0\uc5b4\uc758 \uae30\ubcf8\uac12 \uc785\ub2c8\ub2e4."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"arguments[1]"})," (optional): \ucc38\uc870\uc548\uc815\uc131\uc744 \ubcf4\uc7a5\ud558\uae30 \uc704\ud55c \ub3d9\ub4f1 \ube44\uad50 \ud568\uc218\uc785\ub2c8\ub2e4. \ubb34\ubd84\ubcc4\ud55c \uac1d\uccb4 \uc7ac\uc0dd\uc131\uc73c\ub85c \uc778\ud55c \uba54\ubaa8\ub9ac \ub204\uc218 \uc624\ub958\uac00 \ubc1c\uc0dd\ud558\uac70\ub098, \uc131\ub2a5\uc744 \ucd5c\uc801\ud654\ud558\uace0\uc790 \ud560 \ub54c \uc815\uc758\ud569\ub2c8\ub2e4. \uae30\ubcf8\uac12\uc740 ",(0,l.jsx)(n.a,{href:"https://github.com/NaverPayDev/pie/blob/main/packages/vanilla-store/src/shallowEqual.ts",children:(0,l.jsx)(n.code,{children:"shallowEqual"})}),"\uc785\ub2c8\ub2e4."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"arguments[2]"})," (optional): ",(0,l.jsx)(n.code,{children:"options"})," \uc601\uc5ed\uc774\uba70, \ub2e4\uc74c\uacfc \uac19\uc740 \uac12\uc744 \uc778\uc218\ub85c \ubc1b\uc2b5\ub2c8\ub2e4.\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"persist"}),": \uc2a4\ud1a0\uc5b4\uc758 \uac12\uc744 ",(0,l.jsx)(n.code,{children:"localStorage"}),", ",(0,l.jsx)(n.code,{children:"sessionStorage"}),", ",(0,l.jsx)(n.code,{children:"redisStorage"})," (\uc9c0\uc6d0\uc608\uc815) \ub97c \uac01\uac01 \uc778\uc218\ub85c \ubc1b\uc2b5\ub2c8\ub2e4."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"key"}),": \uc704 \uc2a4\ud1a0\uc5b4\uc5d0\uc11c \uc0ac\uc6a9\ud560 \ud0a4 \uac12\uc785\ub2c8\ub2e4. \uc2a4\ud1a0\uc5b4\uc5d0\uc11c\ub294 \uc774 \uac12\uc758 \uc911\ubcf5 \uc5ec\ubd80\ub97c \ud604\uc7ac \ud655\uc778\ud574\uc8fc\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. (\uc9c0\uc6d0 \uc608\uc815) \ubc18\ub4dc\uc2dc \uc2a4\ud1a0\uc5b4 \uac04\uc758 \uac12\uc758 \uc720\uc77c\uc131\uc744 \ud655\uc778\ud558\uc2dc\uae30 \ubc14\ub78d\ub2c8\ub2e4."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"typeAssertion"}),": \uc678\ubd80 \uc2a4\ud1a0\uc5b4 \uac12\uc740 \ub300\ubd80\ubd84 \ubbff\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \ud0c0\uc785 \uac00\ub4dc \ud568\uc218\ub97c \uc5ec\uae30\uc5d0 \ub118\uaca8\uc8fc\uba74, \ud0c0\uc785\uc774 \ub9de\ub294 \uacbd\uc6b0\uc5d0\ub9cc \ud574\ub2f9 \uc2a4\ud1a0\uc5b4\uc5d0 \uac12\uc73c\ub85c \uc0ac\uc6a9\ud569\ub2c8\ub2e4. ",(0,l.jsx)(n.code,{children:"typeAssertion"}),"\uc774 \uc5c6\uc73c\uba74 \ud574\ub2f9 \uac12 \uc790\uccb4\ub97c \uc2a4\ud1a0\uc5b4\uc5d0 \ubc14\ub85c \ud560\ub2f9\ud569\ub2c8\ub2e4."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.strong,{children:"return"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"VanillaStore"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"get"}),": \ud604\uc7ac ",(0,l.jsx)(n.code,{children:"VanillaStore"}),"\uc758 \uac12\uc744 \ud655\uc778\ud560 \uc218 \uc788\ub294 \ud568\uc218\uc785\ub2c8\ub2e4."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"set"}),": \ud604\uc7ac ",(0,l.jsx)(n.code,{children:"VanillaStore"}),"\uc758 \uac12\uc744 \uc124\uc815\ud560 \uc218 \uc788\ub294 \ud568\uc218\uc785\ub2c8\ub2e4. ",(0,l.jsx)(n.code,{children:"VanillaStore"}),"\uc758 ",(0,l.jsx)(n.code,{children:"State"}),"\uc640 \uac19\uc740 \ud0c0\uc785\uc744 \ubc1b\uc73c\uba70, \uc11c\ubc84\uc5d0\uc11c\ub294 \uba54\ubaa8\ub9ac \ub204\uc218 \ub610\ub294 \ubd88\ud544\uc694\ud55c \uc911\ubcf5 \uc2e4\ud589\uc758 \uc704\ud5d8\uc73c\ub85c \uc778\ud574 \uc2e4\ud589\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"subscribe"}),": \uc678\ubd80\uc5d0 \uc81c\uacf5\ub418\ub294 \uac12\uc774 \uc544\ub2d9\ub2c8\ub2e4. \ud604\uc7ac ",(0,l.jsx)(n.code,{children:"VanillaStore"}),"\uc758 \uac12 \ubcc0\uacbd\uc744 \uad6c\ub3c5\ud560 \uc218 \uc788\ub294 \ud568\uc218\uc785\ub2c8\ub2e4."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"persistStore"}),": \uc678\ubd80\uc5d0 \uc81c\uacf5\ub418\ub294 \uac12\uc774 \uc544\ub2d9\ub2c8\ub2e4. \ud604\uc7ac ",(0,l.jsx)(n.code,{children:"VanillaStore"}),"\uc758 \uac12\uc744 \uc678\ubd80\uc5d0 \uc800\uc7a5\ud558\ub294 \uc5ed\ud560\uc744 \ud558\ub294 \uc778\uc2a4\ud134\uc2a4\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h4,{id:"example",children:"Example"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-tsx",children:"type Store = {\n    name: string\n    age: number\n}\n\nfunction isStoreValue(value: unknown): value is Store {\n    if (typeof value !== 'object') {\n        return false\n    }\n    if (value === null) {\n        return false\n    }\n    if (typeof (value as any).name !== 'string') {\n        return false\n    }\n    if (typeof (value as any).age !== 'number') {\n        return false\n    }\n    return true\n}\n\nconst store = createVanillaStore<Store>(\n    {name: '\uae40\uc6a9\ucc2c', age: 30},\n    {persist: {type: 'sessionStorage', key: 'myname', typeAssertion: isStoreValue}},\n)\n"})}),"\n",(0,l.jsx)(n.h3,{id:"createvanillaselect",children:(0,l.jsx)(n.code,{children:"createVanillaSelect"})}),"\n",(0,l.jsxs)(n.p,{children:["VanillaStore\uc758 \uc0c1\ud0dc\ub97c \uc815\uc81c\ud55c \uac12\uc744 \uc0c1\ud0dc\ub85c \uad00\ub9ac\ud560 \ub54c \uc0ac\uc6a9\ub429\ub2c8\ub2e4. ",(0,l.jsx)(n.code,{children:"createVanillaSelect"}),"\ub85c\ubd80\ud130 \uc0dd\uc131\ub41c \uc2a4\ud1a0\uc5b4\ub294 \uc77d\uae30\ub9cc \uac00\ub2a5\ud55c \uc2a4\ud1a0\uc5b4\ub85c \uc678\ubd80\uc5d0 ",(0,l.jsx)(n.code,{children:"set"}),"\uc744 \uc81c\uacf5\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4."]}),"\n",(0,l.jsx)(n.h4,{id:"signatures-1",children:"Signatures"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"const createVanillaSelect: (store: {\n    set: SetAction<StoreState>;\n    get: () => StoreState;\n    subscribe: (callback: () => void) => () => void;\n    persistStore: Persistent<StoreState> | null;\n}, selectFn: (state: StoreState) => State, equalityFn: (a: State, b: State) => boolean, options?: {\n    persist: {\n        type: PersistType;\n        key: string;\n        typeAssertion: (value: unknown) => value is State;\n    } | undefined;\n}): {\n    set: () => void;\n    get: () => State;\n    subscribe: (callback: () => void) => () => void;\n    persistStore: Persistent<State> | null;\n}\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.strong,{children:"arguments"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"arguments[0]"})," (required): \ubca0\uc774\uc2a4 \uc2a4\ud1a0\uc5b4\uc785\ub2c8\ub2e4."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"arguments[1]"})," (required): ",(0,l.jsx)(n.code,{children:"arguments[0]"}),"\uc73c\ub85c\ubd80\ud130 \uc0c8 \uac12\uc744 \ubc18\ud658\ud560 \uc140\ub809\ud130 \ud568\uc218\uc785\ub2c8\ub2e4."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"arguments[2]"})," (required): \ucc38\uc870\uc548\uc815\uc131\uc744 \ubcf4\uc7a5\ud558\uae30 \uc704\ud55c \ub3d9\ub4f1 \ube44\uad50 \ud568\uc218\uc785\ub2c8\ub2e4. \uae30\ubcf8\uac12\uc740 ",(0,l.jsx)(n.a,{href:"https://github.com/NaverPayDev/pie/blob/main/packages/vanilla-store/src/shallowEqual.ts",children:(0,l.jsx)(n.code,{children:"shallowEqual"})}),"\uc785\ub2c8\ub2e4."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"arguments[3]"})," (optional): ",(0,l.jsx)(n.code,{children:"options"})," \uc601\uc5ed\uc774\uba70, \ub2e4\uc74c\uacfc \uac19\uc740 \uac12\uc744 \uc778\uc218\ub85c \ubc1b\uc2b5\ub2c8\ub2e4.\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"persist"}),": \uc2a4\ud1a0\uc5b4\uc758 \uac12\uc744 ",(0,l.jsx)(n.code,{children:"localStorage"}),", ",(0,l.jsx)(n.code,{children:"sessionStorage"}),", ",(0,l.jsx)(n.code,{children:"redisStorage"})," (\uc9c0\uc6d0\uc608\uc815) \ub97c \uac01\uac01 \uc778\uc218\ub85c \ubc1b\uc2b5\ub2c8\ub2e4."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"key"}),": \uc704 \uc2a4\ud1a0\uc5b4\uc5d0\uc11c \uc0ac\uc6a9\ud560 \ud0a4 \uac12\uc785\ub2c8\ub2e4. \uc2a4\ud1a0\uc5b4\uc5d0\uc11c\ub294 \uc774 \uac12\uc758 \uc911\ubcf5 \uc5ec\ubd80\ub97c \ud604\uc7ac \ud655\uc778\ud574\uc8fc\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. (\uc9c0\uc6d0 \uc608\uc815) \ubc18\ub4dc\uc2dc \uc2a4\ud1a0\uc5b4 \uac04\uc758 \uac12\uc758 \uc720\uc77c\uc131\uc744 \ud655\uc778\ud558\uc2dc\uae30 \ubc14\ub78d\ub2c8\ub2e4."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"typeAssertion"}),": \uc678\ubd80 \uc2a4\ud1a0\uc5b4 \uac12\uc740 \ub300\ubd80\ubd84 \ubbff\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \ud0c0\uc785 \uac00\ub4dc \ud568\uc218\ub97c \uc5ec\uae30\uc5d0 \ub118\uaca8\uc8fc\uba74, \ud0c0\uc785\uc774 \ub9de\ub294 \uacbd\uc6b0\uc5d0\ub9cc \ud574\ub2f9 \uc2a4\ud1a0\uc5b4\uc5d0 \uac12\uc73c\ub85c \uc0ac\uc6a9\ud569\ub2c8\ub2e4. ",(0,l.jsx)(n.code,{children:"typeAssertion"}),"\uc774 \uc5c6\uc73c\uba74 \ud574\ub2f9 \uac12 \uc790\uccb4\ub97c \uc2a4\ud1a0\uc5b4\uc5d0 \ubc14\ub85c \ud560\ub2f9\ud569\ub2c8\ub2e4."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.strong,{children:"return"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"VanillaSelect"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"get"}),": \ud604\uc7ac ",(0,l.jsx)(n.code,{children:"VanillaSelect"}),"\uc758 \uac12\uc744 \ud655\uc778\ud560 \uc218 \uc788\ub294 \ud568\uc218\uc785\ub2c8\ub2e4."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"set"}),": \uc678\ubd80\uc5d0 \uc81c\uacf5\ub418\ub294 \uac12\uc774 \uc544\ub2d9\ub2c8\ub2e4. \uc0ac\uc6a9\uc790\ub294 ",(0,l.jsx)(n.code,{children:"set"}),"\uc744 \uc9c1\uc811 \ud638\ucd9c\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. ",(0,l.jsx)(n.code,{children:"persist"})," \uc635\uc158\uc774 \ud65c\uc131\ud654\ub418\uc5b4\uc788\ub294 \uacbd\uc6b0, \uc678\ubd80 \uc2a4\ud1a0\uc5b4\uc5d0 \uac12\uc744 \ub3d9\uae30\ud654\ud558\ub294 \uc6a9\ub3c4\uc785\ub2c8\ub2e4."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"subscribe"}),": \uc678\ubd80\uc5d0 \uc81c\uacf5\ub418\ub294 \uac12\uc774 \uc544\ub2d9\ub2c8\ub2e4. \ud604\uc7ac ",(0,l.jsx)(n.code,{children:"VanillaSelect"}),"\uc758 \uac12 \ubcc0\uacbd\uc744 \uad6c\ub3c5\ud560 \uc218 \uc788\ub294 \ud568\uc218\uc785\ub2c8\ub2e4."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"persistStore"}),": \uc678\ubd80\uc5d0 \uc81c\uacf5\ub418\ub294 \uac12\uc774 \uc544\ub2d9\ub2c8\ub2e4. \ud604\uc7ac ",(0,l.jsx)(n.code,{children:"VanillaSelect"}),"\uc758 \uac12\uc744 \uc678\ubd80\uc5d0 \uc800\uc7a5\ud558\ub294 \uc5ed\ud560\uc744 \ud558\ub294 \uc778\uc2a4\ud134\uc2a4\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h4,{id:"example-1",children:"Example"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"const personStore = createVanillaStore({\n    name: {\n        first: 'NaverPay',\n        last: 'Dev',\n    },\n    address: {\n        country: 'South Korea',\n        city: 'Seoul'\n    },\n})\n\nconst addressStore = createVanillaSelect(personStore, ({address: {country, city}}) => `${city}, ${country}`)\n"})}),"\n",(0,l.jsx)(n.h3,{id:"usestore",children:(0,l.jsx)(n.code,{children:"useStore"})}),"\n",(0,l.jsx)(n.p,{children:"\ub9ac\uc561\ud2b8 \ucef4\ud3ec\ub10c\ud2b8 \ub0b4\ubd80\uc5d0\uc11c \uc0ac\uc6a9\ud560 \uc218 \uc788\ub294 \uc2a4\ud1a0\uc5b4 \ud6c5\uc785\ub2c8\ub2e4."}),"\n",(0,l.jsx)(n.h4,{id:"signatures-2",children:"Signatures"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"function useStore<State>(store: VanillaSelect<State>, initialValue?: State): [State, never]\nfunction useStore<State>(store: VanillaStore<State>, initialValue?: State): [State, SetAction<State>]\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.strong,{children:"arguments"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"store"}),": ",(0,l.jsx)(n.code,{children:"createVanillaStore"}),"\ub85c \uc0dd\uc131\ud55c \uc2a4\ud1a0\uc5b4\ub97c \ub118\uaca8\uc8fc\uc138\uc694."]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.strong,{children:"return"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"return[0]"}),": \ud604\uc7ac \uc2a4\ud1a0\uc5b4\uc758 \uac12"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"return[1]"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"VanillaStore"}),": \ud604\uc7ac \uc2a4\ud1a0\uc5b4\uc758 \uac12\uc744 \uc4f8 \uc218 \uc788\ub294 \ud568\uc218\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"VanillaSelect"}),": select\uc758 \uacbd\uc6b0 \uac12\uc744 \uc4f8 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h4,{id:"example-2",children:"Example"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-tsx",children:'const [state, setStore] = useStore(store)\n\nconst handleChange = (e: ChangeEvent<HTMLInputElement>) => {\n    setStore((prev) => {\n        return {...prev, name: e.target.value}\n    })\n}\n\nreturn (\n    <>\n        <h2>{state.name}</h2>\n        <h3>{state.age}</h3>\n        <input type="text" value={state.name} onChange={handleChange} />\n    </>\n)\n'})}),"\n",(0,l.jsx)(n.h3,{id:"usestoreselector",children:(0,l.jsx)(n.code,{children:"useStoreSelector"})}),"\n",(0,l.jsxs)(n.p,{children:["\ub9ac\uc561\ud2b8 \ucef4\ud3ec\ub10c\ud2b8 \ub0b4\ubd80\uc5d0\uc11c \uc0ac\uc6a9\ud560 \uc218 \uc788\ub294 \uc2a4\ud1a0\uc5b4 \ud6c5\uc785\ub2c8\ub2e4. ",(0,l.jsx)(n.code,{children:"useStore"}),"\uc640 \ub2e4\ub974\uac8c, ",(0,l.jsx)(n.code,{children:"store"}),"\uac00 \uac1d\uccb4\uc778 \uacbd\uc6b0 \ud544\uc694\ud55c \uac12\ub9cc \ubf51\uc544\uc11c \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. ",(0,l.jsx)(n.code,{children:"store"})," \uac12\uc774 \uac1d\uccb4\ub77c \ud558\ub354\ub77c\ub3c4, \ud574\ub2f9 ",(0,l.jsx)(n.code,{children:"selector"}),"\uc758 \uac12\uc774 \ubcc0\uacbd\ub418\uc9c0 \uc54a\uc558\ub2e4\uba74 \ub9ac\ub80c\ub354\ub9c1\uc744 \uc57c\uae30\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4."]}),"\n",(0,l.jsx)(n.h4,{id:"signatures-3",children:"Signatures"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"function useStoreSelector<State, Value>(\n    store: VanillaSelect<State>,\n    selector: (state: State) => Value,\n    options?: {initialStoreValue?: State; isEqual?: (a: Value, b: Value) => boolean},\n): [Value, never]\nfunction useStoreSelector<State, Value>(\n    store: VanillaStore<State>,\n    selector: (state: State) => Value,\n    options?: {initialStoreValue?: State; isEqual?: (a: Value, b: Value) => boolean},\n): [Value, SetAction<State>]\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.strong,{children:"arguments"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"store"}),": ",(0,l.jsx)(n.code,{children:"createVanillaStore"}),"\ub85c \uc0dd\uc131\ud55c \uc2a4\ud1a0\uc5b4\ub97c \ub118\uaca8\uc8fc\uc138\uc694."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"selector"}),": ",(0,l.jsx)(n.code,{children:"store"}),"\uc5d0\uc11c \uac00\uc838\uc624\uace0 \uc2f6\uc740 \uac12\ub9cc \uac00\uc838\uc624\ub294 \ud568\uc218\ub97c \ub118\uaca8\uc8fc\uc138\uc694. \ubc18\ub4dc\uc2dc \uc774 \uac12\uc740 \ucc38\uc870 \uc548\uc815\uc131\uc774 \ubcf4\uc7a5\ub418\uc5b4 \uc788\uc5b4\uc57c \ud569\ub2c8\ub2e4. (",(0,l.jsx)(n.code,{children:"useCallback"}),"\ub610\ub294 \ucef4\ud3ec\ub10c\ud2b8 \uc678\ubd80 \uc120\uc5b8)"]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.strong,{children:"return"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"return[0]"}),": \ud604\uc7ac \uc2a4\ud1a0\uc5b4\uc758 \uac12 \uc911 ",(0,l.jsx)(n.code,{children:"selector"})," \ud568\uc218\ub97c \ud1b5\ud574 \ubc18\ud658\ub41c \uac12"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"return[1]"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"VanillaStore"}),": \ud604\uc7ac \uc2a4\ud1a0\uc5b4\uc758 \uac12\uc744 \uc4f8 \uc218 \uc788\ub294 \ud568\uc218\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"VanillaSelect"}),": select\uc758 \uacbd\uc6b0 \uac12\uc744 \uc4f8 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h4,{id:"example-3",children:"Example"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-tsx",children:"function Name() {\n    const nameSelector = useCallback((state: Store) => state.name, [])\n    const [name] = useStoreSelector(store, nameSelector)\n\n    return <div>{name}</div>\n}\n"})})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(d,{...e})}):d(e)}},4639:(e,n,s)=>{s.d(n,{R:()=>i,x:()=>a});var l=s(2155);const r={},t=l.createContext(r);function i(e){const n=l.useContext(t);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),l.createElement(t.Provider,{value:n},e.children)}}}]);