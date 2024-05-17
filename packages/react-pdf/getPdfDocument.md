# getPdfDocument

## pdf만 단독으로 가지고 오는 유틸

- **client side** 에서만 호출되어야 합니다.

- 업로드된 파일의 url 주소와 로컬 주소 data 중 하나를 넣어주시면 됩니다.

- 가지고 올 수 있는 PDF 정보는 [다음](./src/pdfjs-dist/types/pdfjs.d.ts)과 같습니다.

```tsx
function PDFTest() {
    useEffect(() => {
        async function load() {
            const pdfInfo = await getPdfDocument({
                url: 'https://financial.pstatic.net/static/terms-policy/location-based-service_230101.pdf',
            })
            console.log(pdfInfo.numPages)
        }
        load()
    }, [])
    
    return null
}
```
