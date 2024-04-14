function SA_filterPhials(weapon){
	var include = 0;
	for(var i = 0; i < filters[1].length; i++){
		if(weapon["Phial"].includes(filters[1][i])) include++;
	}
	if(filters[1].length == 0 || include > 0) include = 1;
	return include;
}

function SA_init(){
	data = SA_data;
	var header = document.getElementById("unique-header");
	header.innerHTML = `Phials <i class="fa fa-fw fa-sort"></i>`;
	header.style.display = "";
	
	
	var filters = document.getElementById("filters-table");
	var filter_row_0 = filters.insertRow();
	filter_row_0.innerHTML = `
		<td onClick="filterTable('Power Phial')" style="color: #c0c0c0; font-size: 10px; height: 100%; width: auto;">Power</br>Phial</td>
		<td onClick="filterTable('Elemental Phial')" style="color: #c0c0c0; font-size: 10px; height: 100%; width: auto;">Elemental</br>Phial</td>
		<td onClick="filterTable('Exhaust Phial')" style="color: #c0c0c0; font-size: 10px; height: 100%; width: auto;">Exhaust</br>Phial</td>
		<td onClick="filterTable('Poison Phial')" style="color: #c0c0c0; font-size: 10px; height: 100%; width: auto;">Poison</br>Phial</td>
	`;
	filter_row_0.id = "filter_row_0";
	var filter_row_1 = filters.insertRow();
	filter_row_1.innerHTML = `
		<td onClick="filterTable('Paralysis Phial')" style="color: #c0c0c0; font-size: 10px; height: 100%; width: auto;">Paralysis</br>Phial</td>
		<td onClick="filterTable('Dragon Phial')" style="color: #c0c0c0; font-size: 10px; height: 100%; width: auto;">Dragon</br>Phial</td>
	`;
	filter_row_1.id = "filter_row_1";
}

function SA_terminate(){
	var filter_row_0 = document.getElementById("filter_row_0");
	filter_row_0.parentNode.removeChild(filter_row_0);
	var filter_row_1 = document.getElementById("filter_row_1");
	filter_row_1.parentNode.removeChild(filter_row_1);
}