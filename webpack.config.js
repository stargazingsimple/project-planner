const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    filename: "app.js",
  },
  devServer: {
    static: { directory: path.resolve(__dirname, "dist") },
  },
};
