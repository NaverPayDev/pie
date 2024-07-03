"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[361],{1483:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>o,contentTitle:()=>l,default:()=>p,frontMatter:()=>i,metadata:()=>d,toc:()=>c});var r=t(3159),s=t(15);const i={},l="generateRollupConfig",d={id:"@naverpay/rollup/main/generateRollupConfig",title:"generateRollupConfig",description:"Javascript, Typescript \ud658\uacbd\uc758 \ub77c\uc774\ube0c\ub7ec\ub9ac\ub97c \ubc88\ub4e4\ub9c1\ud560 \uc218 \uc788\ub294 Rollup Config\ub97c return\ud558\ub294 \ud568\uc218\uc785\ub2c8\ub2e4.",source:"@site/docs/@naverpay/rollup/main/generateRollupConfig.md",sourceDirName:"@naverpay/rollup/main",slug:"/@naverpay/rollup/main/generateRollupConfig",permalink:"/pie/docs/docs/@naverpay/rollup/main/generateRollupConfig",draft:!1,unlisted:!1,editUrl:"https://github.com/NaverPayDev/pie/tree/main/packages/@naverpay/rollup/main/generateRollupConfig.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"PdfViewer",permalink:"/pie/docs/docs/@naverpay/react-pdf/0.3.0/PdfViewer"},next:{title:"@naverpay/rollup",permalink:"/pie/docs/docs/@naverpay/rollup/main/"}},o={},c=[{value:"Params",id:"params",level:2},{value:"How to use?",id:"how-to-use",level:2}];function a(n){const e={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,s.R)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h1,{id:"generaterollupconfig",children:"generateRollupConfig"}),"\n",(0,r.jsxs)(e.p,{children:["Javascript, Typescript \ud658\uacbd\uc758 \ub77c\uc774\ube0c\ub7ec\ub9ac\ub97c \ubc88\ub4e4\ub9c1\ud560 \uc218 \uc788\ub294 ",(0,r.jsx)(e.strong,{children:"Rollup Config"}),"\ub97c return\ud558\ub294 \ud568\uc218\uc785\ub2c8\ub2e4."]}),"\n",(0,r.jsx)(e.h2,{id:"params",children:"Params"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"Param"}),(0,r.jsx)(e.th,{children:"type"}),(0,r.jsx)(e.th,{children:"Option"}),(0,r.jsx)(e.th,{children:"Description"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"packageDir"}),(0,r.jsx)(e.td,{children:"string"}),(0,r.jsx)(e.td,{children:"required"}),(0,r.jsx)(e.td,{children:"\ubc88\ub4e4\ub9c1\ud560 \ud328\ud0a4\uc9c0\uc758 package.json \uc704\uce58\ub97c \uc801\uc5b4\uc8fc\uc138\uc694. (ex. __dirname)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"entrypoint"}),(0,r.jsx)(e.td,{children:"string \ud639\uc740 Record<'index' & string, string>"}),(0,r.jsx)(e.td,{children:"required"}),(0,r.jsx)(e.td,{children:"\ubc88\ub4e4\ub9c1\ud560 \ud328\ud0a4\uc9c0\uc758 \ud30c\uc77c entrypoint\ub97c \uc801\uc5b4\uc8fc\uc138\uc694. (ex. './src/index.ts',)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"outpoint"}),(0,r.jsx)(e.td,{children:"{require: string; import: string;types: string }"}),(0,r.jsx)(e.td,{children:"optional"}),(0,r.jsx)(e.td,{children:"\ubc88\ub4e4\ub41c \ud30c\uc77c\uc774 \uc704\uce58\ud560 outpoint\ub97c \uc801\uc5b4\uc8fc\uc138\uc694. \ud639\uc740 package.json\uc758 export \ud544\ub4dc\ub97c \uc791\uc131\ud574\uc8fc\uc138\uc694."})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"extensions"}),(0,r.jsx)(e.td,{children:"string[]"}),(0,r.jsx)(e.td,{children:"optional"}),(0,r.jsx)(e.td,{children:"\ubc88\ub4e4\ud560 \ud30c\uc77c\ub4e4\uc758 \ud655\uc7a5\uc790\ub97c \uc801\uc5b4\uc8fc\uc138\uc694. (default : [.ts, .tsx])"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"plugins"}),(0,r.jsx)(e.td,{children:"RollupOptions['plugins']"}),(0,r.jsx)(e.td,{children:"optional"}),(0,r.jsx)(e.td,{children:"\ucd94\uac00\ud558\uace0 \uc2f6\uc740 rollup plugins\uc744 \uc801\uc5b4\uc8fc\uc138\uc694."})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"react"}),(0,r.jsx)(e.td,{children:'false \ud639\uc740 {runtime: "classic"'}),(0,r.jsx)(e.td,{children:'"automatic"}'}),(0,r.jsx)(e.td,{children:"optional"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"scss"}),(0,r.jsx)(e.td,{children:"false \ud639\uc740 {ssr:boolean}"}),(0,r.jsx)(e.td,{children:"optional"}),(0,r.jsx)(e.td,{children:"\ubc88\ub4e4\ub9c1\ud560 \ud328\ud0a4\uc9c0\uc758 scss \uc9c0\uc6d0 \uc5ec\ubd80\ub97c \uc801\uc5b4\uc8fc\uc138\uc694. {ssr:true} \ub77c\uba74 css \ud30c\uc77c\uc744 export \ud569\ub2c8\ub2e4.(default false)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"ie"}),(0,r.jsx)(e.td,{children:"boolean"}),(0,r.jsx)(e.td,{children:"optional"}),(0,r.jsx)(e.td,{children:"\ubc88\ub4e4\ub9c1\ud560 \ud328\ud0a4\uc9c0\uc758 ie \uc9c0\uc6d0 \uc5ec\ubd80\ub97c \uc801\uc5b4\uc8fc\uc138\uc694. (default false)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"minify"}),(0,r.jsx)(e.td,{children:"boolean"}),(0,r.jsx)(e.td,{children:"optional"}),(0,r.jsx)(e.td,{children:"\ubc88\ub4e4\ub9c1\ud560 \ud328\ud0a4\uc9c0\uc758 terser \uc555\ucd95 \uc5ec\ubd80\ub97c \uc801\uc5b4\uc8fc\uc138\uc694. (default true)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"supportModules"}),(0,r.jsx)(e.td,{children:'("cjs" \ud639\uc740 "esm")[]'}),(0,r.jsx)(e.td,{children:"optional"}),(0,r.jsx)(e.td,{children:"\ubc88\ub4e4\ub9c1\ub41c \ud328\ud0a4\uc9c0\uac00 \uc9c0\uc6d0\ud560 modules (default ['cjs', 'esm'])"})]})]})]}),"\n",(0,r.jsx)(e.h2,{id:"how-to-use",children:"How to use?"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"import {generateRollupConfig} from '@naverpay/rollup'\n\nmodule.exports = generateRollupConfig({\n    packageDir: __dirname,\n    entrypoint: './src/index.ts',\n    minify: false,\n    ie: true,\n    scss: {ssr: true},\n    extensions: ['.js', '.jsx', '.ts', '.tsx'],\n    supportModules: ['cjs', 'esm'],\n})\n\n"})})]})}function p(n={}){const{wrapper:e}={...(0,s.R)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(a,{...n})}):a(n)}},15:(n,e,t)=>{t.d(e,{R:()=>l,x:()=>d});var r=t(1855);const s={},i=r.createContext(s);function l(n){const e=r.useContext(i);return r.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:l(n.components),r.createElement(i.Provider,{value:e},n.children)}}}]);