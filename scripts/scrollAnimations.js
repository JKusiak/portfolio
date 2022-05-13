const animateScroll = () => {
	const navContent = document.getElementById("navContent");
	const downArrow = document.getElementById("downArrow");
	const contactSidebar = document.getElementById("contactSidebar");
	const sections = document.querySelectorAll("section");
	const navElements = document.querySelectorAll("#navContent a");
	let previousSection = "";

	window.addEventListener('scroll', () => {
		const offset = window.scrollY;

		// navigation underline widening
		if (offset > (window.innerHeight / 4)) {
			navContent.style.width="100vw";
		} else {
			navContent.style.width="25vw";
		}

		// intro arrow disappearing
		if (offset > (window.innerHeight / 3)) {
			downArrow.style.opacity = "0";
			downArrow.style.visibility = "hidden"; 
		} else {
			downArrow.style.opacity = "100%"
			downArrow.style.visibility = "visible"; 
		}

		// sidebar contacts menu diappearing
		if (offset > (document.documentElement.scrollHeight - (1.2 * window.innerHeight))) {
			contactSidebar.style.opacity = "0"
			contactSidebar.style.visibility = "hidden"
		} else {
			contactSidebar.style.opacity = "100%"
			contactSidebar.style.visibility = "visible"
		}

		// previousSection tracks change to only update hash in the url on section change
		previousSection = checkHighlightedNav(offset, sections, navElements, previousSection);
		
	});

	checkHighlightedNav(0, sections, navElements, previousSection); // to set up nav colors before scrolling
}

const checkHighlightedNav = (offset, sections, navElements, prevSection) => {
	let current = "";
	sections.forEach((section) => {
		const sectionDistance = section.offsetTop;
		const sectionHeight = section.clientHeight;
		const screenCenter = offset + (window.innerHeight / 2) // scrolled pixels starting from the middle of the screen
		if (((screenCenter >= sectionDistance) && (screenCenter <= sectionDistance + sectionHeight))) {
			current = section.getAttribute("id");
			if (current !== prevSection) {
				history.pushState({}, "", `#${current}`);
			}
		}
		
	});
	navElements.forEach((element) => {
		// verify if section is not a wave separator, otherwise all navigation becomes colorless
		if (current !== "") element.classList.remove("scrollAnimation");

		const elementIsCurrent = element.classList.contains(current);
		const elementNotAlreadyCurrent = !element.classList.contains("scrollAnimation")
		if (elementIsCurrent && elementNotAlreadyCurrent) element.classList.add("scrollAnimation");
	});

	return current;
}

animateScroll();
