var charm_info = document.getElementById("charm_info");
var sorting = [];
var rows_list = [];

function clear_skill_1_num(){
	if(document.getElementById("skill_1_name").value == "Any") document.getElementById("skill_1_num").value = "0";
}

function clear_skill_2_num(){
	if(document.getElementById("skill_2_name").value == "Any") document.getElementById("skill_2_num").value = "0";
}

function getSkill(skill){
	const filter = skill.match(/(.+?)\s*(-?\d+)$/);
	if(filter){
		return [filter[1].trim(), parseInt(filter[2], 10)];
	}
	return ["---", "---"];
}

function populate_dropdown(ID, array){
	var dropdown = document.getElementById(ID);
	for(var i = 0; i < array.length; i++){
		var option = document.createElement("option");
		option.textContent = array[i];
		option.value = array[i];
		dropdown.appendChild(option);
	}
}

function get_data(){
	var rarity = ["Common", "Queen", "King", "Dragon"];
	var skill_1_names = [];
	var skill_2_names = [];
	var slots = ["---", "O--", "OO-", "OOO"];
	var tables = [];
	for(var i = 0; i < data.length; i++){
		var skill_1_name = getSkill(data[i]["Skill 1"])[0];
		var skill_2_name = getSkill(data[i]["Skill 2"])[0];
		var table = data[i]["Table No."];

		if(!skill_1_names.includes(skill_1_name)) skill_1_names.push(skill_1_name);
		if(!skill_2_names.includes(skill_2_name)) skill_2_names.push(skill_2_name);
		if(!tables.includes(table)) tables.push(table);
	}
	skill_1_names.sort();
	skill_2_names.sort();
	
	populate_dropdown("rarity", rarity);
	populate_dropdown("skill_1_name", skill_1_names);
	populate_dropdown("skill_2_name", skill_2_names);
	populate_dropdown("slots", slots);
	populate_dropdown("table", tables);
}

function search(){
	while(charm_info.firstChild) charm_info.removeChild(charm_info.firstChild);
	var rarity = document.getElementById("rarity").value;
	if(rarity != "Any") rarity += " Talisman";
	var max_results = document.getElementById("max_results").value;
	var skill_1_name = document.getElementById("skill_1_name").value;
	var skill_1_eq = document.getElementById("skill_1_eq").value;
	var skill_1_num = parseInt(document.getElementById("skill_1_num").value);
	var skill_2_name = document.getElementById("skill_2_name").value;
	var skill_2_eq = document.getElementById("skill_2_eq").value;
	var skill_2_num = parseInt(document.getElementById("skill_2_num").value);
	var slots = document.getElementById("slots").value;
	var table = document.getElementById("table").value;
	var search_filter = document.getElementById("search").value;
	
	
	var skill_1 = skill_1_name + " " + skill_1_num;
	var skill_2 = skill_2_name + " " + skill_2_num;
	if(skill_2_name === "---") skill_2 = "";
	switch(slots){
		case "Any": slots = "Any"; break;
		case "---": slots = "0"; break;
		case "O--": slots = "1"; break;
		case "OO-": slots = "2"; break;
		case "OOO": slots = "3"; break;
	}
	
	var result = data.filter(item => {
		switch(skill_1_eq){
			case "l": var cdt_1 = (getSkill(item["Skill 1"])[1] < skill_1_num); break;
			case "le": var cdt_1 = (getSkill(item["Skill 1"])[1] <= skill_1_num); break;
			case "e": var cdt_1 = (getSkill(item["Skill 1"])[1] == skill_1_num); break;
			case "ge": var cdt_1 = (getSkill(item["Skill 1"])[1] >= skill_1_num); break;
			case "g": var cdt_1 = (getSkill(item["Skill 1"])[1] > skill_1_num); break;
		}
		switch(skill_2_eq){
			case "l": var cdt_2 = (getSkill(item["Skill 2"])[1] < skill_2_num); break;
			case "le": var cdt_2 = (getSkill(item["Skill 2"])[1] <= skill_2_num); break;
			case "e": var cdt_2 = (getSkill(item["Skill 2"])[1] == skill_2_num); break;
			case "ge": var cdt_2 = (getSkill(item["Skill 2"])[1] >= skill_2_num); break;
			case "g": var cdt_2 = (getSkill(item["Skill 2"])[1] > skill_2_num); break;
		}
		return(
			(rarity === "Any" || item["Charm Name"] === rarity) &&
			(skill_1_name === "Any" || ((getSkill(item["Skill 1"])[0] === skill_1_name) && cdt_1)) &&
			(skill_2_name === "Any" || ((getSkill(item["Skill 2"])[0] === skill_2_name) && cdt_2)) &&
			(slots === "Any" || item["Charm Slot"] === slots) &&
			(table === "Any" || item["Table No."] === table) &&
			(getSkill(item["Skill 1"])[0] !== getSkill(item["Skill 2"])[0]) &&
			(search_filter === "" || item["Skill 1"].toLowerCase().includes(search_filter.toLowerCase()) || item["Skill 2"].toLowerCase().includes(search_filter.toLowerCase()))
		);
	});


	var sorting_header = [];
	for(var i = 0; i < Math.min(result.length, max_results); i++){
		var rarity = ["Common Talisman", "Queen Talisman", "King Talisman", "Dragon Talisman"].indexOf(result[i]["Charm Name"]);
		var skill_2_search = result[i]["Skill 2"] == "" ? "-" : result[i]["Skill 2"];
		var n_slots = "---";
		switch(result[i]["Charm Slot"]){
			case "0": n_slots = "---"; break;
			case "1": n_slots = "O--"; break;
			case "2": n_slots = "OO-"; break;
			case "3": n_slots = "OOO"; break;
		};
		var row = document.createElement("tr");
		row.innerHTML = `
			<td><img src="assets/talismans/${result[i]["Charm Name"]}.png"></td>
			<td>${result[i]["Skill 1"]}</td>
			<td>${skill_2_search}</td>
			<td>${n_slots}</td>
			<td>${result[i]["Table No."]}</td>
		`;
		
		var headers = [
			rarity,
			getSkill(result[i]["Skill 1"])[1]+getSkill(result[i]["Skill 1"])[0],
			getSkill(result[i]["Skill 2"])[1]+getSkill(result[i]["Skill 2"])[0],
			result[i]["Charm Slot"],
			parseInt(result[i]["Table No."])
		];
		var sort_type = 0;
		var header_index = 0;
		for (var i = 0; i < sorting.length; i++) {
			if (sorting[i] > 0) {
				header_index = i;
				sort_type = sorting[i];
			}
		}
		var index = -1;
		for (var i = 0; i < sorting_header.length; i++) {
			if ((sort_type == 1 && headers[header_index] > sorting_header[i]) || (sort_type == 2 && headers[header_index] < sorting_header[i])) {
				index = i;
				break;
			}
		}

		if (index == -1) {
			row.style.cursor = "default";
			rows_list.push(row);
			charm_info.appendChild(row);
			sorting_header.push(headers[header_index]);
			charm_info.firstChild.scrollIntoView({
				behavior: 'smooth',
				block: 'center'
			});
		} else {
			var r = charm_info.insertRow(index);
			r.innerHTML = row.innerHTML;
			r.style.cursor = "default";
			rows_list.push(r);
			sorting_header.splice(index, 0, headers[header_index]);
			charm_info.firstChild.scrollIntoView({
				behavior: 'smooth',
				block: 'center'
			});
		}
	}
}

function getHeaders(){
	var headers = [
		document.getElementById("rarity-header"),
		document.getElementById("skill-1-header"),
		document.getElementById("skill-2-header"),
		document.getElementById("slots-header"),
		document.getElementById("charm-table-header")
	];

	return headers;
}

function toggleFilters(){
	var filters = document.getElementById("filters");
	if(filters.style.display != "none"){
		filters.style.display = "none";
		document.getElementById("filter_toggle").innerHTML = `
			Filters <i class="fa fa-angle-down">
		`;
		document.getElementById("charm_table").classList.remove("table-view-3row");
		document.getElementById("charm_table").classList.add("table-view-full");
	}
	else{
		filters.style.display = "";
		document.getElementById("filter_toggle").innerHTML = `
			Filters <i class="fa fa-angle-up">
		`;
		document.getElementById("charm_table").classList.remove("table-view-full");
	}
}

function sortTable(col){
	while(charm_info.firstChild) charm_info.removeChild(charm_info.firstChild);
	var headers = getHeaders();
	
	for(var i = 0; i < headers.length; i++) headers[i].style.backgroundColor = "#202020";

	if(col != null){
		if(col == 4){
			if(sorting[col] > 0) sorting[col]--;
			else if(sorting[col] == 0) sorting[col] = 2;
		}
		else{
			if(sorting[col] < 2) sorting[col]++;
			else if(sorting[col] == 2) sorting[col] = 0;
		}
		
		for(var i = 0; i < sorting.length; i++) if(i != col) sorting[i] = 0;
	}
	for(var i = 0; i < headers.length; i++){
		switch(sorting[i]){
			case 0: 
				if(headers[i].children[0] != null){
					headers[i].children[0].classList.remove("fa-sort-desc");
					headers[i].children[0].classList.remove("fa-sort-asc");
					headers[i].style.backgroundColor = "#202020";
				}
				break;
			case 1:
				headers[i].children[0].classList.add("fa-sort-desc");
				headers[i].children[0].classList.remove("fa-sort-asc");
				headers[i].style.backgroundColor = "#303030";
				if(i == 8 && WEAPON_TYPE == "HH"){
					headers[i].children[0].classList.add("fa-sort-asc");
					headers[i].children[0].classList.remove("fa-sort-desc");
				}
				break;
			case 2:
				headers[i].children[0].classList.add("fa-sort-asc");
				headers[i].children[0].classList.remove("fa-sort-desc");
				headers[i].style.backgroundColor = "#303030";
				if(i == 8 && WEAPON_TYPE == "HH"){
					headers[i].children[0].classList.add("fa-sort-desc");
					headers[i].children[0].classList.remove("fa-sort-asc");
				}
				break;
		}
	}
	
	search();
}

function addSearch(){
	var filters = document.getElementById("filters-table");
	var filter_row = filters.insertRow(4);
	filter_row.classList.add("search-row");
	filter_row.innerHTML = `
		<td colspan="3"><i class="fa fa-search"> <input type="text" id="search" class="search-bar"></input>	
	`;
	filter_row.id = "search_row";
	document.getElementById("search_row").onkeydown = function(e){
		if(e.keyCode == 13){
			sortTable();
		}
	}
}

function reset_inputs(){
	while(charm_info.firstChild) charm_info.removeChild(charm_info.firstChild);
	sorting = Array(getHeaders().length).fill(0);
	rows_list = [];
	search_filter = "";
	if(document.getElementById("search") != null)
		document.getElementById("search").value = "";
	document.getElementById("max_results").value = "100";
	document.getElementById("skill_1_name").value = "Any";
	document.getElementById("skill_1_eq").value = "e";
	document.getElementById("skill_1_num").value = "0";
	document.getElementById("skill_2_name").value = "Any";
	document.getElementById("skill_2_eq").value = "e";
	document.getElementById("skill_2_num").value = "0";
	document.getElementById("rarity").value = "Any";
	document.getElementById("slots").value = "Any";
	document.getElementById("table").value = "Any";
}

window.onload = function(){
	reset_inputs();
	addSearch();
	get_data();
}
