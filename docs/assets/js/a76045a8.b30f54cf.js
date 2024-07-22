"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1975],{6187:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>d,toc:()=>a});var s=n(3159),t=n(15);const i={},o="deferredPromise",d={id:"@naverpay/utils/0.1.0/src/utils/deferredPromise",title:"deferredPromise",description:"pending \uc0c1\ud0dc\uc758 promise \uac1d\uccb4\ub97c \uc0dd\uc131\ud558\uc5ec, \uc678\ubd80\uc5d0\uc11c resolve, reject \ud560 \uc218 \uc788\uac8c \ud569\ub2c8\ub2e4.",source:"@site/docs/@naverpay/utils/0.1.0/src/utils/deferredPromise.md",sourceDirName:"@naverpay/utils/0.1.0/src/utils",slug:"/@naverpay/utils/0.1.0/src/utils/deferredPromise",permalink:"/pie/docs/docs/@naverpay/utils/0.1.0/src/utils/deferredPromise",draft:!1,unlisted:!1,editUrl:"https://github.com/NaverPayDev/pie/tree/main/packages/@naverpay/utils/0.1.0/src/utils/deferredPromise.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"disassemble\ubb38\uc790",permalink:"/pie/docs/docs/@naverpay/utils/0.1.0/src/utils/disassemble\ubb38\uc790"},next:{title:"deepMerge",permalink:"/pie/docs/docs/@naverpay/utils/0.1.0/src/utils/deepMerge"}},c={},a=[{value:"\uc0ac\uc6a9 \uc608\uc81c",id:"\uc0ac\uc6a9-\uc608\uc81c",level:2}];function l(e){const r={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.h1,{id:"deferredpromise",children:"deferredPromise"}),"\n",(0,s.jsx)(r.p,{children:"pending \uc0c1\ud0dc\uc758 promise \uac1d\uccb4\ub97c \uc0dd\uc131\ud558\uc5ec, \uc678\ubd80\uc5d0\uc11c resolve, reject \ud560 \uc218 \uc788\uac8c \ud569\ub2c8\ub2e4."}),"\n",(0,s.jsx)(r.h2,{id:"\uc0ac\uc6a9-\uc608\uc81c",children:"\uc0ac\uc6a9 \uc608\uc81c"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"import {DeferredPromise} from '@naverpay/utils'\n\nconst deferredPromise = new DeferredPromise<string>()\n\nasync function waitAndPrint() {\n    const name = await deferredPromise // \uc77c\ubc18\uc801\uc778 promise\ub85c \ucde8\uae09 \uac00\ub2a5\n    console.log(`hello, ${name}!`)\n}\n\nwaitAndPrint()\nwaitAndPrint()\nwaitAndPrint() // \uc774 \uc2dc\uc810\uc5d0\ub294 console.log\uac00 \ucd9c\ub825\ub418\uc9c0 \uc54a\uc74c\n\ndeferredPromise.resolve('world')\n// \uc774 \uc2dc\uc810\uc5d0\uc11c \"hello, world!\"\uac00 3\ubc88 \ucd9c\ub825\ub428\n"})})]})}function p(e={}){const{wrapper:r}={...(0,t.R)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},15:(e,r,n)=>{n.d(r,{R:()=>o,x:()=>d});var s=n(1855);const t={},i=s.createContext(t);function o(e){const r=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function d(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),s.createElement(i.Provider,{value:r},e.children)}}}]);