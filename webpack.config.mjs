import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

export default {
  mode: "development",
  entry: "./src/front/main.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve("dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset", // Automatically chooses between "asset/resource" and "asset/inline"
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // Inline files smaller than 8 KB
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/front/index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/front/pages/game.html", // Another HTML template
      filename: "game.html", // Output filename
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/front/styles", to: "styles" }, // Copies CSS files
      ],
    }),
  ],
  devServer: {
    static: path.resolve("dist"),
    compress: true,
    port: 9000,
  },
};
