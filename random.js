const sites = [
	'https://canvas.stoopid.fun',
	'https://flappy.stoopid.fun',
	'https://dvd.stoopid.fun',
	'https://pokemon.stoopid.fun',
];

const button = document.querySelector('button.random');

function randomSite() {
	console.log('asfdasdf');
	const site = sites[Math.floor(Math.random() * sites.length)];
	window.location = site;
}
