// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

  app.use(
    '/footballthaileague11',
    createProxyMiddleware({
      target: 'http://localhost/footballthaileague11/',
      changeOrigin: true,
    })
  );
};

