var WEAPON_TYPE = "GS";
var data = null;
var sorting = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
var filters = [[], []];
var fully_upgraded = 0;
var weapon_info = document.getElementById("weapon_info");
var materials_info = document.getElementById("materials_info");
var rows_list = [];
var active_row = null;

function changeWeapon(type){
	filterTable("Clear");
	//----------------------------------------------------------------------------------------------------
	//-----WEAPON TYPE------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------------------------
	switch(WEAPON_TYPE){
		case "DB":
			DB_terminate();
			break;
		case "GL":
			GL_terminate();
			break;
		case "GS":
			GS_terminate();
			break;
		case "HH":
			HH_terminate();
			break;
		case "Lance":
			Lance_terminate();
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
	init();
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

function getWeaponTree(currentName, tree = []){
	tree.push(currentName);
	for(var name in data){
		var weapon = data[name];
		if(weapon["UpgradesTo"] != null && weapon["UpgradesTo"].includes(currentName)){
			getWeaponTree(name, tree);
			break;
		}
	}
	return tree;
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

function showMoreInfo(event){
    var id = event.currentTarget.id;
    for(var i = 0; i < rows_list.length; i++) if(rows_list[i].id == id) active_row = rows_list[i];
    var rows = weapon_info.getElementsByTagName("tr");
    for(var i = 0; i < rows.length; i++) {
        rows[i].classList.remove("active-row");
    }
    active_row.classList.add("active-row");
    active_row.scrollIntoView({block: "center", behavior: "smooth"});
    var weapon = data[active_row.id];
    var crafting_materials = weapon["Craft"];
    var upgrade_materials = weapon["Upgrade"];
    
    var table = `<div class="mat-box"><table><thead><tr><th></th><th>Material</th><th>Qty</th></tr></thead><tbody>`;
    var table_0 = document.createElement("table");
    var table_1 = table;
    var table_2 = table;
    
    for(var material in crafting_materials){
	  if(material != "z"){
		  var sprite = getSprite(material);
		  table_1 += `
			<tr>
				<td>${sprite}</td>
				<td style="text-align: left;">${material}</td>
				<td>${crafting_materials[material]}</td>
			</tr>
		 `; 
	  }		  
    } 
    for(var material in upgrade_materials){
	    if(material != "z"){
		  var sprite = getSprite(material);
		  table_2 += `
			<tr>
				<td>${sprite}</td>
				<td style="text-align: left;">${material}</td>
				<td>${upgrade_materials[material]}</td>
			</tr>
		 `; 
	  }		
    } 
    
    var tree = getWeaponTree(active_row.id).reverse();
    var weapon_tree = document.getElementById("weapon_tree");
    while(weapon_tree.firstChild) weapon_tree.removeChild(weapon_tree.firstChild);
    for(var i = 0; i < tree.length; i++){	
	    var row_0 = table_0.insertRow();
	    row_0.id = tree[i];
	    row_0.addEventListener("click", function (event) {
			showMoreInfo(event, data);
	    });
	    if(tree[i] == active_row.id) row_0.classList.add("active-row");
	    else row_0.classList.remove("active-row");
	    var cell_0 = row_0.insertCell();
	    cell_0.innerHTML = "";
	    if(data[tree[i]]["Craft"]){
		    cell_0.innerHTML += `<span style="float: right">Craftable</span>`;
	    }
	    else{
			cell_0.innerHTML += `<span style="float: right">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
			</span>`;
	    }
	    
	    cell_0.innerHTML += `<span style="float: left">${(i+1)}</span><span style="display: inline-block; text-align: left; width: 150px;">${tree[i]}</span>`;
	    
    }
    table_1 += "</tbody></table></div>";
    table_2 += "</tbody></table></div>";
    
    weapon_tree.appendChild(table_0);
    weaponPreview();
    document.getElementById("materials-table").style.display = "";
    document.getElementById("overlay").style.display = "block";
    document.getElementById("crafting_materials").innerHTML = table_1;
    document.getElementById("upgrade_materials").innerHTML = table_2;
    //----------------------------------------------------------------------------------------------------
    //-----WEAPON TYPE------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------
    switch(WEAPON_TYPE){
		case "HH":
			HH_showMoreInfo(event);
			break;
    }

    document.getElementById("weapon_tree").scrollIntoView({behavior: "smooth"});
}

function hideInfo(){
	document.getElementById("overlay").style.display = "none";
	document.getElementById("materials-table").style.display = "none";
}

function loadData() {
	rows_list = [];
	var id = 1;
	var sorting_header = [];
	for(var name in data){
		var weapon = data[name];
		var include_0 = 1;
		if(fully_upgraded && weapon["UpgradesTo"] != null) include_0 = 0;
		var include_1 = 0;
		var spec = (weapon["Special"] == null) ? "None" : weapon["Special"];
		for(var i = 0; i < filters[0].length; i++){
			if(spec.includes(filters[0][i])) include_1++;;
		}
		if(filters[0].length == 0 || include_1 > 0) include_1 = 1;
		else include_1 = 0;
		
		var include_2 = 1;
		//----------------------------------------------------------------------------------------------------
		//-----WEAPON TYPE------------------------------------------------------------------------------------
		//----------------------------------------------------------------------------------------------------
		switch(WEAPON_TYPE){
			case "GL":
				include_2 = GL_filterShells(weapon);
				break;
			case "HH":
				include_2 = HH_filterNotes(weapon);
				break;
			case "SA":
				include_2 = SA_filterPhials(weapon);
				break;
		}
		
		if(!include_0 || !include_1 || !include_2){
			id++;
			continue;
		}
	   
        (function (weapon) {
		  var rarity_colors = ["#f5f5f5", "#b688ff", "#e8d92b", "#ff8098", "#56d85d", "#5f8cff", "#ff4248"];
            var special = (weapon["Special"] == null) ? "-" : weapon["Special"];
            var defense = (weapon["Defense"] == null) ? "-" : "+" + weapon["Defense"];
            var slots = (weapon["Slots"] == 1) ? "O--" : (weapon["Slots"] == 2) ? "OO-" : (weapon["Slots"] == 3) ? "OOO" : "---";
		  var unique = "";
		  //----------------------------------------------------------------------------------------------------
		  //-----WEAPON TYPE------------------------------------------------------------------------------------
		  //----------------------------------------------------------------------------------------------------
		  switch(WEAPON_TYPE){
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
            
            var sharpness = createSharpnessBar(weapon["Sharpness"]["+0"], weapon["Sharpness"]["+1"]);
            var crafting_cost = (weapon["Craft"] && weapon["Craft"]["z"]) ? weapon["Craft"]["z"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "z" : "---";
            var upgrade_cost = (weapon["Upgrade"] && weapon["Upgrade"]["z"]) ? weapon["Upgrade"]["z"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "z" : "---";
            var row = document.createElement("tr");
            row.innerHTML = `
			 <td>${id}</td>
                <td><div style='color: ${rarity_colors[weapon["Rarity"]-1]}'>${name}</div></td>
                <td><div style='color: ${rarity_colors[weapon["Rarity"]-1]}'>${weapon["Rarity"]}</div></td>
                <td>${weapon["Attack"]}<div style="color: #42e6ee;">(${parseInt(weapon["Attack"]) + 15})</div></td>
                <td>${special}</td>
                <td>${weapon["Affinity"]}%</td>
			 <td>${slots}</td>
                <td>${defense}</td>       
		 `;
		 //----------------------------------------------------------------------------------------------------
		 //-----WEAPON TYPE------------------------------------------------------------------------------------
		 //----------------------------------------------------------------------------------------------------
		 switch(WEAPON_TYPE){
			 case "GL":
			 case "HH":
			 case "SA":
				row.innerHTML += `<td>${unique}</td>`;
		 }
            row.innerHTML += `    
                <td style="width: 112px">${sharpness}</td>
                <td>${crafting_cost}</td>
                <td>${upgrade_cost}</td>
            `;
		  var sharp = 0;
		  var modifiers = [1, 10, 100, 1000, 10000, 100000];
		  var sharpness_bar_1_exist = (typeof weapon["Sharpness"]["+1"] !== 'undefined');
		  for(var i = 0; i < (sharpness_bar_1_exist ? weapon["Sharpness"]["+1"] : weapon["Sharpness"]["+0"]).length; i++){
			sharp += (sharpness_bar_1_exist ? weapon["Sharpness"]["+1"] : weapon["Sharpness"]["+0"])[i] * modifiers[i];
		  }

		  var headers = [
			id, 
			name, 
			weapon["Rarity"], 
			weapon["Attack"], 
			(weapon["Special"] == null) ? 0 : parseInt(special.split(" ")[1]), 
			weapon["Affinity"],  
			slots, 
			(weapon["Defense"] == null) ? 0 : weapon["Defense"],
			unique, 
			sharp, 
			(weapon["Craft"] && weapon["Craft"]["z"]) ? weapon["Craft"]["z"] : 0, 
			(weapon["Upgrade"] && weapon["Upgrade"]["z"]) ? weapon["Upgrade"]["z"] : 0
		  ];
		  var sort_type = 0;
		  var header_index = 0;
		  for(var i = 0; i < sorting.length; i++){
			if(sorting[i] > 0){
				header_index = i;
				sort_type = sorting[i];
			}
		  }
		  var index = -1;
		  for(var i = 0; i < sorting_header.length; i++){
                if((sort_type == 1 && headers[header_index] > sorting_header[i]) || (sort_type == 2 && headers[header_index] < sorting_header[i])){
                    index = i;
                    break;
                }
            }
		  row.id = name;
		  if(index == -1){
			row.addEventListener("click", function (event) {
				showMoreInfo(event, data);
			});
			rows_list.push(row);
			weapon_info.appendChild(row);
			sorting_header.push(headers[header_index]);
			weapon_info.firstChild.scrollIntoView({
			    behavior: 'smooth',
			    block: 'center'
			});
		  }
		  else{
			var r = weapon_info.insertRow(index);
			r.id = name;
			r.innerHTML = row.innerHTML;
			r.addEventListener("click", function (event) {
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

function sortTable(col){
	active_row = null;
	while(weapon_info.firstChild) weapon_info.removeChild(weapon_info.firstChild);
	var headers = document.getElementById("data-table").getElementsByTagName("th");
	for(var i = 0; i < headers.length; i++) headers[i].style.backgroundColor = "#202020";
	if(col != null){
		var unique_sort = (WEAPON_TYPE == "GL");
		if(col == 0){
			sorting[col] ^= 1;
			for(var i = 0; i < sorting.length; i++) if(i != col && sorting[i] > 0) sorting[col] = 0;
		}
		else if(col == 1 || col == 2 || (col == 8 && !unique_sort)){
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
		case "HH": 
			filter_headers = ["", "None", "Fire" ,"Water", "Thunder", "Clear", "Ice", "Dragon", "Poison", "Paralyze", "W", "P", "R", "B", "G", "C", "Y", "O"];
			break;
		case "Lance": 
			filter_headers = ["", "None", "Fire" ,"Water", "Thunder", "Clear", "Ice", "Dragon", "Poison", "Paralyze", "Sleep"];
			elem_sts_filter_num = 11;
			document.getElementById("weapon_table").classList.add("table-view-3row");
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

function init(){
	var selection_list = ["GS", "LS", "SnS", "DB", "Hammer", "HH", "Lance", "GL", "SA"];
	sorting = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
	fully_upgraded = 0;
	rows_list = [];
	active_row = null;
	//----------------------------------------------------------------------------------------------------
	//-----WEAPON TYPE------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------------------------
	switch(WEAPON_TYPE){
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
		case "HH":
			HH_init();
			break;	
		case "Lance":
			Lance_init();
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
	filterTable();
	
	var selection = document.getElementById("selection").getElementsByTagName("td");
	for(var i = 0; i < selection.length; i++){
		if(selection_list[i] == WEAPON_TYPE) selection[i].classList.add("active-filter");
		else selection[i].classList.remove("active-filter");
	}
	window.location.hash = WEAPON_TYPE;
}

displayNavmenu("database");
//----------------------------------------------------------------------------------------------------
//-----WEAPON TYPE------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
switch(window.location.hash.substring(1)){
	case "DB":
		changeWeapon("DB");
		break;
	case "GL":
		changeWeapon("GL");
		break;
	case "GS":
		changeWeapon("GS");
		break;
	case "Hammer":
		changeWeapon("Hammer");
		break;
	case "HH":
		changeWeapon("HH");
		break;
	case "Lance":
		changeWeapon("Lance");
		break;
	case "LS":
		changeWeapon("LS");
		break;
	case "SA":
		changeWeapon("SA");
		break;
	case "SnS":
		changeWeapon("SnS");
		break;
	default:
		changeWeapon("GS");
}
