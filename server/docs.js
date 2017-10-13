const express = require('express');
const marked = require('marked');
const sitemap = require('./sitemap.json');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/:page', (req, res, next) => {
	const { page } = req.params;
	if (fs.existsSync(path.join(__dirname, 'docs', `${page}.md`))) {
		fs.readFile(path.join(__dirname, 'docs', `${page}.md`), 'utf8', (err, data) => {
			res.render('markdown.pug', {
				markdown: marked(data),
				title: sitemap.website.find(site => site.url === req.originalUrl).name
			});
		});
	} else {
		next();
	}
});

module.exports = router;
