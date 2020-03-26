import React from 'react';
import classnames from 'classnames';
import { FiCode, FiArchive, FiLink } from 'react-icons/fi';
import Layout from '@theme/Layout';
import { MotionLayoutProvider } from 'react-motion-layout';
import Button from './components/Button';
import HomeDemo from './components/HomeDemo';
import ButtonWhite from './components/ButtonWhite';
import styles from './styles.module.css';

const makeExample = (uri) => `<iframe
  src="https://codesandbox.io/embed/${uri}?fontsize=14&hidenavigation=0&theme=light&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="Chat-Example"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
  ></iframe>`;

const exampleChat = makeExample('chat-example-dyyy1');
const galleryExample = makeExample('instagram-example-b6gkm');

const features = [
  {
    title: 'Declarative',
    icon: <FiCode size="45" />,
    description: (
      <div className="mt-6 leading-relaxed sm:text-lg md:text-xl xl:text-lg text-gray-600">
        Easy as wraping your text or images with our SharedElement component.
      </div>
    ),
  },
  {
    title: 'Isolated',
    icon: <FiArchive size="45" />,
    description: (
      <div className="mt-6 leading-relaxed sm:text-lg md:text-xl xl:text-lg text-gray-600">
        It does not require external state management libs.
      </div>
    ),
  },
  {
    title: 'Router Ready',
    icon: <FiLink size="45" />,
    description: (
      <div className="mt-6 leading-relaxed sm:text-lg md:text-xl xl:text-lg text-gray-600">
        Dispatch animations when changing routes using our React-Router Link component.
      </div>
    ),
  },
];

function Feature({ title, description, icon }) {
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


function Home() {
  return (
    <Layout
      title="React.js hero animations"
      description="Create beautiful immersive React.js hero animations."
    >
      <MotionLayoutProvider>
        <header className="bg-gray-200 xl:min-h-screen">
          <div className="flex w-full justify-between flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 md:ml-8 xl:ml-16 ml-0 lg:mt-20 xl:mt-48 p-10 lg:p-0">
              <div className="text-5xl baloo font-bold primary leading-tight">Motion Layout</div>
              <div className="text-4xl text-gray-500 mt-4 leading-tight">
                Create beautiful immersive hero animations using shared components.
              </div>
              <div className="mt-12">
                <Button to="/docs/installation">
                  Get Started
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-auto lg:px-10 lg:mt-10 lg:mb-10 xl:mt-16">
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
          <div className="flex justify-center py-10 flex-col items-center pb-40">
            <div className="text-5xl baloo text-white font-bold primary leading-tight">What?</div>
            <div className="mt-10 mb-20">
              <div className="text-center text-gray-600 px-8 lg:p-0 lg:text-xl max-w-3xl justify-center flex px-4">
                There are amazing libraries like framer-motion that help you create animations when mounting or
                unmounting components. But, if two views have the same image in different positions and sizes,
                they cannot be animated together. With Motion Layout, you can link components together to animate
                them when changing views.
              </div>
            </div>

            <Button to="/docs/installation">
              Get Started
            </Button>

            <div className="text-4xl baloo text-white font-bold primary leading-tight mt-8 text-center px-8">
              Or scroll down to see it in action
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row justify-between chat-bg p-8 pt-8">
              <div className="w-full lg:w-1/2 shadow-xl rounded-md border-box-1" style={{ marginTop: '-120px' }}>
                <div id="example-chat" dangerouslySetInnerHTML={{ __html: galleryExample }} />
              </div>

              <div className="px-8 mt-8 lg:mt-0 flex flex-col text-white">
                <h1 className="leading-tight">Gallery</h1>
                <div className="text-xl">
                  This example shows you how MotionLayout animate
                  <b> images </b>
                  using React Router.
                </div>
                <div className="leading-tight mt-8">Click on any image to navigate and dispatch the animation.</div>

                <div className="mt-8">
                  <ButtonWhite target="_blank" to="https://codesandbox.io/s/instagram-example-b6gkm">
                    View code on Sandbox
                  </ButtonWhite>
                </div>
              </div>
            </div>

            <div className="flex justify-between flex-col-reverse lg:flex-row chat-bg p-8 pt-12 pb-12">
              <div className="px-8 mt-8 lg:mt-0 px-8 flex flex-col text-white">
                <h1 className="leading-tight">Chat</h1>
                <div className="text-xl">
                  This example shows you how MotionLayout animate
                  <b> images </b>
                  and
                  <b> text </b>
                  using React Router.
                </div>
                <div className="leading-tight mt-8">Click on any message to navigate and dispatch the animation.</div>

                <div className="mt-8">
                  <ButtonWhite target="_blank" to="https://codesandbox.io/s/chat-example-dyyy1">
                    View code on Sandbox
                  </ButtonWhite>
                </div>
              </div>

              <div className="w-full lg:w-1/2 shadow-xl bg-white rounded-md">
                <div id="example-chat" dangerouslySetInnerHTML={{ __html: exampleChat }} />
              </div>
            </div>
          </div>
        </main>
      </MotionLayoutProvider>
    </Layout>
  );
}

export default Home;
