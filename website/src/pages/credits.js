import React from 'react';
import Layout from '@theme/Layout';
import ButtonWhite from './components/ButtonWhite';

function Home() {
  return (
    <Layout
      title="Credits"
      description="Create beautiful immersive animations using shared components"
    >
      <div className="flex flex-col p-4">
        <h2>Thanks to</h2>
        <div className="mt-4 flex flex-col">
          <div className="mt-8">
            <h5>The amazing tool for generating Docs</h5>
            <ButtonWhite to="https://v2.docusaurus.io" target="_blank">
              Docusaurus
            </ButtonWhite>
          </div>

          <div className="mt-8">
            <h5>For an amazing codepen</h5>
            <ButtonWhite to="https://codepen.io/kode88/" target="_blank">
              Animated Mouse Scroll Indicator
            </ButtonWhite>
          </div>

          <div className="mt-8">
            <h5>For those amazing images</h5>
            <ButtonWhite to="https://unsplash.com/" target="_blank">
              Unsplash
            </ButtonWhite>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
