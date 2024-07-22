const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: /node_modules\/@excalidraw\/excalidraw/, // Exclude the problematic package
      },
      {
        test: /\.tsx?$/, 
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
