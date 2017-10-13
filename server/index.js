console.log('Welcome to Moustacheminer Server Services!');

const config = require('config');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressLess = require('express-less');
const docsRouter = require('./docs');

const app = express();

app.locals.name = config.get('name');
app.locals.sitemap = require('./sitemap.json').website;

// Middleware
app.enable('trust proxy')
	.set('views', path.join(__dirname, '/dynamic'))
	.set('view engine', 'pug')
	.use(cookieParser())
	.use('/docs/', docsRouter)
	.use('/theme/:type', (req, res) => {
		res.cookie('theme', req.params.type, {
			maxAge: 900000,
			httpOnly: true
		});
		res.redirect('/');
	})
	.use('/less', expressLess(path.join(__dirname, 'less')))
	.get('/', (req, res) => {
		res.render('index.pug');
	})
	.use(express.static(path.join(__dirname, '/static')))
	.use('*', (req, res) => res.status(404).render('error.pug', {
		status: 404,
		message: [
			'Not found'
		]
	}));

console.log('Listening on', config.get('webserver').port);
app.listen(config.get('webserver').port);
