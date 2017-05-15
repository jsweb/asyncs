const gulp = require('gulp'),
	plg = require('gulp-load-plugins')(),
	server = require('gulp-live-server'),
	system = require('node-notifier'),
	rollup = require('rollup').rollup,
	bubble = require('rollup-plugin-buble'),
	uglify = require('rollup-plugin-uglify'),
	commonjs = require('rollup-plugin-commonjs'),
	resolve = require('rollup-plugin-node-resolve'),
	nib = require('nib'),
	axis = require('axis'),
	jeet = require('jeet'),
	rupture = require('rupture'),
	autoprefixer = require('autoprefixer-stylus'),
	stylcfg = {
		compress: true,
		sourcemap: {
			comment: true,
			inline: true
		},
		use: [nib(), axis(), jeet(), rupture(), autoprefixer()]
	},
	bundle = (entry, dest, format, mod, map) => {
		return rollup({
			entry,
			context: 'window',
			plugins: [
				bubble(),
				uglify(),
				commonjs({
					include: 'node_modules/**'
				}),
				resolve({
					jsnext: true,
					main: true
				})
			]
		}).then(js => {
			js.write({
				dest,
				format,
				moduleId: mod,
				moduleName: mod,
				sourceMap: map
			})
			return system.notify({
				title: 'Gulp',
				message: 'Rollup compilado',
				sound: true
			})
		})
	}

gulp.task('default', ['cache', 'watch', 'server'])
gulp.task('deploy', ['imagemin', 'stylus', 'pug', 'web'])

//Image min
gulp.task('imagemin', done => {
	return gulp.src('web/img/*')
		.pipe(plg.cached('imagemin'))
		.pipe(plg.imagemin())
		.pipe(gulp.dest('public'))
		.pipe(plg.notify('Imagem otimizada para web'))
})

//Stylus
gulp.task('stylus', done => {
	return gulp.src('web/css/*.styl')
		.pipe(plg.cached('stylus'))
		.pipe(plg.sourcemaps.init())
		.pipe(plg.stylus(stylcfg))
		.pipe(plg.sourcemaps.write())
		.pipe(gulp.dest('public'))
		.pipe(plg.notify('Stylus processado'))
})

//HTML
gulp.task('pug', done => {
	return gulp.src('web/html/*.pug')
		.pipe(plg.cached('pug'))
		.pipe(plg.pug())
		.pipe(gulp.dest('public'))
		.pipe(plg.notify('Pug compilado'))
})

//Rollup
gulp.task('lib', done => {
	return bundle('asyncs.jsx', 'asyncs.js', 'umd', 'polyasync', false)
})
gulp.task('web', done => {
	return bundle('web/js/index.js', 'public/index.js', 'iife', 'index', 'inline')
})

//Cache
gulp.task('cache', done => {
	gulp.src('web/css/*.styl').pipe(plg.cached('stylus'))
	gulp.src('web/html/*.pug').pipe(plg.cached('pug'))
	gulp.src('web/img/*').pipe(plg.cached('imagemin'))

	return system.notify({
		title: 'Gulp',
		message: 'Arquivos armazenados em cache',
		sound: true
	})
})

//Watch
gulp.task('watch', done => {
	gulp.watch('asyncs.jsx', ['lib', 'web'])
	gulp.watch('web/js/index.js', ['web'])

	gulp.watch('web/css/*.styl', ['stylus'])
	gulp.watch('web/html/*.pug', ['pug'])
	gulp.watch('web/img/*', ['imagemin'])

	return system.notify({
		title: 'Gulp',
		message: 'Tarefas aguardando atualizações',
		sound: true
	})
})

//Live server
gulp.task('server', done => {
	let srv = server.static('/public', 8080)
	srv.start()
	gulp.watch('public/*', file => srv.notify(file))
})
