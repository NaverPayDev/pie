"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4860],{295:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>t,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>a});var d=r(3159),s=r(15);const i={},t="PdfViewer",l={id:"@naverpay/react-pdf/PdfViewer",title:"PdfViewer",description:"\ud83d\udea8 Warning",source:"@site/docs/@naverpay/react-pdf/PdfViewer.md",sourceDirName:"@naverpay/react-pdf",slug:"/@naverpay/react-pdf/PdfViewer",permalink:"/pie/docs/docs/@naverpay/react-pdf/PdfViewer",draft:!1,unlisted:!1,editUrl:"https://github.com/NaverPayDev/pie/tree/main/packages/@naverpay/react-pdf/PdfViewer.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"@naverpay/es-http-status-codes",permalink:"/pie/docs/docs/@naverpay/es-http-status-codes/"},next:{title:"@naverpay/react-pdf",permalink:"/pie/docs/docs/@naverpay/react-pdf/"}},c={},a=[{value:"\ud83d\udea8 Warning",id:"-warning",level:2},{value:"\uae30\ubcf8 \uc0ac\uc6a9\ubc95",id:"\uae30\ubcf8-\uc0ac\uc6a9\ubc95",level:2},{value:"React (CSR / SSR)",id:"react-csr--ssr",level:3},{value:"Advanced Usage",id:"advanced-usage",level:2},{value:"Click Handler \uac00 \ud544\uc694\ud55c \uacbd\uc6b0",id:"click-handler-\uac00-\ud544\uc694\ud55c-\uacbd\uc6b0",level:3},{value:"\uc0c1/\ud558\uc704 \ucef4\ud3ec\ub10c\ud2b8 rendering\uc774 \ud544\uc694\ud55c \uacbd\uc6b0",id:"\uc0c1\ud558\uc704-\ucef4\ud3ec\ub10c\ud2b8-rendering\uc774-\ud544\uc694\ud55c-\uacbd\uc6b0",level:3},{value:"PdfViewer\uc5d0 \uc8fc\uc785\ub418\ub294 Props",id:"pdfviewer\uc5d0-\uc8fc\uc785\ub418\ub294-props",level:2},{value:"Suggestion",id:"suggestion",level:2}];function o(e){const n={br:"br",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.h1,{id:"pdfviewer",children:"PdfViewer"}),"\n",(0,d.jsx)(n.h2,{id:"-warning",children:"\ud83d\udea8 Warning"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\uc2a4\ud0c0\uc77c\uc774 \uc801\uc6a9\ub41c PdfViewer\ub97c \uc0ac\uc6a9\ud558\uae30 \uc704\ud574\uc11c\ub294, ",(0,d.jsx)(n.code,{children:"PdfViewer"}),"\ub97c \uc0ac\uc6a9\ud558\ub294 \ud30c\uc77c \ucd5c\uc0c1\ub2e8\uc5d0 ",(0,d.jsx)(n.code,{children:"import '@naverpay/react-pdf/index.css'"})," \ucd94\uac00\uac00 \ud544\uc694\ud569\ub2c8\ub2e4."]}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"\uae30\ubcf8-\uc0ac\uc6a9\ubc95",children:"\uae30\ubcf8 \uc0ac\uc6a9\ubc95"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:"\ub2e8\uc21c PDF Viewer\ub9cc \ud544\uc694\ud55c \uacbd\uc6b0 (\uc989, pdf text\uc5d0 \ub530\ub978 handler\uac00 \ud544\uc694 \uc5c6\ub294 \uacbd\uc6b0) \uc0ac\uc6a9\ub429\ub2c8\ub2e4."}),"\n"]}),"\n",(0,d.jsx)(n.h3,{id:"react-csr--ssr",children:"React (CSR / SSR)"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-tsx",children:"import {PdfViewer} from '@naverpay/react-pdf'\n\nfunction SomeComponent () {\n    return <PdfViewer pdfUrl={\"pdfUrl\"} onErrorPDFRender={onErrorPDFRender} />\n}\n"})}),"\n",(0,d.jsx)(n.h2,{id:"advanced-usage",children:"Advanced Usage"}),"\n",(0,d.jsx)(n.h3,{id:"click-handler-\uac00-\ud544\uc694\ud55c-\uacbd\uc6b0",children:"Click Handler \uac00 \ud544\uc694\ud55c \uacbd\uc6b0"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-tsx",children:"import {PdfViewer} from '@naverpay/react-pdf'\n\n\nfunction SomeComponent() {\n    return (\n        <PdfViewer\n            pdfUrl={pdfUrl}\n            onClickWords={[{target: '\uc57d\uad00', callback: () => alert('\uc57d\uad00\uc744 \ud074\ub9ad\ud588\uc2b5\ub2c8\ub2e4.')}]}\n        />\n    )\n}\n"})}),"\n",(0,d.jsx)(n.h3,{id:"\uc0c1\ud558\uc704-\ucef4\ud3ec\ub10c\ud2b8-rendering\uc774-\ud544\uc694\ud55c-\uacbd\uc6b0",children:"\uc0c1/\ud558\uc704 \ucef4\ud3ec\ub10c\ud2b8 rendering\uc774 \ud544\uc694\ud55c \uacbd\uc6b0"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-tsx",children:"import {PdfViewer} from '@naverpay/react-pdf'\n\nfunction PdfViewer() {\n    return (\n        <PdfViewer\n            pdfUrl={pdfUrl}\n            onErrorPDFRender={onErrorPDFRender}\n            header={<>\uc0c1\uc704\uc5d0 \ub80c\ub354\ub9c1\ub420 \ucef4\ud3ec\ub10c\ud2b8</>}\n            footer={<>\ud558\uc704\uc5d0 \ub80c\ub354\ub9c1\ub420 \ucef4\ud3ec\ub10c\ud2b8</>}\n        />\n    )\n}\n"})}),"\n",(0,d.jsx)(n.h2,{id:"pdfviewer\uc5d0-\uc8fc\uc785\ub418\ub294-props",children:"PdfViewer\uc5d0 \uc8fc\uc785\ub418\ub294 Props"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"props"}),(0,d.jsx)(n.th,{children:"\uc124\uba85"}),(0,d.jsx)(n.th,{children:"\ud0c0\uc785"}),(0,d.jsx)(n.th,{children:"\uae30\ud0c0"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"pdfUrl"}),(0,d.jsxs)(n.td,{children:["\ub178\ucd9c\ud558\uace0\uc790 \ud558\ub294 PDF\uc758 \ub9c1\ud06c / File Path ",(0,d.jsx)(n.br,{}),(0,d.jsx)(n.br,{})," local, cdn \ubaa8\ub450 \uac00\ub2a5\ud569\ub2c8\ub2e4. local \uc81c\uacf5\uc2dc, base path\uc5d0 \uc720\uc758\ud574\uc8fc\uc138\uc694."]}),(0,d.jsx)(n.td,{children:"string"}),(0,d.jsx)(n.td,{children:"required"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"cMapUrl"}),(0,d.jsx)(n.td,{children:"\uc0ac\uc6a9\ud560 PDF\uc5d0 \uc9c0\uc6d0\ud558\uc9c0 \uc54a\ub294 \ud3f0\ud2b8\uac00 \uc788\uc744 \uacbd\uc6b0\uc5d0, camp\uc774 \uc5c5\ub85c\ub4dc\ub41c url \uc8fc\uc18c\ub97c \uc801\uc5b4\uc8fc\uc138\uc694."}),(0,d.jsx)(n.td,{children:"string"}),(0,d.jsx)(n.td,{children:"optional"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"cMapCompressed"}),(0,d.jsx)(n.td,{children:"\uc0ac\uc6a9\ud560 PDF\uc5d0 \uc9c0\uc6d0\ud558\uc9c0 \uc54a\ub294 \ud3f0\ud2b8\uac00 \uc788\uc744 \uacbd\uc6b0\uc5d0, \uc555\ucd95 \uc5ec\ubd80\ub97c \uc801\uc5b4\uc8fc\uc138\uc694."}),(0,d.jsx)(n.td,{children:"boolean"}),(0,d.jsx)(n.td,{children:"optional"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"withCredentials"}),(0,d.jsx)(n.td,{children:"url\uc744 \ud1b5\ud55c pdf \uc694\uccad \uc2dc, header\uc640 \uac19\uc774 \uc694\uccad\ud560\uac74\uc9c0\uc5d0 \ub300\ud55c \uc5ec\ubd80\ub97c \uc124\uc815\ud569\ub2c8\ub2e4."}),(0,d.jsx)(n.td,{children:"boolean"}),(0,d.jsx)(n.td,{children:"optional"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"onClickWords"}),(0,d.jsxs)(n.td,{children:["\uc57d\uad00\uc774\ub098 \uc5b4\ub5a4 \ub2e4\ub978 Click \uc561\uc158\uc5d0 \ub530\ub978 \ud615\uc0c1\uc774 \ud544\uc694\ud560\ub54c, \uc8fc\uc785\ud574\uc8fc\uc2dc\uba74 \ub429\ub2c8\ub2e4. ",(0,d.jsx)(n.br,{})," \uc6d0\ud558\ub294 \ub2e8\uc5b4\ub97c target\uc5d0, target click \ud6c4 \ucde8\ud560 \uc561\uc158\uc744 callback\uc744 \ub123\uc5b4\uc8fc\uc138\uc694. ",(0,d.jsx)(n.br,{}),(0,d.jsx)(n.br,{}),(0,d.jsx)(n.code,{children:"target"}),"\uc740 ",(0,d.jsx)(n.code,{children:"string"}),", ",(0,d.jsx)(n.code,{children:"\uc815\uaddc \ud45c\ud604\uc2dd"}),"\uc744 \ubaa8\ub450 \uc9c0\uc6d0\ud569\ub2c8\ub2e4. ",(0,d.jsx)(n.br,{}),(0,d.jsx)(n.br,{}),(0,d.jsx)(n.strong,{children:"\ud83d\udea8 \uc8fc\uc758 \ud83d\udea8"}),(0,d.jsx)(n.br,{})," \ud574\ub2f9 props\uac00 \uc874\uc7ac\ud558\uba74, \uc790\ub3d9\uc73c\ub85c \uc5b4\uc808 \ub2e8\uc704\ub97c \ub04a\uc2b5\ub2c8\ub2e4.",(0,d.jsx)(n.br,{}),"@naverpay/react-pdf\ub294 \uae30\ubcf8\uc801\uc73c\ub85c PDF\ub97c \ud6a8\uc728\uc801\uc73c\ub85c \ub80c\ub354\ub9c1\ud558\uae30 \uc704\ud574, ",(0,d.jsx)(n.strong,{children:"\ud55c\ubb38\uc7a5"})," \ub2e8\uc704\ub85c \ub80c\ub354\ub9c1\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4. ",(0,d.jsx)(n.br,{})," react-pdf\uac00 \uc81c\uacf5\ud558\ub294 \uae30\ub2a5\uc774 \uc544\ub2cc, space\ub97c \uae30\uc900\uc73c\ub85c \uc790\ub974\uac8c \ub429\ub2c8\ub2e4. (\uc815\ud655\ud558\uc9c0 \uc54a\uc744 \uc218 \uc788\uc2b5\ub2c8\ub2e4.)  \uc5b4\uc808 \ub2e8\uc704\ub85c \ub04a\uae30\uc9c0 \uc54a\ub294 pdf\uac00 \uc874\uc7ac\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."]}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"Array<{target: string | RegExp; callback: () => void}>"})}),(0,d.jsx)(n.td,{children:"optional"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"onLoadPDFRender"}),(0,d.jsx)(n.td,{children:"pdf load \uc131\uacf5 handler"}),(0,d.jsx)(n.td,{children:"() => void"}),(0,d.jsx)(n.td,{children:"optional"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"onErrorPDFRender"}),(0,d.jsx)(n.td,{children:"pdf error handler"}),(0,d.jsx)(n.td,{children:"(e: unknown) => void"}),(0,d.jsx)(n.td,{children:"optional"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"header"}),(0,d.jsx)(n.td,{children:"PDF \uc0c1\uc704\uc5d0 rendering \ub420 \ucef4\ud3ec\ub10c\ud2b8\ub97c props\ub85c \ubc1b\uc2b5\ub2c8\ub2e4."}),(0,d.jsx)(n.td,{children:"ReactNode"}),(0,d.jsx)(n.td,{children:"optional"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"footer"}),(0,d.jsx)(n.td,{children:"PDF \ud558\uc704\uc5d0 rendering \ub420 \ucef4\ud3ec\ub10c\ud2b8\ub97c props\ub85c \ubc1b\uc2b5\ub2c8\ub2e4."}),(0,d.jsx)(n.td,{children:"ReactNode"}),(0,d.jsx)(n.td,{children:"optional"})]})]})]}),"\n",(0,d.jsx)(n.h2,{id:"suggestion",children:"Suggestion"}),"\n",(0,d.jsx)(n.p,{children:"onErrorPDFRender\ub294 pdf viewer\uc5d0\uc11c \uc624\ub958\uac00 \ub09c \uacbd\uc6b0\uc5d0 \ud2b8\ub9ac\uac70\ub418\ub294 callback \ud568\uc218\uc785\ub2c8\ub2e4."}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"PDF \ub80c\ub354\ub9c1 \uc5d0\ub7ec\uc2dc, pdf\ub97c \ube0c\ub77c\uc6b0\uc800 \uae30\ubcf8 PDF viewer\ub85c \uc5f4\uc5b4\uc8fc\ub294 handler \uc785\ub2c8\ub2e4."}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"\ud558\ub2e8\uc758 handler\ub97c \uc0ac\uc6a9\ud574\ubcf4\uc138\uc694."}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-tsx",children:"const handleRenderPDFError = useCallback(\n    (e) => {\n        // \ube0c\ub77c\uc6b0\uc800\uc5d0\uc11c \uae30\ubcf8\uc73c\ub85c \uc81c\uacf5\ud558\ub294 pdf viewer\ub97c \uc0c8\ucc3d\uc73c\ub85c \ub744\uc6b0\ub3c4\ub85d \ucc98\ub9ac\n        window.open(pdfUrl, '_blank')\n        // error logging \n    },\n    [pdfFilePath],\n)\n"})}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(o,{...e})}):o(e)}},15:(e,n,r)=>{r.d(n,{R:()=>t,x:()=>l});var d=r(1855);const s={},i=d.createContext(s);function t(e){const n=d.useContext(i);return d.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:t(e.components),d.createElement(i.Provider,{value:n},e.children)}}}]);