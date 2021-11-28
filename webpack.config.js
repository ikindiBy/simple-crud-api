const path = require('path');

module.exports = (env, argv) => ({
  mode: argv.mode,
  entry: "./src/main.js",
  output: {
    path:path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "app")],
    extensions: [".js", ".json"],
  },
  target: "node",
});