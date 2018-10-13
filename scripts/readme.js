const path = require('path')
const fs = require('fs')
const pack = require('../package.json')

const readme = path.join(process.cwd(), 'README.md')
const data = fs.readFileSync(readme, 'utf8')
const content = data.split(`## ${pack.name}`)
const docs = content[1].replace(/\*\*Kind\*\*: global \w+\s+/g, '')
const result = `# ${pack.name} \n ${docs}`

fs.writeFileSync(readme, result)
