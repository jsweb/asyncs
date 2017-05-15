import req from '../../asyncs.jsx'

const test = document.getElementById('test')

req.all(['/', '/', '/'], 0, 'text')
	.then(html => test.textContent = html.join('\n\n'))
	.catch(e => test.textContent = `Error ${e.response.status}: ${e.message}`)

console.log(req)
