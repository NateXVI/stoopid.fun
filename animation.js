animationDuration = 1;
animationDelay = 0.5;
function addPopIn(element, depth = 0) {
	const children = element.children;
	for (let i = 0; i < children.length; i++) {
		addPopIn(children[i], depth + 1 + i);
	}

	console.log(depth);
	// element.style.animation = element.style.animation + 'pop-in';
	// element.style.animationDuration = toString(animationDuration);
	// element.style.animationDelay()
	// element.style.animationDirection = 'forward';
	element.style.classList.add('pop-in');
}

addPopIn(document.querySelector('.main'));
addPopIn(document.querySelector('img.title'));
