let replace = require('replace-in-file'),
	batchReplace = tg => tg.length ?
	replace(tg.pop(), e => batchReplace(tg)) :
	console.log('Replace OK'),
	targets = [{
		files: 'async.umd.js',
		replace: '}).call(undefined)',
		with: '}).call(tp(self).isDefined() ? self : this)'
	}, {
		files: 'async.umd.js',
		replace: "typeof self !== 'undefined' ? self : undefined",
		with: 'tp(self).isDefined() ? self : this'
	}]

batchReplace(targets)