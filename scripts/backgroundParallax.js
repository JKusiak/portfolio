

const animateParallaxBackground = () => {
	let prevCursorX = 0;
	let prevCursorY = 0;
	let offsetY = 0;
	let offsetX = 0;
	let hasRun = false;

	const parallax = (event) => {
		const cursorXDelta = event.clientX - prevCursorX;
		const cursorYDelta = event.clientY - prevCursorY;
		
		// increasing offset on mouse move for different background layers
		const depth1 = `${-offsetX * 0.06}px ${-offsetY * 0.06}px`;
		const depth2 = `${offsetX * 0.06}px ${offsetY * 0.06}px`
		const depth3 = `0 0`;
		
		const backgroundLayers = `${depth1}, ${depth2}, ${depth3}`;
		background.style.backgroundPosition = backgroundLayers;

		prevCursorX = event.clientX;
		prevCursorY = event.clientY;
		offsetX += cursorXDelta;
		offsetY += cursorYDelta;

		// gets rid of the flickering effect on moving mouse to the window for the first time
		if (!hasRun) offsetX = offsetY = 0;
			
		hasRun = true;
	}

    const background = document.querySelector("body");
	background.addEventListener("mousemove", parallax);
}

animateParallaxBackground();