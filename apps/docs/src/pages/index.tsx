import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import Heading from '@theme/Heading'
import Layout from '@theme/Layout'
import clsx from 'clsx'

import styles from './index.module.css'

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext()
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>`⌘ + K`를 눌러 원하는 정보를 찾아보세요</div>
            </div>
        </header>
    )
}

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext()
    return (
        <Layout title={siteConfig.title} description="Description will go into a meta tag in <head />">
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    )
}
