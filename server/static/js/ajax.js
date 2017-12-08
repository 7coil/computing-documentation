/* globals toggleNav sidenav MathJax */

const link = () => {
	[...document.getElementsByTagName('a')]
		.filter(elem => !elem.dataset.listen)
		.forEach((elem) => {
			elem.dataset.listen = true;
			elem.addEventListener('click', function ajax(event) {
				if (window.location.hostname === this.hostname && !this.pathname.includes('.')) {
					event.preventDefault();
					if (window.location.pathname !== this.pathname) {
						console.log(this.pathname);
						const xhttp = new XMLHttpRequest();
						const url = this.href;
						xhttp.onreadystatechange = function onLoad() {
							if (this.readyState === 4) {
								document.getElementById('content').innerHTML = this.responseText;
								const info = document.getElementById('info');
								document.getElementById('title').innerHTML = info.getElementsByTagName('header')[0].innerHTML;
								MathJax.Hub.Typeset();
								window.history.pushState('', 'Page', url);
								link();
							}
						};
						xhttp.open('get', `${this.pathname}?ajax=true`, true);
						xhttp.send();
						if (sidenav.className === 'sidenavon') {
							toggleNav();
						}
					}
				}
			});
		});
};

window.addEventListener('load', link);
