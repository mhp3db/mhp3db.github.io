var WEAPON_TYPE = "GS";
var anchor_weapon = "";
var selection_list = ["GS", "LS", "SnS", "DB", "Hammer", "HH", "Lance", "GL", "SA", "LBG", "HBG", "Bow"];
var data = null;
var sorting = []; 
var filters = [[], []];
var fully_upgraded = 0;
var weapon_info = document.getElementById("weapon_info");
var materials_info = document.getElementById("materials_info");
var rows_list = [];
var active_row = null;
var search_filter = "";

function changeWeapon(type){
	filterTable("Clear");
	var search_row = document.getElementById("search_row");
	if(search_row != null) search_row.parentNode.removeChild(search_row);
	//----------------------------------------------------------------------------------------------------
	//-----WEAPON TYPE------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------------------------
	switch(WEAPON_TYPE){
		case "Bow":
			Bow_terminate();
			break;
		case "DB":
			DB_terminate();
			break;
		case "GL":
			GL_terminate();
			break;
		case "GS":
			GS_terminate();
			break;
		case "HBG":
			HBG_terminate();
			break;
		case "LBG":
			LBG_terminate();
			break;
		case "HH":
			HH_terminate();
			break;
		case "Lance":
			Lance_terminate();
			break;
		case "LBG":
			LBG_terminate();
			break;
		case "SA":
			SA_terminate();
			break;
		case "SnS":
			SnS_terminate();
			break;
	}
	document.getElementById("weapon_table").classList.remove("table-view-2row");
	document.getElementById("weapon_table").classList.remove("table-view-3row");
	WEAPON_TYPE = type;
	main();
	document.getElementById("sidenav").style.width = "0";
}

function createSharpnessBar(sharpness_0, sharpness_1){
    var sharpness_colors = ["#ff0032", "#ff3f00", "#ffca00", "#41f000", "#1569ff", "#f0f0f0"];
    var sharpness_bar_0 = "";
    var sharpness_bar_1 = "";
    var sharpness_bar_1_exist = (typeof sharpness_1 !== 'undefined');
    for(var i = 0; i < 6; i++){
        if(i <= sharpness_0.length-1) sharpness_bar_0 += `<div class="sharpness-bar" style="background-color: ${sharpness_colors[i]}; width: ${sharpness_0[i]}px;"></div>`;
        if(sharpness_bar_1_exist && i <= sharpness_1.length-1) sharpness_bar_1 += `<div class="sharpness-bar" style="background-color: ${sharpness_colors[i]}; width: ${sharpness_1[i]}px;"></div>`;
    }
    var bar = `<table class="sharpness" style="border-collapse: collapse;"><tr style="background-color: transparent;"><td style="padding: 1px 1px;">`;
    bar += `<div class="sharpness-bar-container">${sharpness_bar_0}</div>`;
    if(sharpness_bar_1_exist) bar += `<div class="sharpness-bar-container">${sharpness_bar_1}</div></td><td style="padding: 1px 1px;"><div class="sharpness-1">+1</div>`;
    bar += `</td></tr></table>`;
    return bar;
}



function getSprite(material){
	for(var key in sprite_data){
		var pal = sprite_data[key];
		for(var coord in pal){
			var item = pal[coord];
			if(item.includes(material)){				
				var coords = coord.split(", ");
				var x = -1 * parseInt(coords[0]);
				var y = -1 * parseInt(coords[1]);
				var img = `<span style="width: 16px; height: 16px; display: flex; background-position: ${x}px ${y}px; background-image: url('assets/database/spritesheets/${key}.png')"></span>`;
				return img;
			}
		}
	}
	return "";
}

function copyLink() {
    var url = window.location.href;
    if(navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function() {
            showCopiedMessage();
        }).catch(function(err) {
            console.error('Failed to copy URL. Please try again.');
        });
    } else {
        //Older browsers
        var textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showCopiedMessage();
        } catch (err) {
            console.error('Failed to copy URL. Please try again.');
        }
        document.body.removeChild(textArea);
    }
}

function showCopiedMessage() {
	var copied = document.getElementById("copied");
	copied.classList.toggle("fade");
	setTimeout(function() {
		copied.classList.toggle("fade");
	}, 2000);
}

function showMoreInfo(event) {
	var id = event.currentTarget.id;
	for(var i = 0; i < rows_list.length; i++)
		if (rows_list[i].id == id) active_row = rows_list[i];
	if(active_row == null) return;
	var rows = weapon_info.getElementsByTagName("tr");
	for (var i = 0; i < rows.length; i++) {
		rows[i].classList.remove("active-row");
	}
	active_row.classList.add("active-row");
	active_row.scrollIntoView({
		block: "center",
		behavior: "smooth"
	});
	var weapon = data[active_row.id];
	var crafting_materials = weapon["Craft"];
	var upgrade_materials = weapon["Upgrade"];
	var table = `<div class="mat-box"><table><thead><tr><th></th><th>Material</th><th>Req</th></tr></thead><tbody>`;
	

	var craftable = typeof crafting_materials != "undefined";
	var upgradeable = typeof upgrade_materials != "undefined";

	if(craftable){
		var table_1 = table;
		for (var material in crafting_materials) {
			if (material != "z") {
				var sprite = getSprite(material);
				table_1 += `
				<tr>
					<td>${sprite}</td>
					<td style="text-align: left" class="mat-name">${material}</td>
					<td>${crafting_materials[material]}</td>
				</tr>
			 `;
			}
		}
		table_1 += "</tbody></table>";
		document.getElementById("crafting_materials").innerHTML = table_1;
	}
	else document.getElementById("crafting_materials").innerHTML = `
		<tr><td>None</td></tr></tbody></table></div>
	`;
	if(upgradeable){
		var table_2 = table;
		for (var material in upgrade_materials) {
			if (material != "z") {
				var sprite = getSprite(material);
				table_2 += `
				<tr>
					<td>${sprite}</td>
					<td style="text-align: left" class="mat-name">${material}</td>
					<td>${upgrade_materials[material]}</td>
				</tr>
			 `;
			}
		}
		table_2 += "</tbody></table>";
		document.getElementById("upgrade_materials").innerHTML = table_2;
	}
	else document.getElementById("upgrade_materials").innerHTML = `
		<tr><td>None</td></tr></tbody></table></div>
	`;
	
	weaponTree();
	weaponPreview();
	document.getElementById("materials-table").style.display = "";
	document.getElementById("overlay").style.display = "block";
	
	
	//----------------------------------------------------------------------------------------------------
	//-----WEAPON TYPE------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------------------------
	switch (WEAPON_TYPE) {
		case "Bow":
			Bow_showMoreInfo(event);
			break;
		case "HBG":
			HBG_showMoreInfo(event);
			break;
		case "HH":
			HH_showMoreInfo(event);
			break;
		case "LBG":
			LBG_showMoreInfo(event);
			break;
	}

	document.getElementById("weapon_tree").scrollIntoView({
		behavior: "smooth"
	});
	document.getElementById("materials-table").scrollIntoView({
		top: 0,
		behavior: "smooth"
	});
	window.location.hash = WEAPON_TYPE + (active_row != null ? "&w="+encodeURIComponent(active_row.id) : "");
}
function hideInfo(){
	document.getElementById("overlay").style.display = "none";
	document.getElementById("materials-table").style.display = "none";
	window.location.hash = WEAPON_TYPE;
	anchor_weapon = "";
}

function loadData() {
	rows_list = [];
	var id = 1;
	var sorting_header = [];
	for (var name in data) {
		var weapon = data[name];
		var include_0 = 1;
		if (fully_upgraded && weapon["UpgradesTo"] != null) include_0 = 0;
		var include_1 = 0;
		var spec = (weapon["Special"] == null) ? "None" : weapon["Special"];
		for (var i = 0; i < filters[0].length; i++) {
			if (spec.includes(filters[0][i])) include_1++;;
		}
		if (filters[0].length == 0 || include_1 > 0) include_1 = 1;
		else include_1 = 0;

		var include_2 = 1;
		//----------------------------------------------------------------------------------------------------
		//-----WEAPON TYPE------------------------------------------------------------------------------------
		//----------------------------------------------------------------------------------------------------
		switch (WEAPON_TYPE) {
			case "Bow":
				include_2 = Bow_filterShots(weapon);
				break;
			case "GL":
				include_2 = GL_filterShells(weapon);
				break;
			case "HBG":
				include_2 = HBG_filterShots(weapon);
				break;
			case "HH":
				include_2 = HH_filterNotes(weapon);
				break;
			case "LBG":
				include_2 = LBG_filterShots(weapon);
				break;
			case "SA":
				include_2 = SA_filterPhials(weapon);
				break;
		}
		if(include_2 == -1) return;
		var include_3 = 0;
		if(search_filter == "") include_3 = 1;
		else if(search_filter != "" && name.toLowerCase().includes(search_filter.toLowerCase())) include_3 = 1;
		if (!include_0 || !include_1 || !include_2 || !include_3) {
			id++;
			continue;
		}

		(function(weapon) {
			var rarity_colors = ["#f5f5f5", "#b688ff", "#e8d92b", "#ff8098", "#56d85d", "#5f8cff", "#ff4248"];
			var special = (weapon["Special"] == null) ? "-" : weapon["Special"];
			var defense = (weapon["Defense"] == null) ? "-" : "+" + weapon["Defense"];
			var slots = (weapon["Slots"] == 1) ? "O--" : (weapon["Slots"] == 2) ? "OO-" : (weapon["Slots"] == 3) ? "OOO" : "---";
			var unique = "";
			//----------------------------------------------------------------------------------------------------
			//-----WEAPON TYPE------------------------------------------------------------------------------------
			//----------------------------------------------------------------------------------------------------
			switch (WEAPON_TYPE) {
				case "Bow":
					unique = weapon["Arc Shot"];
					break;
				case "GL":
					unique = weapon["Shelling"];
					break;
				case "HH":
					unique = (weapon["Notes"]) ? `<img src="assets/database/notes/note_${weapon["Notes"][0]}.png"><img src="assets/database/notes/note_${weapon["Notes"][1]}.png"><img src="assets/database/notes/note_${weapon["Notes"][2]}.png">` : "---";
					break;
				case "SA":
					unique = weapon["Phial"];
					break;
			}


			var crafting_cost = (weapon["Craft"] && weapon["Craft"]["z"]) ? weapon["Craft"]["z"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "z" : "---";
			var upgrade_cost = (weapon["Upgrade"] && weapon["Upgrade"]["z"]) ? weapon["Upgrade"]["z"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "z" : "---";
			var row = document.createElement("tr");
			row.innerHTML = `
			 <td>${id}</td>
			 <td><div style='color: ${rarity_colors[weapon["Rarity"]-1]}'>${name}</div></td>
			 <td><div style='color: ${rarity_colors[weapon["Rarity"]-1]}'>${weapon["Rarity"]}</div></td>
			 <td>${weapon["Attack"]}<div style="color: #ff9237;">${parseInt(weapon["Attack"]) + 15}</div></td>
			 `;
			 if(WEAPON_TYPE != "LBG" && WEAPON_TYPE != "HBG") row.innerHTML += `<td>${special}</td>`;;
			 row.innerHTML += `
			 <td>${weapon["Affinity"]}%</td>
			 <td>${slots}</td>
			       
		 `;
			if(WEAPON_TYPE != "LBG") row.innerHTML += `<td>${defense}</td>`;
			//----------------------------------------------------------------------------------------------------
			//-----WEAPON TYPE------------------------------------------------------------------------------------
			//----------------------------------------------------------------------------------------------------
			switch (WEAPON_TYPE) {
				case "Bow":
					if(name == "Akantor Wrathmaker"){
						row.innerHTML += `<td style="color: #25ff25">${unique}</td>`;
						break;
					}
				case "GL":
				case "HH":
				case "SA":
					row.innerHTML += `<td>${unique}</td>`;
			}
			var sharp = 0;
			if(WEAPON_TYPE != "LBG" && WEAPON_TYPE != "HBG" && WEAPON_TYPE != "Bow") {
				var modifiers = [1, 10, 100, 1000, 10000, 100000];
				var sharpness_bar_1_exist = (typeof weapon["Sharpness"]["+1"] !== 'undefined');
				document.getElementById("sharpness-header").style.display = "";
				var sharpness = createSharpnessBar(weapon["Sharpness"]["+0"], weapon["Sharpness"]["+1"]);
				row.innerHTML += `<td style="width: 112px">${sharpness}</td>`;
				for (var i = 0; i < (sharpness_bar_1_exist ? weapon["Sharpness"]["+1"] : weapon["Sharpness"]["+0"]).length; i++) {
					sharp += (sharpness_bar_1_exist ? weapon["Sharpness"]["+1"] : weapon["Sharpness"]["+0"])[i] * modifiers[i];
				}
			}
			else document.getElementById("sharpness-header").style.display = "none";
			
			var gun_reload = 0;
			var gun_recoil = 0;
			var gun_drift = 0;
			if(WEAPON_TYPE == "LBG" || WEAPON_TYPE == "HBG"){
				var reload_spds = ["VeryFast", "Fast", "Normal", "Slow"];
				var recoil_amnts = ["Light", "Weak", "Moderate", "Strong", "Strngest"];
				var drift_lvls = ["None", "Sml/Right", "Sml/Left", "Lrg/Right", "Lrg/Left"];

				row.innerHTML += `<td>${weapon["Reload"]}</td>`;
				row.innerHTML += `<td>${weapon["Recoil"]}</td>`;
				row.innerHTML += `<td>${weapon["Drift"]}</td>`;
				gun_reload = reload_spds.indexOf(weapon["Reload"]);
				gun_recoil = recoil_amnts.indexOf(weapon["Recoil"]);
				gun_drift = drift_lvls.indexOf(weapon["Drift"]);
			}
			
			var bow_charges = ["", "", "", ""];
			if(WEAPON_TYPE == "Bow"){
				for(var i = 0; i < 4; i++){
					var charge = (typeof weapon["Charge"][i] == 'undefined') ? "---" : weapon["Charge"][i];
					if(charge[0] == "+"){
						row.innerHTML += `<td style="color: #25ff25" title="Requires Load Up" tabindex="0">${charge.substring(1)}</td>`;
					}
					else row.innerHTML += `<td>${charge}</td>`;
					
					if(charge[0] == "+")
						bow_charges[i] = charge.slice(-1)+charge.substring(1)[0];
					else
						bow_charges[i] = charge.slice(-1)+charge[0];
				}				
			}
			row.innerHTML += `     
			 <td>${crafting_cost}</td>
			 <td>${upgrade_cost}</td>
			`;

			var headers = [
				id,
				name,
				weapon["Rarity"],
				weapon["Attack"],
				(weapon["Special"] == null) ? "" :(special.split(" ")[1]+special[0]),
				weapon["Affinity"],
				slots,
				(weapon["Defense"] == null) ? 0 : weapon["Defense"],
				unique,
				sharp,
				gun_reload,
				gun_recoil,
				gun_drift,
				bow_charges[0],
				bow_charges[1],
				bow_charges[2],
				bow_charges[3],
				(weapon["Craft"] && weapon["Craft"]["z"]) ? weapon["Craft"]["z"] : 0,
				(weapon["Upgrade"] && weapon["Upgrade"]["z"]) ? weapon["Upgrade"]["z"] : 0
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
			row.id = name;
			if (index == -1) {
				row.addEventListener("click", function(event) {
					showMoreInfo(event, data);
				});
				rows_list.push(row);
				weapon_info.appendChild(row);
				sorting_header.push(headers[header_index]);
				weapon_info.firstChild.scrollIntoView({
					behavior: 'smooth',
					block: 'center'
				});
			} else {
				var r = weapon_info.insertRow(index);
				r.id = name;
				r.innerHTML = row.innerHTML;
				r.addEventListener("click", function(event) {
					showMoreInfo(event, data);
				});
				rows_list.push(r);
				sorting_header.splice(index, 0, headers[header_index]);
				weapon_info.firstChild.scrollIntoView({
					behavior: 'smooth',
					block: 'center'
				});
			}
		})(weapon);
		id++;
	}
}

function getHeaders(){
	var headers = [
		document.getElementById("num-header"),
		document.getElementById("name-header"),
		document.getElementById("rarity-header"),
		document.getElementById("attack-header"),
		document.getElementById("elem_sts-header"),
		document.getElementById("affinity-header"),
		document.getElementById("slots-header"),
		document.getElementById("defense-header"),
		document.getElementById("unique-header"),
		document.getElementById("sharpness-header"),
		document.getElementById("gun-reload-header"),
		document.getElementById("gun-recoil-header"),
		document.getElementById("gun-drift-header"),
		document.getElementById("bow-0-header"),
		document.getElementById("bow-1-header"),
		document.getElementById("bow-2-header"),
		document.getElementById("bow-3-header"),
		document.getElementById("crafting-header"),
		document.getElementById("upgrade-header")
	];

	return headers;
}

function sortTable(col){
	active_row = null;
	while(weapon_info.firstChild) weapon_info.removeChild(weapon_info.firstChild);
	var headers = getHeaders();
	
	for(var i = 0; i < headers.length; i++) headers[i].style.backgroundColor = "#202020";

	if(col != null){
		if(col == 0){
			sorting[col] ^= 1;
			for(var i = 0; i < sorting.length; i++) if(i != col && sorting[i] > 0) sorting[col] = 0;
		}
		else if(col == 1 || col == 2 || (col == 8 && !(WEAPON_TYPE == "GL")) || col == 10 || col == 11 || col == 12){
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
	
	loadData();
}

function filterTable(filter){
	active_row = null;
	document.getElementById("weapon_tree").innerHTML = "";
	document.getElementById("crafting_materials").innerHTML = "";
	document.getElementById("upgrade_materials").innerHTML = "";
	

	var filter_headers = ["", "None", "Fire" ,"Water", "Thunder", "Clear", "Ice", "Dragon", "Poison", "Paralyze"];
	var elem_sts_filter_num = 10;
	//----------------------------------------------------------------------------------------------------
     //-----WEAPON TYPE------------------------------------------------------------------------------------
     //----------------------------------------------------------------------------------------------------
	switch(WEAPON_TYPE){
		case "Bow": 
			filter_headers = ["", "None", "Fire" ,"Water", "Thunder", "Clear", "Ice", "Dragon", "Arc Shot", "Coating", "Charge 1", "Charge 2", "Charge 3", "Charge 4"];
			document.getElementById("weapon_table").classList.add("table-view-3row");
			elem_sts_filter_num = 8;
			break;
		case "DB": 
			filter_headers = ["", "None", "Fire" ,"Water", "Thunder", "Clear", "Ice", "Dragon", "Poison"];
			elem_sts_filter_num = 9;
			document.getElementById("weapon_table").classList.add("table-view-2row");
			break;
		case "GL": 
			filter_headers = ["", "None", "Fire" ,"Water", "Thunder", "Clear", "Ice", "Dragon", "Poison", "Paralyze", "Normal", "Long", "Wide"];
			document.getElementById("weapon_table").classList.add("table-view-3row");
			break;
		case "GS": 
			filter_headers = ["", "None", "Fire" ,"Water", "Thunder", "Clear", "Ice", "Dragon", "Poison"];
			elem_sts_filter_num = 9;
			document.getElementById("weapon_table").classList.add("table-view-2row");
			break;
		case "Hammer":
			document.getElementById("weapon_table").classList.add("table-view-2row");
			break;
		case "HBG": 
			filter_headers = ["", "", "Ammo 1", "Ammo 1 Lvl", "Ammo 1 CF", "", "Ammo 2", "Ammo 2 Lvl", "Ammo 2 CF", "", "Ammo 3", "", "Ammo 3 CF", "", "Ammo 4", "", "Ammo 4 CF", "Clear", "Reload", "Recoil", "Drift"];
			elem_sts_filter_num = 0;
			break;
		case "HH": 
			filter_headers = ["", "None", "Fire" ,"Water", "Thunder", "Clear", "Ice", "Dragon", "Poison", "Paralyze", "", "W", "P", "R", "B", "G", "C", "Y", "O", "Effect"];
			break;
		case "Lance": 
			filter_headers = ["", "None", "Fire" ,"Water", "Thunder", "Clear", "Ice", "Dragon", "Poison", "Paralyze", "Sleep"];
			elem_sts_filter_num = 11;
			document.getElementById("weapon_table").classList.add("table-view-3row");
			break;
		case "LBG": 
			filter_headers = ["", "", "Ammo 1", "Ammo 1 Lvl", "Ammo 1 RF", "", "Ammo 2", "Ammo 2 Lvl", "Ammo 2 RF", "", "Ammo 3", "", "Ammo 3 RF", "", "Ammo 4", "", "Ammo 4 RF", "Clear", "Reload", "Recoil", "Drift"];
			elem_sts_filter_num = 0;
			break;
		case "LS":
			document.getElementById("weapon_table").classList.add("table-view-2row");
			break;
		case "SA": 
			filter_headers = ["", "None", "Fire" ,"Water", "Thunder", "Clear", "Ice", "Dragon", "Poison", "Paralyze", "Power Phial", "Elemental Phial", "Exhaust Phial", "Poison Phial", "Paralysis Phial", "Dragon Phial"];
			break;
		case "SnS": 
			filter_headers = ["", "None", "Fire" ,"Water", "Thunder", "Clear", "Ice", "Dragon", "Poison", "Paralyze", "Sleep"];
			elem_sts_filter_num = 11;
			document.getElementById("weapon_table").classList.add("table-view-3row");
			break;
	}
	if(filter == null){
		sortTable();
		return;
	}
	
	if(filter != "Clear" & filter_headers.includes(filter)){
		switch(filter_headers.indexOf(filter) < elem_sts_filter_num){
			case true:
				if(filters[0].includes(filter)){
					var index = filters[0].indexOf(filter);
					if(index != -1) filters[0].splice(index, 1);
				}
				else filters[0].push(filter);
				break;
			case false:
				if(filters[1].includes(filter)){
					var index = filters[1].indexOf(filter);
					if(index != -1) filters[1].splice(index, 1);
				}
				else filters[1].push(filter);
				break;
		}
	}
	if(filter == "Final") fully_upgraded ^= 1;
	if(filter == "Clear"){
		filters[0] = [];
		filters[1] = [];
		fully_upgraded = 0;
		search_filter = "";
		if(document.getElementById("search") != null)
				document.getElementById("search").value = "";
		HH_clearFilters();
		LBG_clearFilters();
		HBG_clearFilters();
		Bow_clearFilters();	
	}
	var filter_elements = document.getElementById("filters").getElementsByTagName("td");
	for(var i = 0; i < filter_elements.length; i++){
		var found_0 = filters[0].indexOf(filter_headers[i]);
		var found_1 = filters[1].indexOf(filter_headers[i]);
		if(found_0 != -1 || found_1 != -1) filter_elements[i].classList.add("active-filter");
		else filter_elements[i].classList.remove("active-filter");
	}
	if(fully_upgraded) filter_elements[0].classList.add("active-filter");
	else filter_elements[0].classList.remove("active-filter");
	sortTable();
}

function toggleFilters(){
	var filters = document.getElementById("filters");
	if(filters.style.display != "none"){
		filters.style.display = "none";
		document.getElementById("filter_toggle").innerHTML = `
			Filters <i class="fa fa-angle-down">
		`;
		document.getElementById("weapon_table").classList.remove("table-view-2row");
		document.getElementById("weapon_table").classList.remove("table-view-3row");
		document.getElementById("weapon_table").classList.add("table-view-full");
	}
	else{
		filters.style.display = "";
		document.getElementById("filter_toggle").innerHTML = `
			Filters <i class="fa fa-angle-up">
		`;
		document.getElementById("weapon_table").classList.remove("table-view-full");
		filterTable();
	}
}

function search(){
	search_filter = document.getElementById("search").value;
	filterTable();
}

function addSearch(){
	var filters = document.getElementById("filters-table");
	var filter_row = filters.insertRow();
	filter_row.classList.add("search-row");
	filter_row.innerHTML = `
		<td colspan="4"><i class="fa fa-search"> <input type="text" id="search" class="search-bar" oninput="search()"></input>	
	`;
	filter_row.id = "search_row";
}

function main(){
	
	sorting = Array(getHeaders().length).fill(0);
	fully_upgraded = 0;
	rows_list = [];
	active_row = null;
	search_filter = "";
	if(document.getElementById("search") != null)
		document.getElementById("search").value = "";
	//----------------------------------------------------------------------------------------------------
	//-----WEAPON TYPE------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------------------------
	switch(WEAPON_TYPE){
		case "Bow":
			Bow_init();
			break;
		case "DB":
			DB_init();
			break;
		case "GL":
			GL_init();
			break;
		case "GS":
			GS_init();
			break;
		case "Hammer":
			Hammer_init();
			break;
		case "HBG":
			HBG_init();
			break;
		case "HH":
			HH_init();
			break;	
		case "Lance":
			Lance_init();
			break;
		case "LBG":
			LBG_init();
			break;
		case "LS":
			LS_init();
			break;
		case "SA":
			SA_init();
			break;
		case "SnS":
			SnS_init();
			break;
	}
	addSearch();
	filterTable();
	if(document.getElementById("filters").style.display == "none"){
		document.getElementById("weapon_table").classList.remove("table-view-2row");
		document.getElementById("weapon_table").classList.remove("table-view-3row");
		document.getElementById("weapon_table").classList.add("table-view-full");
	}
	
	var selection = document.getElementById("selection").getElementsByTagName("td");
	for(var i = 0; i < selection.length; i++){
		if(selection_list[i] == WEAPON_TYPE) selection[i].classList.add("active-filter");
		else selection[i].classList.remove("active-filter");
	}
	window.location.hash = WEAPON_TYPE;
}

function hash(){
	var a = document.createElement("a");
	a.style.display = "none";
	a.id = anchor_weapon;
	function handleClick(event) {
		a.removeEventListener("click", handleClick);
		a.remove();
		showMoreInfo(event);
	}
	a.addEventListener("click", handleClick);
	document.body.appendChild(a);
	a.click();
}

function init(){
	var anchor = window.location.hash.substring(1).split("&w=");
	if(anchor[1] != null) anchor_weapon = decodeURIComponent(anchor[1]);
	if(selection_list.includes(anchor[0])) changeWeapon(anchor[0]);
	else changeWeapon("GS");
}
init();
hash();

window.addEventListener(
  "hashchange",
  () => {
    if(window.location.hash.substring(1).split("&w=")[1] != null){
	    if(window.location.hash.substring(1).split("&w=")[0] != WEAPON_TYPE) init();
	    hash();
    }
  },
  false,
);