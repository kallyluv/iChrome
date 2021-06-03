window.addEventListener('load', () => {
	setInterval((TextAlignment) => {
		document.querySelectorAll(".card").forEach((card) => {
			height = card.offsetHeight;
			side = card.parentElement.querySelector(".side-text");
			if (side == null) return;
			side.style.top = height / 2 - side.offsetHeight / 2 + "px";
		});
		document.querySelectorAll('#head-img span').forEach((span) => {
			width = span.clientWidth;
			span.style.left = (window.innerWidth / 2) - (width / 2) + 'px';
		});
	}, 0);
	document.querySelectorAll('header button').forEach((button) => {
		button.onclick = () => {
			document.querySelector('#' + document.querySelector('header button.active').innerHTML.toLowerCase()).style.transform = 'scale(0)';
			document.querySelector('#' + document.querySelector('header button.active').innerHTML.toLowerCase()).style.zIndex = 0;
			document.querySelector('header button.active').classList.remove('active');
			button.classList.add('active');
			document.title = button.innerHTML + " - Smart Text Editor";
			document.querySelector('#' + button.innerHTML.toLowerCase()).style.transform = 'scale(1)';
			document.querySelector('#' + button.innerHTML.toLowerCase()).style.zIndex = 1;
		}
	})
});