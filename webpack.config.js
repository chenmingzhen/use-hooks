const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  /* 打包入口 */
  entry: {
    main: './src/start.tsx',
  },
  devServer: {
    contentBase: './dist', // 监听的文件
    open: true, // 是否自动打开
    port: 3000, // 端口号
    hot: true,
    hotOnly: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/, // 这个文件夹除外
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true, // use transpileOnly mode to speed-up compilation
          compilerOptions: {
            ...compilerOptions,
            declaration: false,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  /* 插件 */
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  /* 输出位置 */
  output: {
    /* 输出的文件名 */
    filename: '[name].js',
    /* 输出的目录位置 */
    /* 引入node的模块path  __dirname代表该配置文件的绝对路径 bundle表示目录名称 */
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
}
