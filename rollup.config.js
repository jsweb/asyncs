import replace from '@rollup/plugin-replace'
import pack from './package.json'

const external = (name) => `./jsweb-packs/unpkg/${name}.js`
const modify = new Date().toJSON().split('.')[0].replace('T', ' ')
const banner = `/**
 * @name ${pack.name}
 * @version ${pack.version}
 * @desc ${pack.description}
 * @author ${pack.author}
 * @create date 2016-06-25 03:14:48
 * @modify date ${modify}
 */`

export default {
  input: 'src/index.js',
  external: ['params', 'truetype'].map(external),
  plugins: [
    replace({
      delimiters: ['', ''],
      '../': './',
    }),
  ],
  output: {
    banner,
    format: 'esm',
    file: 'index.js',
  },
}
