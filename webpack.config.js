const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  target: 'web',
  devServer: {
    writeToDisk: true,
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    reactDOM: {
      root: 'ReactDom',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'react-router-dom': {
      root: 'ReactRouterDOM',
      commonjs2: 'react-router-dom',
      commonjs: 'react-router-dom',
      amd: 'react-router-dom',
    },
    'framer-motion': {
      root: 'FramerMotion',
      commonjs2: 'framer-motion',
      commonjs: 'framer-motion',
      amd: 'framer-motion',
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs',
    library: 'react-motion-layout',
    libraryExport: 'default',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
