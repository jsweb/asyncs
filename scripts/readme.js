import { join } from 'path'
import { readFileSync, writeFileSync } from 'fs'

const root = process.cwd()
const readme = join(root, 'README.md')
const packjson = join(root, 'package.json')

const data = readFileSync(readme, 'utf8')
const json = readFileSync(packjson, 'utf8')

const pack = JSON.parse(json)

const content = data
  .split(pack.author)[1]
  .replace(/\*\*Kind\*\*: global \w+\s+/g, '')

const result = `# ${pack.name}

${pack.description}.

![npm-package](https://img.shields.io/badge/npm-package-blue.svg?style=for-the-badge)
![es6-module](https://img.shields.io/badge/es6-module-blue.svg?style=for-the-badge)
![tests-mocha](https://img.shields.io/badge/tests-mocha-blue.svg?style=for-the-badge)

## New in v4.0.0

Now, its a full ES module, there is no UMD or CommonJS version.

In modern JS development ES modules are the pattern, already supported in newer versions of Node.js and modern borwsers natively.

Backward compatibility is not a concern here. If you use a module bundler (like Webpack or Rollup) to transpile your code, the result will be compatible according to your setup.

***

## Methods
${content}`

writeFileSync(readme, result)
