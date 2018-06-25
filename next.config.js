const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    config.module.rules.push({
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000',
    });

    config.module.rules.push({
      test: /\.(png|jpg|gif|eot)$/,
      use: [
        {
          loader: 'file-loader',
          options: {},
        },
      ],
    });

    config.module.rules.push({
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      }),
    });

    config.plugins.push(new ExtractTextPlugin('static/styles.css'));

    return config;
  },
};
