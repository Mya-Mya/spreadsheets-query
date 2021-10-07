const path = require("path");
const GasPlugin = require("gas-webpack-plugin");
module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.join(__dirname, "out"),
    filename: "bundle.gs",
  },
  plugins: [new GasPlugin()],
};
