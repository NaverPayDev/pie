import {generateDocsFromCurrent} from './generate-docs-from-current'
import {generateDocsFromVersionTags} from './generate-docs-from-version-tags'
;(async () => {
    if (process.env.NODE_ENV === 'production') {
        await generateDocsFromVersionTags()
        await generateDocsFromCurrent()
    } else {
        await generateDocsFromCurrent()
    }
})()
