import {useLocation, useHistory} from '@docusaurus/router'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Content from '@theme-original/DocItem/Content'
import semver from 'semver'

export default function ContentWrapper(props) {
    const {globalData} = useDocusaurusContext()
    const location = useLocation()
    const history = useHistory()

    const entireDocs = globalData['docusaurus-plugin-content-docs'].default.versions[0].docs
    const pageId = props.children.type.metadata.id
    const [packageName, packageVersion] = pageId.split('/')
    const moduleName = pageId.split('/').slice(-1)[0]
    const versions = entireDocs
        .filter((doc) => {
            return doc.id.includes(packageName) && doc.id.includes(moduleName)
        })
        .map((doc) => doc.id.split('/')[1])
        .sort((a, b) => (semver.gt(a, b) ? -1 : 1))

    const handleChangeVersion = (e) => {
        history.push(location.pathname.replace(packageVersion, e.target.value))
    }

    return (
        <>
            <select name="versions" onChange={handleChangeVersion}>
                {versions.map((version) => (
                    <option key={version} value={version} selected={packageVersion === version}>
                        {version}
                    </option>
                ))}
            </select>
            <Content {...props} />
        </>
    )
}
