import common from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/main.js',
  plugins: [
    common(),
    resolve(),
    babel()
  ],
  output: {
    file: 'dist/main.js',
    name: 'asyncs',
    format: 'umd'
  }
}
