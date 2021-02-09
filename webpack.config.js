const path = require('path')
const webpack = require('webpack');
const nodeExternals = require('')
module.exports = (env)=> {

  return {
    entry: ['babel-polyfill', './index.js'],
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: 'main.js'
    },
    target: 'node',
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false,   // if you don't put this is, __dirname
      __filename: false,  // anwebpack-node-externalsd __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express

  }

}