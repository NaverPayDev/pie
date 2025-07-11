import {BrowserRouter, Route, Routes} from 'react-router-dom'

import URLParamCompressorPlayground from './url-param-compressor/UrlParamCompressorPlayground'

export default function App() {
    return (
        <BrowserRouter basename="/pie/playground">
            <Routes>
                <Route path="/@naverpay/url-param-compressor" element={<URLParamCompressorPlayground />} />
            </Routes>
        </BrowserRouter>
    )
}
