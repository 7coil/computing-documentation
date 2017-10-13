const sidenav = document.getElementById('sidenav');
const sidedarken = document.getElementById('sidedarken');

const toggleNav = () => { // eslint-disable-line no-unused-vars
	if (sidenav.className === 'sidenavon') {
		sidenav.className = 'sidenavoff';
		sidedarken.className = 'sidedarkenoff';
		document.body.className = 'scroll';
	} else {
		sidenav.className = 'sidenavon';
		sidedarken.className = 'sidedarkenon';
		document.body.className = 'noscroll';
	}
};
