//define entry point of the app and the output filename which can be any name and complete path to o/p file
//specify the babel loader, test says to include all files in the project ending with .js to include in babel and exclude only node_module filder

const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }, {
      test: /\.s?css$/, //include both scss and css
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  devtool:'cheap-module-eval-source-map',
  devServer:{
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true  //if encouters 404, redirect to index.html
  }
};
