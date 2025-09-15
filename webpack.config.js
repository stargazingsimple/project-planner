const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "src"),
  },
  devServer: {
    static: { directory: path.resolve(__dirname, "src") },
  },
};
