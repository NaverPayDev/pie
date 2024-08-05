import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import {INTERNAL_CONFIG} from '@site/scripts/docs.config'
import Heading from '@theme/Heading'
import clsx from 'clsx'

import styles from './styles.module.css'
interface FeatureItem {
    title: string
    description?: string
}

function Feature({title, description}: FeatureItem) {
    const {siteConfig} = useDocusaurusContext()
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">
                    <a href={`${siteConfig.url}/${siteConfig.baseUrl}/docs/${title}`}>{title}</a>
                </Heading>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {[...INTERNAL_CONFIG.map(({name, description}) => ({title: name, description}))]
                        .sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
                        .map((props, idx) => (
                            <Feature key={idx} {...props} />
                        ))}
                </div>
            </div>
        </section>
    )
}
