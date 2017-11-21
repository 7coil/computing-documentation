const Service = require('node-windows').Service;
const path = require('path');

const svc = new Service({
	name: 'Computing Documentation',
	description: 'computing.moustacheminer.com',
	script: path.join(__dirname, 'index.js')
});

svc.on('install', () => {
	svc.start();
});

svc.install();
