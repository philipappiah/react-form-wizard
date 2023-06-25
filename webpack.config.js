const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  
  },
  module: {
    rules: [
      // `js` and `jsx` files are parsed using `babel`
      {
        test: /\.(ts|tsx)$/, 
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  
  resolve: {
    extensions: ['.','.tsx', '.ts', '.js','.jsx'],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
};
