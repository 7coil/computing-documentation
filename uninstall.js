const Service = require('node-windows').Service;
const path = require('path');

const svc = new Service({
	name: 'Computing Documentation',
	description: 'computing.moustacheminer.com',
	script: path.join(__dirname, 'index.js')
});

svc.on('uninstall', () => {
	svc.start();
});

svc.uninstall();
