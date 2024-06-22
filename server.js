const express = require('express');
const path = require('path');

const app = express();

// Server routes...
app.get('/hello', (req, res) => res.send({ hi: 'there' }));

// All of the route handlers should be defined above this Webpack configuration!
if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  app.use(express.static('dist'));
  // ensure compatibality with react router so the browser history library works
  // correctly
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(process.env.PORT || 3050, () => console.log('Listening'));
