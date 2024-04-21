function openSidenav(){
	document.getElementById("sidenav").style.width = "100vw";
}

function closeSidenav(){
	document.getElementById("sidenav").style.width = "0";
}

function displayNavmenu(page){
	var navbar = document.getElementById("navbar");
	navbar.innerHTML = `
		<button type="button" onClick="openSidenav()">
			<svg width="24" height="24">
				<path fill="currentColor" d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"></path>
			</svg>
		</button>
	`;
	
	var sidenav = document.getElementById("sidenav");
	sidenav.innerHTML = `
		<span onClick="closeSidenav()">&times;</span>
		<img class="logo" src="assets/logo.png">
	`;
	
	sidenav.innerHTML += `<a href="index.html">Home</a>`;
	sidenav.innerHTML += `<a href="database.html">Weapon Database</a>`;
	sidenav.innerHTML += `<a href="damage-calculator.html">Damage Calculator</a>`;
	sidenav.innerHTML += `<a href="charm-search.html">Charm Table Search</a>`;
	sidenav.innerHTML += `<a href="kelbi-horn.html">Kelbi Horn Reward Tables</a>`;
	
	switch(page){
		case "index":
			navbar.innerHTML += `<span onClick="openSidenav()" style="cursor: pointer">Home</span>`;
			break;
		case "database":
			navbar.innerHTML += `<span onClick="openSidenav()" style="cursor: pointer">Weapon Database</span>`;
			break;
		case "damage-calculator":
			navbar.innerHTML += `<span onClick="openSidenav()" style="cursor: pointer">Damage Calculator</span>`;
			break;
		case "charm-search":
			navbar.innerHTML += `<span onClick="openSidenav()" style="cursor: pointer">Charm Table Search</span>`;
			break;
		case "kelbi-horn":
			navbar.innerHTML += `<span onClick="openSidenav()" style="cursor: pointer">Kelbi Horn Reward Tables</span>`;
			break;
	}
	
	document.getElementById("footer").innerHTML = `
		<div class="footer"><a href="https://github.com/SilverJolteon">©2024 SilverJolteon</a></div>
	`;
	
}