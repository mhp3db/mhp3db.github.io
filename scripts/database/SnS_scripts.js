function SnS_init(){
	data = SnS_data;
	var header = document.getElementById("unique-header");
	header.innerHTML = "";
	header.style.display = "none";
	
	var filters = document.getElementById("filters-table");
	var filter_row = filters.insertRow();
	var border_color = "1px solid #404040";
	filter_row.innerHTML = `
		<td onClick="filterTable('Sleep')" style="color: #c0c0c0; width: auto;">Sleep</td>
	`;
	filter_row.id = "filter_row";
}

function SnS_terminate(){
	var filter_row = document.getElementById("filter_row");
	filter_row.parentNode.removeChild(filter_row);
}