const merge = require('webpack-merge');

const common = require('./webpack.config.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    open: false,
    port: process.env.PORT || 3000,
    host: process.env.HOST || '127.0.0.1',
  },
});
