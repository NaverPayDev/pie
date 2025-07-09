import {useState} from 'react'

import './UrlParamCompressorPlayground.css'
import {URLParamCompressor} from '@naverpay/url-param-compressor'

const compressor = new URLParamCompressor()

export default function URLParamCompressorPlayground() {
    const [input, setInput] = useState('')
    const [result, setResult] = useState('')
    const [executionTime, setExecutionTime] = useState('')
    const [compressionRate, setCompressionRate] = useState('')

    const onCompress = () => {
        const params = input
            .split('&')
            .filter(Boolean)
            .map((pair) => pair.split('='))
            .reduce<Record<string, string>>((acc, [rawKey, rawValue = '']) => {
                const key = decodeURIComponent(rawKey)
                const value = decodeURIComponent(rawValue)
                return {...acc, [key]: value}
            }, {})

        const start = performance.now()
        const {result: compressed} = compressor.compress(params)
        const end = performance.now()

        setResult(compressed)
        setExecutionTime((end - start).toFixed(2))
        setCompressionRate(((compressed.length / new URLSearchParams(params).toString().length) * 100).toFixed(2))
    }

    const onDecompress = () => {
        const start = performance.now()
        const decompressed = compressor.decompress(input)
        const end = performance.now()

        setResult(JSON.stringify(decompressed, null, 2))
        setExecutionTime((end - start).toFixed(2))
        setCompressionRate('')
    }

    return (
        <div className="url-tool-container">
            <h2>🔐 URL Param Compressor</h2>
            <textarea
                placeholder="Enter URL parameter..."
                value={input}
                onChange={(e) => setInput(e.target.value.trim())}
            />
            <div className="button-group">
                <button onClick={onCompress}>Compress</button>
                <button onClick={onDecompress}>Decompress</button>
            </div>
            <div className="result">
                <strong>Result:</strong>
                <pre className="result-text">{result}</pre>
                <div className="info">실행 시간: {executionTime || ''}ms</div>
                <div className="info">압축률: {compressionRate}%</div>
            </div>
        </div>
    )
}
