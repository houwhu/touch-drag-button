/**
 * 功能介绍：
 * Created By HouWh On 2020/6/7 15:56
 */

const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  mode: "none",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, '../dist'),
    publicPath: "/"
  },
  module: {
    rules: [
      {test:/\.css$/ , use:['style-loader' , 'css-loader']},
      {
        test:/\.js$/ ,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','react']    //在react环境下,也可以进行打包
          }
        }
      }
    ]
  }
};
