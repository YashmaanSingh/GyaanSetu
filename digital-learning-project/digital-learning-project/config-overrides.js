const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve.fallback = {
    url: require.resolve("url/"),
    path: require.resolve("path-browserify"),
    stream: require.resolve("stream-browserify"),
    crypto: require.resolve("crypto-browserify"),
    assert: require.resolve("assert/"),
    process: require.resolve("process/browser"),
    buffer: require.resolve("buffer/")
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return config;
};
