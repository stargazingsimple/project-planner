const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/assets/scripts/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "src", "assets", "scripts"),
  },
  devServer: {
    static: { directory: path.resolve(__dirname, "src") },
  },
};
