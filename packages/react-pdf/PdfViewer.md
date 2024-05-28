# PdfViewer

## 🚨 Warning

- 스타일이 적용된 PdfViewer를 사용하기 위해서는, `PdfViewer`를 사용하는 파일 최상단에 `import '@naverpay/react-pdf/index.css'` 추가가 필요합니다.

## 기본 사용법

- 단순 PDF Viewer만 필요한 경우 (즉, pdf text에 따른 handler가 필요 없는 경우) 사용됩니다.

### React (CSR / SSR)

```tsx
import {PdfViewer} from '@naverpay/react-pdf'

function SomeComponent () {
    return <PdfViewer pdfUrl={"pdfUrl"} onErrorPDFRender={onErrorPDFRender} />
}
```

## Advanced Usage

### Click Handler 가 필요한 경우

```tsx
import {PdfViewer} from '@naverpay/react-pdf'


function SomeComponent() {
    return (
        <PdfViewer
            pdfUrl={pdfUrl}
            onClickWords={[{target: '약관', callback: () => alert('약관을 클릭했습니다.')}]}
        />
    )
}
```

### 상/하위 컴포넌트 rendering이 필요한 경우

```tsx
import {PdfViewer} from '@naverpay/react-pdf'

function PdfViewer() {
    return (
        <PdfViewer
            pdfUrl={pdfUrl}
            onErrorPDFRender={onErrorPDFRender}
            header={<>상위에 렌더링될 컴포넌트</>}
            footer={<>하위에 렌더링될 컴포넌트</>}
        />
    )
}
```

## PdfViewer에 주입되는 Props

| props            | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 타입                                                      | 기타     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- | -------- |
| pdfUrl           | 노출하고자 하는 PDF의 링크 / File Path <br /><br /> local, cdn 모두 가능합니다. local 제공시, base path에 유의해주세요.                                                                                                                                                                                                                                                                                                                                                                                                                                          | string                                                    | required |
|cMapUrl| 사용할 PDF에 지원하지 않는 폰트가 있을 경우에, camp이 업로드된 url 주소를 적어주세요. |string|optional|
|cMapCompressed|사용할 PDF에 지원하지 않는 폰트가 있을 경우에, 압축 여부를 적어주세요. |boolean|optional|
|withCredentials|url을 통한 pdf 요청 시, header와 같이 요청할건지에 대한 여부를 설정합니다. |boolean|optional|
| onClickWords     | 약관이나 어떤 다른 Click 액션에 따른 형상이 필요할때, 주입해주시면 됩니다. <br /> 원하는 단어를 target에, target click 후 취할 액션을 callback을 넣어주세요. <br /><br />`target`은 `string`, `정규 표현식`을 모두 지원합니다. <br /><br />**🚨 주의 🚨**<br /> 해당 props가 존재하면, 자동으로 어절 단위를 끊습니다.<br />@naverpay/react-pdf는 기본적으로 PDF를 효율적으로 렌더링하기 위해, **한문장** 단위로 렌더링하고 있습니다. <br /> react-pdf가 제공하는 기능이 아닌, space를 기준으로 자르게 됩니다. (정확하지 않을 수 있습니다.)  어절 단위로 끊기지 않는 pdf가 존재할 수 있습니다. | `Array<{target: string \| RegExp; callback: () => void}>` | optional |
| onLoadPDFRender | pdf load 성공 handler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | () => void                                        | optional |
| onErrorPDFRender | pdf error handler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | (e: unknown) => void                                        | optional |
| header           | PDF 상위에 rendering 될 컴포넌트를 props로 받습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ReactNode                                                 | optional |
| footer           | PDF 하위에 rendering 될 컴포넌트를 props로 받습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ReactNode                                                 | optional |

## Suggestion

onErrorPDFRender는 pdf viewer에서 오류가 난 경우에 트리거되는 callback 함수입니다.

- PDF 렌더링 에러시, pdf를 브라우저 기본 PDF viewer로 열어주는 handler 입니다.

- 하단의 handler를 사용해보세요.

    ```tsx
    const handleRenderPDFError = useCallback(
        (e) => {
            // 브라우저에서 기본으로 제공하는 pdf viewer를 새창으로 띄우도록 처리
            window.open(pdfUrl, '_blank')
            // error logging 
        },
        [pdfFilePath],
    )
    ```
