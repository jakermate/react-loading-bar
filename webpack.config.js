const path = require("path")
module.exports = {
  mode: "production",
  entry: "./src/loaders/ProgressBar.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    // library: "react-progress-loaders",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {},
        },
      },
    ],
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    },
  },
  externals: [
    {
      'react': {
        amd: 'react',
        commonjs: 'react',
        commonjs2: 'react',
        root: 'React'
      }
    },
    'react-dom'
  ],
}
