"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7652],{9320:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>u,frontMatter:()=>o,metadata:()=>r,toc:()=>l});var t=s(3159),i=s(15);const o={},c="debounce",r={id:"@naverpay/utils/main/src/utils/debounce",title:"debounce",description:"\ub514\ubc14\uc6b4\uc2a4 \ud568\uc218\ub294 \ud2b9\uc815 \ud568\uc218\uac00 \ub108\ubb34 \uc790\uc8fc \ud638\ucd9c\ub418\uc9c0 \uc54a\ub3c4\ub85d \ubcf4\uc7a5\ud558\ub294 \uc720\ud2f8\ub9ac\ud2f0\uc785\ub2c8\ub2e4. \uc0ac\uc6a9\uc790\uac00 \uc785\ub825 \uc774\ubca4\ud2b8(\uc608: \ud0a4 \uc785\ub825, \ud074\ub9ad \ub610\ub294 \ucc3d \ud06c\uae30 \uc870\uc815)\ub97c \ucc98\ub9ac\ud560 \ub54c\uc640 \uac19\uc774 \ud568\uc218\uac00 \ube60\ub974\uac8c \uc5ec\ub7ec \ubc88 \ud2b8\ub9ac\uac70\ub420 \uc218 \uc788\ub294 \uc2dc\ub098\ub9ac\uc624\uc5d0\uc11c \ud2b9\ud788 \uc720\uc6a9\ud569\ub2c8\ub2e4. \ub514\ubc14\uc6b4\uc2a4 \ud568\uc218\ub97c \uc0ac\uc6a9\ud558\uba74 \uc9c0\uc815\ub41c \ube44\ud65c\uc131 \uae30\uac04 \ud6c4\uc5d0\ub9cc \ud568\uc218\uac00 \ud638\ucd9c\ub418\ub3c4\ub85d \ud558\uc5ec \uc131\ub2a5\uc744 \ud5a5\uc0c1\uc2dc\ud0a4\uace0 \ubd88\ud544\uc694\ud55c \uc791\uc5c5\uc744 \ubc29\uc9c0\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",source:"@site/docs/@naverpay/utils/main/src/utils/debounce.md",sourceDirName:"@naverpay/utils/main/src/utils",slug:"/@naverpay/utils/main/src/utils/debounce",permalink:"/pie/docs/docs/@naverpay/utils/main/src/utils/debounce",draft:!1,unlisted:!1,editUrl:"https://github.com/NaverPayDev/pie/tree/main/packages/@naverpay/utils/main/src/utils/debounce.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"deepMerge",permalink:"/pie/docs/docs/@naverpay/utils/main/src/utils/deepMerge"},next:{title:"createUrlLike",permalink:"/pie/docs/docs/@naverpay/utils/main/src/utils/createUrlLike"}},a={},l=[{value:"\uc8fc\uc694 \uae30\ub2a5",id:"\uc8fc\uc694-\uae30\ub2a5",level:2},{value:"\uc0ac\uc6a9\uc608\uc81c",id:"\uc0ac\uc6a9\uc608\uc81c",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"debounce",children:"debounce"}),"\n",(0,t.jsx)(n.p,{children:"\ub514\ubc14\uc6b4\uc2a4 \ud568\uc218\ub294 \ud2b9\uc815 \ud568\uc218\uac00 \ub108\ubb34 \uc790\uc8fc \ud638\ucd9c\ub418\uc9c0 \uc54a\ub3c4\ub85d \ubcf4\uc7a5\ud558\ub294 \uc720\ud2f8\ub9ac\ud2f0\uc785\ub2c8\ub2e4. \uc0ac\uc6a9\uc790\uac00 \uc785\ub825 \uc774\ubca4\ud2b8(\uc608: \ud0a4 \uc785\ub825, \ud074\ub9ad \ub610\ub294 \ucc3d \ud06c\uae30 \uc870\uc815)\ub97c \ucc98\ub9ac\ud560 \ub54c\uc640 \uac19\uc774 \ud568\uc218\uac00 \ube60\ub974\uac8c \uc5ec\ub7ec \ubc88 \ud2b8\ub9ac\uac70\ub420 \uc218 \uc788\ub294 \uc2dc\ub098\ub9ac\uc624\uc5d0\uc11c \ud2b9\ud788 \uc720\uc6a9\ud569\ub2c8\ub2e4. \ub514\ubc14\uc6b4\uc2a4 \ud568\uc218\ub97c \uc0ac\uc6a9\ud558\uba74 \uc9c0\uc815\ub41c \ube44\ud65c\uc131 \uae30\uac04 \ud6c4\uc5d0\ub9cc \ud568\uc218\uac00 \ud638\ucd9c\ub418\ub3c4\ub85d \ud558\uc5ec \uc131\ub2a5\uc744 \ud5a5\uc0c1\uc2dc\ud0a4\uace0 \ubd88\ud544\uc694\ud55c \uc791\uc5c5\uc744 \ubc29\uc9c0\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.h2,{id:"\uc8fc\uc694-\uae30\ub2a5",children:"\uc8fc\uc694 \uae30\ub2a5"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Leading Edge Execution: \ub514\ubc14\uc6b4\uc2a4 \uae30\uac04 \ub0b4 \uccab \ubc88\uc9f8 \ud638\ucd9c \uc2dc \ud568\uc218\uac00 \uc989\uc2dc \uc2e4\ud589\ub418\ub3c4\ub85d \uc120\ud0dd\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.li,{children:"Trailing Edge Execution: \ub514\ubc14\uc6b4\uc2a4 \uae30\uac04 \ub0b4 \ub9c8\uc9c0\ub9c9 \ud638\ucd9c \ud6c4 \ud568\uc218\uac00 \uc2e4\ud589\ub418\ub3c4\ub85d \uc120\ud0dd\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.li,{children:"Max Wait Time: \uc9c0\uc815\ub41c \uae30\uac04 \ub0b4\uc5d0 \ud568\uc218\uac00 \ucd5c\uc18c \ud55c \ubc88 \ud638\ucd9c\ub418\ub3c4\ub85d \ucd5c\ub300 \ub300\uae30 \uc2dc\uac04\uc744 \uac15\uc81c\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"\uc0ac\uc6a9\uc608\uc81c",children:"\uc0ac\uc6a9\uc608\uc81c"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"import {debounce} from '@naverpay/utils'\n\nconst saveInput = debounce((input) => {\n    console.log('Saving data:', input)\n}, 200)\n\n// \uc0ac\uc6a9\uc790 \uc785\ub825 \uc2dc\ubbac\ub808\uc774\uc158\nsaveInput('a')\nsaveInput('ab')\nsaveInput('abc')\n\n// 200ms \ub0b4\uc5d0 \ub9c8\uc9c0\ub9c9 \ud638\ucd9c\ub9cc \ud568\uc218 \uc2e4\ud589\uc73c\ub85c \uc774\uc5b4\uc9d1\ub2c8\ub2e4\nsetTimeout(() => saveInput('abcd'), 250) // \uc774 \ud638\ucd9c\uc740 \ud568\uc218\ub97c \ud2b8\ub9ac\uac70\ud569\ub2c8\ub2e4\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"import {debounce} from '@naverpay/utils'\n\n// \uccab \ubc88\uc9f8 \uc2a4\ud06c\ub864 \uc774\ubca4\ud2b8 \uc2dc \ud568\uc218\uac00 \uc989\uc2dc \ud2b8\ub9ac\uac70\ub429\ub2c8\ub2e4\n// 300ms \uc774\ub0b4\uc758 \ud6c4\uc18d \uc2a4\ud06c\ub864 \uc774\ubca4\ud2b8\ub294 \ubb34\uc2dc\ub429\ub2c8\ub2e4\nconst logScrollPosition = debounce(\n    () => {\n        console.log('Scroll position:', window.scrollY)\n    },\n    300,\n    {leading: true},\n)\n\nwindow.addEventListener('scroll', logScrollPosition)\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"import {debounce} from '@naverpay/utils'\n\n// \uc0ac\uc6a9\uc790\uac00 300ms \ub3d9\uc548 \uc785\ub825\uc744 \uc911\uc9c0\ud55c \ud6c4\uc5d0\ub9cc \ud568\uc218\uac00 \ud2b8\ub9ac\uac70\ub429\ub2c8\ub2e4\nconst searchSuggestions = debounce(\n    (query) => {\n        console.log('Fetching suggestions for:', query)\n    },\n    300,\n    {trailing: true},\n)\n\ndocument.getElementById('searchInput').addEventListener('input', (event) => {\n    searchSuggestions(event.target.value)\n})\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"import {debounce} from '@naverpay/utils'\n\nconst resizeHandler = debounce(\n    () => {\n        console.log('Window resized')\n    },\n    200,\n    {maxWait: 1000},\n)\n\n// \uc0ac\uc6a9\uc790\uac00 \ucc3d \ud06c\uae30\ub97c \uc870\uc815\ud560 \ub54c resizeHandler\ub294 \ucd5c\ub300 1000ms\ub9c8\ub2e4 \uc2e4\ud589\ub429\ub2c8\ub2e4.\n// \uc774\ub294 \ucc3d \ud06c\uae30\ub97c \uc9c0\uc18d\uc801\uc73c\ub85c \uc870\uc815\ud558\ub354\ub77c\ub3c4 \ud568\uc218\uac00 \uc801\uc5b4\ub3c4 1\ucd08\uc5d0 \ud55c \ubc88\uc740 \uc2e4\ud589\ub418\ub3c4\ub85d \ubcf4\uc7a5\ud569\ub2c8\ub2e4.\nwindow.addEventListener('resize', resizeHandler)\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"import {debounce} from '@naverpay/utils'\n\nconst updatePosition = debounce((position) => {\n    console.log('Position updated:', position)\n}, 300)\n\nconst {debounce: debouncedUpdate, cancel, flush} = updatePosition\n\ndebouncedUpdate({x: 100, y: 200})\ncancel() // \uc5c5\ub370\uc774\ud2b8\uac00 \ucde8\uc18c\ub429\ub2c8\ub2e4\n\ndebouncedUpdate({x: 300, y: 400})\nflush() // \uc5c5\ub370\uc774\ud2b8\uac00 \uc989\uc2dc \ud638\ucd9c\ub429\ub2c8\ub2e4\n"})})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},15:(e,n,s)=>{s.d(n,{R:()=>c,x:()=>r});var t=s(1855);const i={},o=t.createContext(i);function c(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);