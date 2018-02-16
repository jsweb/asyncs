import common from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'polyasync.esm.js',
  amd: {
    id: 'polyasync'
  },
  output: {
    format: 'umd',
    name: 'polyasync',
    file: 'polyasync.js'
  },
  plugins: [common(), resolve(), buble(), uglify()]
}
