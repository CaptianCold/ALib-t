module.exports = () => {
  return {
    entry: {
      main: './src/index.ts'
    },
    output: {
      path: './dist',
      filename: '[name].bundle.js'
    },
    resolve: {
      extensions: ['.js', '.ts', '.html']
    },
    module: {
      loaders: [
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            'angular2-template-loader'
          ]
        },
        {
          test: /\.html$/,
          loader: 'raw'
        },
        {
          test: /\.scss$/,
          loaders: ["raw-loader",  "sass-loader"]
        }
      ]
    },
    devtool: 'inline-source-map'
  };
};
