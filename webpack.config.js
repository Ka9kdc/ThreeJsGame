module.exports = {
  mode: 'development',
  entry: './game/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [
          /node_modules/,
        ],
        loader: 'babel-loader',
      },
    ],
  },
}