const fs = require('fs');
const url = require('url');
const path = require('path');
const marked = require('marked');
const express = require('express');
const sitemap = require('./sitemap.json');

const router = express.Router();

router.get('/:page', (req, res, next) => {
	const { page } = req.params;
	if (fs.existsSync(path.join(__dirname, 'docs', `${page}.md`))) {
		fs.readFile(path.join(__dirname, 'docs', `${page}.md`), 'utf8', (err, data) => {
			const site = sitemap.website.find(link => link.url === url.parse(req.originalUrl).pathname);
			res.render('markdown.pug', {
				markdown: marked(data),
				title: site ? site.name : ''
			});
		});
	} else {
		next();
	}
});

module.exports = router;
