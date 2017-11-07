console.log('Welcome to Moustacheminer Server Services!');

const i18n = require('i18n');
const path = require('path');
const config = require('config');
const express = require('express');
const docsRouter = require('./docs');
const localesRouter = require('./locales');
const expressLess = require('express-less');
const cookieParser = require('cookie-parser');

const app = express();

i18n.configure({
	directory: path.join(__dirname, 'locales'),
	cookie: 'lang',
	defaultLocale: 'en-gb',
	autoReload: true,
	updateFiles: false
});

app.locals.sitemap = require('./sitemap.json').website;

// Middleware
app.enable('trust proxy')
	.set('views', path.join(__dirname, '/dynamic'))
	.set('view engine', 'pug')
	.use(cookieParser())
	.use(i18n.init)
	.use('/locales', localesRouter)
	.use('/docs', docsRouter)
	.use('/less', expressLess(path.join(__dirname, 'less')))
	.get('/', (req, res) => {
		res.render('index');
	})
	.use(express.static(path.join(__dirname, '/static')))
	.use('*', (req, res) => res.status(404).render('error', {
		status: 404,
		message: [
			'Not found'
		]
	}));

console.log('Listening on', config.get('webserver').port);
app.listen(config.get('webserver').port);
