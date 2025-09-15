const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/assets/scripts/app.js",
  output: {
    filename: "[contenthash].js",
    path: path.resolve(__dirname, "dist", "scripts"),
  },
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
