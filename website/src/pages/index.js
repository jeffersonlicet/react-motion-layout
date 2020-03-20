import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import { MotionLayoutProvider, withAnimation } from 'react-motion-layout';

import { FiCode, FiArchive, FiList } from 'react-icons/fi';
import Button from './components/Button';
import HomeDemo from './components/HomeDemo';
import styles from './styles.module.css';

const features = [
  {
    title: <>Declarative</>,
    icon: <FiCode size="45" />,
    description: (
      <div className="mt-6 leading-relaxed sm:text-lg md:text-xl xl:text-lg text-gray-600">
        Easy as wraping your text or images with our SharedElement component.
      </div>
    ),
  },
  {
    title: <>Isolated</>,
    icon: <FiArchive size="45" />,
    description: (
      <div className="mt-6 leading-relaxed sm:text-lg md:text-xl xl:text-lg text-gray-600">
        It doesn't require external state management libs.
      </div>
    ),
  },
  {
    title: <>Router Ready</>,
    icon: <FiList size="45" />,
    description: (
      <div className="mt-6 leading-relaxed sm:text-lg md:text-xl xl:text-lg text-gray-600">
        Dispatch animations when changing routes using our React-Router Link component.
      </div>
    ),
  },
];

function Feature({
  imageUrl, title, description, icon,
}) {
  return (
    <div className={classnames('w-full lg:w-1/3 p-4 lg:pt-8 pb-2 lg:border border-gray-200 lg:shadow-sm lg:mr-2 rounded-lg flex flex-col items-center lg:ml-2 text-center', styles.feature)}>
      <div className="pb-4 primary opacity-50">
        { icon }
      </div>
      <h3 className="baloo">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// Home
function Home() {
  return (
    <Layout
      title="Create animations using shared components"
      description="Create beautiful immersive animations using shared components"
    >
      <MotionLayoutProvider debug>
        <header className="bg-gray-200 xl:min-h-screen">
          <div className="flex w-full justify-between flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 md:ml-8 xl:ml-16 ml-0 lg:mt-20 xl:mt-32 p-10 lg:p-0">
              <div className="text-5xl baloo font-bold primary leading-tight">Motion Layout</div>
              <div className="text-4xl text-gray-500 mt-4 leading-tight">Create beautiful immersive animations using shared components.</div>
              <div className="mt-12">
                <Button to="/docs/installation">
                  Get Started
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-auto lg:px-10 mt-8">
              <HomeDemo />
            </div>
          </div>
          <div className="mouse hidden xl:block">
            <div className="mouse-icon">
              <span className="mouse-wheel" />
            </div>
          </div>
        </header>
        <main>
          {features && features.length && (
            <section className={styles.features}>
              <div className="container lg:pt-12">
                <div className="flex flex-col lg:flex-row">
                  {features.map((props, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Feature key={idx} {...props} />
                  ))}
                </div>
              </div>
            </section>
          )}
          <div className="flex justify-center py-10  flex-col items-center">
            <div className="text-5xl baloo text-white font-bold primary leading-tight">What?</div>
            <div className="mt-10 mb-20">
              <div className="text-center text-gray-600 px-8 lg:p-0 lg:text-xl max-w-3xl justify-center flex px-4">
                There are amazing libraries like framer-motion that help you create animations when mounting or unmounting components. But, if two views have the same image in different positions and sizes, they cannot be animated together. With Motion Layout, you can link components together to animate them when changing views.
              </div>
            </div>

            <Button to="/docs/installation">
              Get Started
            </Button>
          </div>
        </main>
      </MotionLayoutProvider>
    </Layout>
  );
}

export default withAnimation(Home);
