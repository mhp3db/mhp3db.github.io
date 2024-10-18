var pages = {
		"Home": "index.html",
		"Weapon Database": "database.html",
		"Effective Raw Calculator": "damage-calculator.html",
		"Charm Lookup": "charm-search.html",
		"Kelbi Horn Reward Tables": "kelbi-horn.html"
};

function openSidenav(){
	document.getElementById("sidenav").style.visibility = "visible";
	document.getElementById("sidenav").style.width = "100vw";
}

function closeSidenav(){
	document.getElementById("sidenav").style.width = "0";
	document.getElementById("sidenav").style.visibility = "hidden";
}

window.addEventListener("load", () => {
	var page = window.location.pathname.split("/").pop();
	var navbar = document.getElementById("navbar");
	navbar.innerHTML = `
		<button type="button" onClick="openSidenav()">
			<svg width="24" height="24">
				<path fill="currentColor" d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"></path>
			</svg>
		</button>
	`;
	
	var sidenav = document.getElementById("sidenav");
	sidenav.innerHTML = `<span onClick="closeSidenav()">&times;</span><img class="logo" src="assets/logo.png">`;
	for(title in pages){
		sidenav.innerHTML += `<a href="${pages[title]}">${title}</a>`;
		if(page === pages[title]){
			navbar.innerHTML += `<span onClick="openSidenav()" style="cursor: pointer">${title}</span>`;
		}
	}	
});