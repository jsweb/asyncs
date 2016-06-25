let replace = require('replace-in-file'),
	batchReplace = (fs) => fs.length ? replace(fs.pop(), e => batchReplace(fs)) : 1,
	targets = [{
		files: 'async.umd.js',
		replace: '}).call(undefined)',
		with: '}).call(type(self).isDefined() ? self : this)'
	}, {
		files: 'async.umd.js',
		replace: "typeof self !== 'undefined' ? self : undefined",
		with: 'type(self).isDefined() ? self : this'
	}]

batchReplace(targets)
