const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        "css-loader"
      ],
    });

    config.plugins.push(new MiniCssExtractPlugin('static/styles.css'));

    return config;
  },
};
