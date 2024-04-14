function DB_init(){
	data = DB_data;
	var header = document.getElementById("unique-header");
	header.innerHTML = "";
	header.style.display = "none";
	document.getElementById("para_filter").style.display = "none";
}

function DB_terminate(){
	document.getElementById("para_filter").style.display = "";
}