function GL_filterShells(weapon){
	var include = 0;
	for(var i = 0; i < filters[1].length; i++){
		if(weapon["Shelling"].includes(filters[1][i])) include++;
	}
	if(filters[1].length == 0 || include > 0) include = 1;
	return include;
}

function GL_init(){
	data = GL_data;
	var header = document.getElementById("unique-header");
	header.innerHTML = `Shelling <i class="fa fa-fw fa-sort"></i>`;
	header.style.display = "";
	
	
	var filters = document.getElementById("filters-table");
	var filter_row = filters.insertRow();
	filter_row.innerHTML = `
		<td onClick="filterTable('Normal')" style="color: #c0c0c0; font-size: 10px; height: 100%; width: auto;">Normal</br>Shelling</td>
		<td onClick="filterTable('Long')" style="color: #c0c0c0; font-size: 10px; height: 100%; width: auto;">Long</br>Shelling</td>
		<td onClick="filterTable('Wide')" style="color: #c0c0c0; font-size: 10px; height: 100%; width: auto;">Wide</br>Shelling</td>		
	`;
	filter_row.id = "filter_row";
}

function GL_terminate(){
	var filter_row = document.getElementById("filter_row");
	filter_row.parentNode.removeChild(filter_row);
}