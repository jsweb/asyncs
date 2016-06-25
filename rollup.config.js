import buble from 'rollup-plugin-buble'

export default {
  moduleId: 'async',
  moduleName: 'async',
  entry: 'async.js',
  dest: 'async.umd.js',
  plugins: [ buble() ],
  format: 'umd'
}
