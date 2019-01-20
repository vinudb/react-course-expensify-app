//define entry point of the app and the output filename which can be any name and complete path to o/p file
//specify the babel loader, test says to include all files in the project ending with .js to include in babel and exclude only node_module filder

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env)=>{
  const isProduction = env === "production";
  const CSSExtract = new ExtractTextPlugin('styles.css'); 
  return {
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
        use: CSSExtract.extract({
          use: [
            {
              loader : 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader:'sass-loader',
              options:{
                sourceMap: true
              }
            }
          ]
        })
      }]
    },
    plugins: [
      CSSExtract
    ],
    devtool: isProduction? 'source-map' : 'inline-source-map',
    devServer:{
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true  //if encouters 404, redirect to index.html
    }
  }
}