import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import Heading from '@theme/Heading'
import Layout from '@theme/Layout'
import clsx from 'clsx'

import styles from './index.module.css'

function HomepageHeader() {
    return (
        <div className={clsx(styles.headerWrapper)}>
            <img className={clsx(styles.headerCard)} src="img/pie-card.png" alt="pie" />
        </div>
    )
}

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext()

    return (
        <Layout title={siteConfig.title} description={siteConfig.tagline}>
            <div className={clsx(styles.mainWrapper)}>
                <HomepageHeader />
                <main>
                    <div className={clsx(styles.headerText)}>
                        <Heading as="h2" style={{marginBottom: 0}}>
                            {siteConfig.tagline}
                        </Heading>
                    </div>
                    <HomepageFeatures />
                </main>
            </div>
        </Layout>
    )
}
