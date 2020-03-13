import React, { useState } from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { MotionProvider } from 'react-motion-layout';
import HomeDemo from './components/HomeDemo';
import styles from './styles.module.css';

const features = [
  {
    title: <>Easy to Use</>,
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: <>Focus on What Matters</>,
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the
        {' '}
        <code>docs</code>
        {' '}
        directory.
      </>
    ),
  },
  {
    title: <>Powered by React</>,
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// Home
function Home() {
  const context = useDocusaurusContext();
  const a = useState();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <MotionProvider debug>
        <header className="bg-gray-200 pt-10 pb-20">
          <div className="flex w-full justify-between flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 xl:ml-16 ml-0 mt-32">
              <div className="text-5xl baloo font-bold primary leading-tight">React Motion Layout</div>
              <div className="text-2xl text-gray-500 leading-tight">Create beautiful immersive animations using shared components.</div>
              <div className="mt-8">
                <a href="/docs/installation" className="hover:text-white button_pink rounded-lg px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-pink-500 hover:bg-pink-600 md:text-lg xl:text-base text-white font-semibold leading-tight shadow-md">Get Started</a>
              </div>
            </div>
            <div className="w-full lg:w-auto mt-8 px-10">
              <HomeDemo />
            </div>
          </div>
        </header>
        <main>
          {features && features.length && (
            <section className={styles.features}>
              <div className="container">
                <div className="row">
                  {features.map((props, idx) => (
                    <Feature key={idx} {...props} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      </MotionProvider>
    </Layout>
  );
}

export default Home;
