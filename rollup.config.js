import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'
import esmin from 'rollup-plugin-esmin'
import pack from './package.json'

const name = pack.name.split('/')[1]
const modify = new Date().toJSON().split('.')[0].replace('T', ' ')
const banner = `/**
 * @name ${pack.name}
 * @version ${pack.version}
 * @desc ${pack.description}
 * @author ${pack.author}
 * @create date 2016-06-25 03:14:48
 * @modify date ${modify}
 * @example
 * import { requestJSON, requestAll, requestRace } from '@jsweb/asyncs'
 */`

export default [{
  input: 'src/module.ts',
  plugins: [typescript()],
  external: ['@jsweb/params', '@jsweb/truetype'],
  output: {
    name,
    banner,
    format: 'esm',
    file: 'dist/module.mjs'
  }
}, {
  input: 'src/umd.ts',
  plugins: [resolve(), typescript(), esmin()],
  output: {
    name,
    banner,
    format: 'umd',
    file: 'dist/umd.js'
  }
}]
