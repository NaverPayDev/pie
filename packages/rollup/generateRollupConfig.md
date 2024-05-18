# generateRollupConfig

Javascript, Typescript 환경의 라이브러리를 번들링할 수 있는 **Rollup Config**를 return하는 함수입니다.

## Params

|Param|type|Option|Description|
|--|--|--|--|
|packageDir | string |required|번들링할 패키지의 package.json 위치를 적어주세요. (ex. __dirname)|
|entrypoint|string 혹은 Record<'index' & string, string> |required|번들링할 패키지의 파일 entrypoint를 적어주세요. (ex. './src/index.ts',)|
|outpoint| {require: string; import: string;types: string } |optional|번들된 파일이 위치할 outpoint를 적어주세요. 혹은 package.json의 export 필드를 작성해주세요.|
|extensions | string[] |optional|번들할 파일들의 확장자를 적어주세요. (default : [.ts, .tsx])|
|plugins|RollupOptions['plugins'] |optional|추가하고 싶은 rollup plugins을 적어주세요.|
|react |boolean |optional|번들링할 패키지의 react 지원 여부를 적어주세요. (default true)|
|scss | false 혹은 {ssr:boolean} |optional|번들링할 패키지의 scss 지원 여부를 적어주세요. {ssr:true} 라면 css 파일을 export 합니다.(default false)|
|ie|boolean |optional|번들링할 패키지의 ie 지원 여부를 적어주세요. (default false)|
|minify|boolean |optional|번들링할 패키지의 terser 압축 여부를 적어주세요. (default true)|
|reactRuntime |"classic" 혹은 'automatic', |optional|번들링할 패키지의 babel react runtime 종류 (default automatic)|
|supportModules | ("cjs" 혹은 "esm")[] |optional|번들링된 패키지가 지원할 modules (default ['cjs', 'esm'])|

## How to use?

```javascript
import {generateRollupConfig} from '@naverpay/rollup'

module.exports = generateRollupConfig({
    packageDir: __dirname,
    entrypoint: './src/index.ts',
    minify: false,
    ie: true,
    scss: {ssr: true},
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    supportModules: ['cjs', 'esm'],
})

```
