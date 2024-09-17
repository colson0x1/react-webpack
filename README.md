# REACT WEBPACK

Sup!! This repository demonstrates an advanced configuration of a React application using Webpack, focusing on optimized builds and efficient handling of static assets for both development and production environments engineered with scalability for application infrastructure.

![react webpack](https://i.imgur.com/5zqFQNN.png)

![react webpack](https://i.imgur.com/IeGMBvn.png)

![react webpack](https://i.imgur.com/fwOdpwd.png)

![react webpack](https://i.imgur.com/vniUOEq.png)

![react webpack](https://i.imgur.com/zxj2rkZ.png)

![react webpack](https://i.imgur.com/jgYNaS1.png)

![react webpack](https://i.imgur.com/54nsvJA.png)

## Table of Contents

- [Introduction](#introduction)
- [Architecture and Design](#architecture-and-design)
  - [Project Structure](#project-structure)
  - [Webpack Configuration](#webpack-configuration)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Development](#development)
- [Production](#production)
- [Webpack Features](#webpack-features)
- [Deployment](#deployment)
  - [AWS Elastic Beanstalk - Dynamic Application](#aws-elastic-beanstalk)
  - [Heroku - Dynamic Application](#heroku)
  - [GitHub Pages - Static Application](#github-pages)
  - [AWS S3 - Static Application](#aws-s3)
- [License](#license)
- [Screenshots](#screenshots)

## Introduction

`react-webpack` is a comprehensive example of how to configure Webpack to manage a React Redux application. This project highlights key Webpack features such as code splitting, chunking, and efficient handling of dependencies for both development and production scenarios.

## Architecture and Design

### Project Structure

The project follows a modular architecture, with a clear separation of concerns between different parts of the application:

- **src/**: Contains the source code for the React application.
  - **components/**: Reusable React components.
  - **reducers/**: Redux reducers.
  - **router/**: React Router configuration.
  - **styles/**: CSS files.
  - **index.js**: Entry point of the application.
- **dist/**: Output directory for production builds.
- **server.js**: Node.js Express server for serving the application.
- **webpack.config.js**: Webpack configuration file.
- **.babelrc**: Babel configuration for JavaScript transpilation.
- **Procfile**: Defines the command to run the application on a platform like Heroku.
- **.s3-website.json**: Configuration for deploying the application to an AWS S3 bucket.

### Webpack Configuration

The Webpack configuration is designed to handle both development and production builds effectively:

```javascript
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'react',
  'lodash',
  'redux',
  'react-redux',
  'react-dom',
  'faker',
  'react-input-range',
  'redux-form',
  'redux-thunk',
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/,
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
```

- **Entry Points**: Separate entry points for application-specific code (`bundle.js`) and vendor dependencies (`vendor.js`).
- **Output**: Utilizes dynamic filenames with chunk hashes for cache busting.
- **Loaders**: Configured to handle JavaScript (using Babel) and CSS files.
- **Plugins**:
  - `HtmlWebpackPlugin`: Generates the `index.html` file.
  - `CommonsChunkPlugin`: Extracts common dependencies into `vendor.js`.
  - `DefinePlugin`: Sets `NODE_ENV` for optimized builds.

## Dependencies

The project uses a mix of core dependencies for the React and Redux ecosystem and development dependencies for building and serving the application:

### Core Dependencies

- **react**: Library for building user interfaces.
- **react-dom**: Provides DOM-specific methods for React.
- **react-redux**: Official React bindings for Redux.
- **redux**: Predictable state container for JavaScript apps.
- **redux-form**: Library for managing form state in Redux.
- **redux-thunk**: Middleware for handling asynchronous actions in Redux.
- **react-router**: Declarative routing for React.
- **faker**: Library for generating fake data.
- **lodash**: Utility library for JavaScript.
- **react-input-range**: Slider component for React.

### Development Dependencies

- **babel-core**: Babel compiler core.
- **babel-loader**: Webpack loader for Babel.
- **babel-preset-env**: Babel preset for compiling modern JavaScript.
- **babel-preset-react**: Babel preset for React.
- **css-loader**: Webpack loader for CSS.
- **html-webpack-plugin**: Simplifies creation of HTML files to serve your webpack bundles.
- **rimraf**: Tool for cleaning directories.
- **style-loader**: Webpack loader that injects CSS into the DOM.
- **webpack**: Module bundler.
- **webpack-dev-middleware**: Middleware for serving webpack bundles.
- **webpack-dev-server**: Development server for webpack.

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/colson0x1/react-webpack.git
cd react-webpack
npm install
```

## Development

To start the development server with hot reloading:

```bash
npm run serve
```

The application will be served at `http://localhost:3050` by default.

## Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

or

```bash
NODE_ENV=production node server.js
```

The production server serves static files from the `dist` directory and handles client-side routing for a React application.

## Webpack Features

### Code Splitting

Webpack is configured to split the application code into separate bundles:

- **Application Bundle**: Contains the main application code (`bundle.js`).
- **Vendor Bundle**: Contains third-party dependencies (`vendor.js`).
- **Manifest Bundle**: Contains Webpack runtime and manifest data (`manifest.js`).

### Dynamic Imports

The application uses dynamic imports for lazy loading:

```javascript
System.import('./path/to/module').then((module) => {
  // Use the dynamically loaded module
});
```

### Commons Chunk Plugin

Extracts common dependencies into a separate bundle (`vendor.js`):

```javascript
new webpack.optimize.CommonsChunkPlugin({
  names: ['vendor', 'manifest'],
});
```

### Environment Variables

The `DefinePlugin` is used to define environment variables:

```javascript
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
});
```

### Development Middleware

Utilizes `webpack-dev-middleware` for hot reloading during development:

```javascript
if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}
```

## Deployment

### AWS Elastic Beanstalk

Dynamic application deployment on Amazon S3 (React + Webpack + Node/Express Server)

Install AWS EB CLI: `awsebcli`

Configure and deploy the application to AWS Elastic Beanstalk:

```bash
eb init
eb create
eb setenv NODE_ENV=production
eb deploy
```

### Heroku

Dynamic application deployment on Amazon S3 (React + Webpack + Node/Express Server)

Install heroku CLI.

Configure and deploy the application to Heroku:

```bash
$ git init
$ git add .
$ git commit -m 'v1'
$ heroku
$ heroku create
$ git push heroku master
$ heroku open
$ heroku log
```

### Github Pages

Static application deployment on Github Pages (React + Webpack).

```bash
$ git checkout -b gh-pages
```

```bash
$ npm deploy
```

Manual deployment:

```bash
$ git checkout -b gh-pages
$ git subtree push --prefix dist origin gh-pages
```

### AWS S3

Static application deployment on Amazon S3 (React + Webpack).

Configure and deploy the application to an AWS S3 bucket:

```json
{
  "index": "index.html",
  "region": "us-east-1",
  "uploadDir": "dist",
  "domain": "cols-react-webpack"
}
```

Make sure to create policy for specified S3 Bucket on AWS.

Deploy:

```bash
$ sudo npm i -g s3-website
$ s3-website create <S3-bucket-name>
i.e
$ s3-website create cols-react-webpack
$ s3-website deploy dist
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Screenshots

![react webpack](https://i.imgur.com/QFVWgFF.png)

![react webpack](https://i.imgur.com/JfkgFeg.png)

![react webpack](https://i.imgur.com/p6uHuzB.png)

![react webpack](https://i.imgur.com/guZ0atB.png)

![react webpack](https://i.imgur.com/jQeWczm.png)

![react webpack](https://i.imgur.com/iJqSJMZ.png)

![react webpack](https://i.imgur.com/wqSnwhp.png)

![react webpack](https://i.imgur.com/xbtNecz.png)

![react webpack](https://i.imgur.com/OgwGKuz.png)

![react webpack](https://i.imgur.com/SPWQUWO.png)

![react webpack](https://i.imgur.com/oDFsyIc.png)

![react webpack](https://i.imgur.com/soCx5uK.png)

![react webpack](https://i.imgur.com/YBGWvYH.png)

![react webpack](https://i.imgur.com/TOCLRqn.png)

![react webpack](https://i.imgur.com/n0iJ1WR.png)

![react webpack](https://i.imgur.com/4BkPAIP.png)

![react webpack](https://i.imgur.com/TnSxtu0.png)

![react webpack](https://i.imgur.com/TrNKmLx.png)

![react webpack](https://i.imgur.com/ZSKFh6m.png)

![react webpack](https://i.imgur.com/YXwMWqy.png)

![react webpack](https://i.imgur.com/37SB3BW.png)

![react webpack](https://i.imgur.com/GTJrlvQ.png)

![react webpack](https://i.imgur.com/ApdnGN9.png)

![react webpack](https://i.imgur.com/xg7cbK1.png)

![react webpack](https://i.imgur.com/JLUxWYd.png)

![react webpack](https://i.imgur.com/kfRVtLj.png)

![react webpack](https://i.imgur.com/5zqFQNN.png)

![react webpack](https://i.imgur.com/IeGMBvn.png)

![react webpack](https://i.imgur.com/UO0B5UD.png)

![react webpack](https://i.imgur.com/hFYdKtS.png)

![react webpack](https://i.imgur.com/tLnGuqy.png)

![react webpack](https://i.imgur.com/kdPanLn.png)

![react webpack](https://i.imgur.com/fwOdpwd.png)

![react webpack](https://i.imgur.com/UAlGgWB.png)

![react webpack](https://i.imgur.com/AoGIIT0.png)

![react webpack](https://i.imgur.com/dRsgMpw.png)

![react webpack](https://i.imgur.com/aQSIChU.png)

![react webpack](https://i.imgur.com/0EbceTO.png)

![react webpack](https://i.imgur.com/WbbVlmp.png)

![react webpack](https://i.imgur.com/OGadAQ3.png)

![react webpack](https://i.imgur.com/nUhEMez.png)

![react webpack](https://i.imgur.com/7XaRUDJ.png)

![react webpack](https://i.imgur.com/q9uohaG.png)

![react webpack](https://i.imgur.com/Z5zOatt.png)

![react webpack](https://i.imgur.com/0SOuXjJ.png)

![react webpack](https://i.imgur.com/8fedfmz.png)

![react webpack](https://i.imgur.com/qP4zEfO.png)

![react webpack](https://i.imgur.com/Z3esRgL.png)

![react webpack](https://i.imgur.com/w5SydFY.png)

![react webpack](https://i.imgur.com/NdavY9T.png)

![react webpack](https://i.imgur.com/9lOGorO.png)

![react webpack](https://i.imgur.com/x5hcAqM.png)

![react webpack](https://i.imgur.com/YM0gOmZ.png)

![react webpack](https://i.imgur.com/7a2AfyF.png)

![react webpack](https://i.imgur.com/163F7G2.png)

![react webpack](https://i.imgur.com/MVR4sYf.png)

![react webpack](https://i.imgur.com/eUa3uLp.png)

![react webpack](https://i.imgur.com/gkRpzta.png)

![react webpack](https://i.imgur.com/BR7Jxsr.png)

![react webpack](https://i.imgur.com/6H0gx2u.png)

![react webpack](https://i.imgur.com/mri6nd3.png)

![react webpack](https://i.imgur.com/FV0UvEG.png)

![react webpack](https://i.imgur.com/A3EYK0a.png)

![react webpack](https://i.imgur.com/vniUOEq.png)

![react webpack](https://i.imgur.com/VyJ9g8z.png)

![react webpack](https://i.imgur.com/zxj2rkZ.png)

![react webpack](https://i.imgur.com/jgYNaS1.png)

![react webpack](https://i.imgur.com/b7wfTDj.png)

![react webpack](https://i.imgur.com/9Ou8YaS.png)

![react webpack](https://i.imgur.com/54nsvJA.png)

![react webpack](https://i.imgur.com/pvydHR6.png)
