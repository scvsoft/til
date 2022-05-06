const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production'
  const conf = {
    /** Default mode is development. */
    mode: 'development',
    entry: {
      /** Webpack will recursively read all imports/require statements starting at this file. */
      scv: ['./lib/index.js'],
    },
    /** Configures the output bundle. */
    output: {
      /** Directory to write the output bundle. */
      path: path.join(__dirname, '/dist'),
      /** Name of the bundle file. */
      filename: isProd ? '[name].min.js' : '[name].develop.js',
      /** This adds the SCV namespace to the global object. */
      library: 'SCV',
      libraryExport: 'SCV',
      libraryTarget: 'umd',
      /** This is a trick to make our library code work both in Node and the Browser. */
      globalObject: 'this',
    },
    /** Configures how to resolve the files to include in the bundle. */
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    /** There are many optimizations, we will minimize the code using Terser for the production bundle. */
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
    /** Configures how to build each type of module (JavaScript, TypesSript, CSS,
     * each file type is a module for WebPack).
     */
    module: {
      rules: [
        {
          /** For JavaScript files WebPack will use Babel to transpile the code to cross-platform JavaScript. */
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          /** For TypeScript files, WebPack will use TypeScript to transpile files to cross-platform JavaScript. */
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /(node_modules|bower_components)/,
        },
      ],
    },
  }

  if (argv.mode !== 'production') {
    /** For the development build we add support for debugging. */
    conf.devtool = 'inline-source-map'
  }

  return conf
}
