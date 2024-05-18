var ammo_types = [
	["Normal S", "Pierce S", "Pellet S", "Crag S", "Clust S"], 
	["Recov S", "Poison S", "Para S", "Sleep S", "Exhaust S"],
	["Flaming S", "Water S", "Thunder S", "Freeze S", "Dragon S"],
	["Tranq S", "Paint S", "Demon S", "Armor S", "Slicing S"]
];

function LBG_showMoreInfo(event){
	var weapon = data[active_row.id];
	var ammo = weapon["Ammo"];
	var table = `<div class="mat-box"><table style="border: none; border-top: 1px solid #c0c0c0" class="ammo-table">`;
	table += `
		<tr>
			<th style="width: 4%;"></th>
			<th style="color: #2c86ff; text-align: left; width: 33.5%; padding-right: 2px">Load</th>
			<th style="color: #2c86ff; width: 5%; padding-right: 2px">Lv1</th>
			<th style="color: #2c86ff; width: 5%; padding-right: 2px">Lv2</th>
			<th style="color: #2c86ff; width: 5%; padding-right: 2px">Lv3</th>

			<th style="width: 4%;"></th>
			<th style="width: 33.5%;"></th>
			<th style="color: #2c86ff; width: 5%; padding-right: 2px">Lv1</th>
			<th style="color: #2c86ff; width: 5%; padding-right: 4px">Lv2</th>
		</tr>`;
	for(var i = 0; i < 5; i++){
		table += `<tr>`;
		for(var j = 0; j < 2; j++){
			table += `
				<td>${getSprite(ammo_types[j][i])}</td>
				<td style="text-align: left" class="mat-name">${ammo_types[j][i]}</td>
			`;
			var shot = ammo[ammo_types[j][i]];
			if(typeof shot != "undefined"){
				if(shot[0] > 0) table += `<td class="mat-name">${shot[0]}</td>`;
				else table += `<td style="color: #616161" class="mat-name">${shot[0]}</td>`;
				
				if(shot[1] > 0) table += `<td class="mat-name">${shot[1]}</td>`;
				else table += `<td style="color: #616161" class="mat-name">${shot[1]}</td>`;
				
				if(j == 0){
					if(shot[2] > 0) table += `<td class="mat-name">${shot[2]}</td>`;
					else table += `
						<td style="color: #616161" class="mat-name">${shot[2]}</td>
					`;
				}
			}
			else{
				table += `
				<td style="color: #616161" class="mat-name">0</td>
				<td style="color: #616161" class="mat-name">0</td>
				`;
				if(j == 0)
					table += `<td style="color: #616161" class="mat-name">0</td>`;
			}
		}
		table += `</tr>`;
	}
	
	//-----------------------------------------------------------------------------------
	table += `
		<tr>
			<th></th>
			<th style="color: #2c86ff; text-align: left; padding-right: 2px">Load</th>
			<th style="padding-right: 2px"></th>
			<th style="padding-right: 2px"></th>
			<th style="padding-right: 2px"></th>

			<th></th>
			<th></th>
			<th style="padding-right: 2px"></th>
			<th style="padding-right: 4px"></th>
		</tr>`;
	for(var i = 0; i < 5; i++){
		table += `<tr>`;
		for(var j = 2; j < 4; j++){
			table += `<td>${getSprite(ammo_types[j][i])}</td>`;
			if(j == 2)
				table += `<td colspan=3 style="text-align: left" class="mat-name">${ammo_types[j][i]}</td>`;
			else
				table += `<td colspan=2 style="text-align: left" class="mat-name">${ammo_types[j][i]}</td>`;	
			shot = ammo[ammo_types[j][i]];
			if(typeof shot != "undefined"){
				
				if(shot > 0) table += `<td class="mat-name">${shot}</td>`;
				else table += `<td style="color: #616161" class="mat-name">${shot}</td>`;
			}
			else{
				table += `<td style="color: #616161" class="mat-name">0</td>`;
			}
		}
		table += `</tr>`;
	}
	
	var rf = weapon["Rapid Fire"];
	table += `
		<th></th>
		<th style="color: #2c86ff; text-align: left; padding-right: 2px">Rapid Fire</th>
		<th style="padding-right: 2px"></th>
		<th colspan=3 style="color: #2c86ff; padding-right: 2px">Rounds</th>
		<th colspan=3 style="color: #2c86ff;">Recoil</th>
	`;
	
	if(typeof rf != "undefined"){
		for(var i = 0; i < rf.length; i++){
			var icon = rf[i][0].split(" ")[0] + " " + rf[i][0].split(" ")[1];
			table += `
				<tr>
					<td class="mat-name">${getSprite(icon)}</td>
					<td colspan=3 class="mat-name" style="text-align: left">${rf[i][0]}</td>
					<td class="mat-name">${rf[i][1]}</td>
					<td style="border-right: none"></td>
					<td colspan=3 style="border-left: none" class="mat-name">${rf[i][2]}</td>
				</tr>
			`;
		}
	}
	else table += `<tr><td colspan=9 class="mat-name">None</td></tr>`;
	
	table += "</table></div>";
	document.getElementById("lbg_ammo").innerHTML = table;
}

function LBG_filterShots(weapon){
	var include = Array(13).fill(1);
	for(var i = 0; i < filters[1].length; i++){
		if(filters[1][i].split(" ").length == 2 && filters[1][i].split(" ")[0] == "Ammo"){
			var index = parseInt(filters[1][i].split(" ")[1]) - 1;
			var ammo = [];
			for(var key in weapon["Ammo"]) ammo.push(key);
			if(!ammo.includes(ammo_filters[index])) include[index] = 0;
		}
		else if(filters[1][i].split(" ").length == 3 && filters[1][i].split(" ")[0] == "Ammo" && filters[1][i].split(" ")[2] == "Lvl"){
			var index = parseInt(filters[1][i].split(" ")[1]) - 1;
			var ammo_type_filter = "Ammo " + (index+1);
			if(filters[1].includes(ammo_type_filter)){
				var lvl = weapon["Ammo"][ammo_filters[index]];
				if(!((typeof lvl !== "undefined") && lvl[ammo_lvl_filters[index]] > 0)) include[index+4] = 0;
			}
			else{
				filterTable(filters[1][i]);
				return -1;
			}
		}
		else if(filters[1][i].split(" ").length == 3 && filters[1][i].split(" ")[0] == "Ammo" && filters[1][i].split(" ")[2] == "RF"){
			var index = parseInt(filters[1][i].split(" ")[1]) - 1;
			var ammo_type_filter = "Ammo " + (index+1);
			if(filters[1].includes(ammo_type_filter)){
				var rf_ammo = [];
				var rf = weapon["Rapid Fire"];
				var flag = 0;
				if(typeof rf !== "undefined"){
					if(filters[1].includes(ammo_type_filter + " Lvl")){
						for(var e of rf) rf_ammo.push(e[0]);
						var shot = ammo_filters[index] + " Lv" + (ammo_lvl_filters[index]+1);
						if(rf_ammo.includes(shot)) flag = 1;
					}
					else{
						for(var e of rf) rf_ammo.push(e[0].split(" ")[0] + " S");
						var shot = ammo_filters[index];
						if(rf_ammo.includes(shot)) flag = 1;
					}
				}
				
				
				if(!((typeof rf !== "undefined") && flag)) include[index+6] = 0;
			}
			else{
				filterTable(filters[1][i]);
				return -1;
			}
		}
		else if(filters[1][i] == "Reload"){
			if(!(weapon["Reload"] == gun_param_filters[0])) include[10] = 0;
		}
		else if(filters[1][i] == "Recoil"){
			if(!(weapon["Recoil"] == gun_param_filters[1])) include[11] = 0;
		}
		else if(filters[1][i] == "Drift"){
			if(!(weapon["Drift"] == gun_param_filters[2])) include[12] = 0;
		}
	}
	return include.every(x => x);
}

var ammo_filters = ["Normal S", "Recov S", "Flaming S", "Tranq S"];
var ammo_lvl_filters = [0, 0];
var gun_param_filters = ["VeryFast", "Light", "None"];

function LBG_setFilter(filter, id){
	var gun_params = [
		["VeryFast", "Fast", "Normal", "Slow"],
		["Light", "Weak", "Moderate", "Strong", "Strngest"],
		["None", "Sml/Left", "Sml/Right", "Lrg/Left", "Lrg/Right"]
	];
		
	if(filter.split(" ").length == 2 && filter.split(" ")[0] == "Ammo"){
		var index = parseInt(filter.split(" ")[1]) - 1;
		ammo_filters[index] = ammo_types[index][id];
	}
	else if(filter.split(" ").length == 3 && filter.split(" ")[0] == "Ammo" && filter.split(" ")[2] == "Lvl"){
		var index = parseInt(filter.split(" ")[1]) - 1;
		ammo_lvl_filters[index] = id;
	}
	else if(filter == "Reload") gun_param_filters[0] = gun_params[0][id];
	else if(filter == "Recoil") gun_param_filters[1] = gun_params[1][id];
	else if(filter == "Drift") gun_param_filters[2] = gun_params[2][id];
	filterTable();
}

var LBG_headers = [null, null, null];
function LBG_init(){
	data = LBG_data;
	var header = document.getElementById("unique-header");
	header.innerHTML = "";
	header.style.display = "none";
	document.getElementById("elem_sts-header").style.display = "none";
	document.getElementById("defense-header").style.display = "none";
	
	LBG_headers[0] = document.getElementById("gun-reload-header");
	LBG_headers[0].innerHTML = `Reload <i class="fa fa-fw fa-sort"></i>`;
	LBG_headers[0].style.display = "";
	
	LBG_headers[1] = document.getElementById("gun-recoil-header");
	LBG_headers[1].innerHTML = `Recoil <i class="fa fa-fw fa-sort"></i>`;
	LBG_headers[1].style.display = "";
	
	LBG_headers[2] = document.getElementById("gun-drift-header");
	LBG_headers[2].innerHTML = `Drift <i class="fa fa-fw fa-sort"></i>`;
	LBG_headers[2].style.display = "";
	
	document.getElementById("filters").innerHTML = `
		<tr>
			<td rowspan="5" onClick="filterTable('Final')" style="color: #c0c0c0; font-size: 12px;">Final</br>Form</td>

			<td style="background-color: transparent; font-size: 12px; width: auto; cursor: default; padding: 0 0;">
				<table class="filters-table" style="table-layout: unset; border: 1px dotted #707070">
					<tr><td onClick="filterTable('Ammo 1')" style="border: none; color: #c0c0c0; font-size: 10px; width: auto;">
						<label>Ammo 1:</label><br>
						<select id="ammo_1_dropdown" class="charge-dropdown" onclick="event.stopPropagation();" onchange="LBG_setFilter('Ammo 1', this.selectedIndex)">
							<option>Normal S</option>
							<option>Pierce S</option>
							<option>Pellet S</option>
							<option>Crag S</option>
							<option>Clust S</option>
						</select>
					</td></tr>
					
					<tr><td onClick="filterTable('Ammo 1 Lvl')" style="border: none; color: #c0c0c0; font-size: 10px; width: auto;">
						<label>Lv:</label><br>
						<select id="ammo_1_lvl_dropdown" class="charge-dropdown" onclick="event.stopPropagation();" onchange="LBG_setFilter('Ammo 1 Lvl', this.selectedIndex)">
							<option>Lv1</option>
							<option>Lv2</option>
							<option>Lv3</option>
						</select>
					</td></tr>
					
					<tr><td onClick="filterTable('Ammo 1 RF')" style="border: none; color: #c0c0c0; font-size: 10px;  width: auto;">Rapid<br>Fire</td></tr>
				</table>
			</td>
			
			<td style="background-color: transparent; font-size: 12px; width: auto; cursor: default; padding: 0 0;">
				<table class="filters-table" style="table-layout: unset; border: 1px dotted #707070">
				<tr><td onClick="filterTable('Ammo 2')" style="border: none; color: #c0c0c0; font-size: 10px; width: auto;">
					<label>Ammo 2:</label><br>
					<select id="ammo_2_dropdown" class="charge-dropdown" onclick="event.stopPropagation();" onchange="LBG_setFilter('Ammo 2', this.selectedIndex)">
						<option>Recov S</option>
						<option>Poison S</option>
						<option>Para S</option>
						<option>Sleep S</option>
						<option>Exhaust S</option>
					</select>
				</td></tr>
				
				<tr><td onClick="filterTable('Ammo 2 Lvl')" style="border: none; color: #c0c0c0; font-size: 10px; width: auto;">
					<label>Lv:</label><br>
					<select id="ammo_2_lvl_dropdown" class="charge-dropdown" onclick="event.stopPropagation();" onchange="LBG_setFilter('Ammo 2 Lvl', this.selectedIndex)">
						<option>Lv1</option>
						<option>Lv2</option>
					</select>
				</td></tr>
				
				<tr><td onClick="filterTable('Ammo 2 RF')" style="border: none; color: #c0c0c0; font-size: 10px; width: auto;">Rapid<br>Fire</td></tr>
				</table>
			</td>
			
			<td style="background-color: transparent; font-size: 12px; width: auto; cursor: default; padding: 0 0;">
				<table class="filters-table" style="table-layout: unset; border: 1px dotted #707070">
					<tr><td onClick="filterTable('Ammo 3')" style="border: none; color: #c0c0c0; font-size: 10px; width: auto;">
						<label>Ammo 3:</label><br>
						<select id="ammo_3_dropdown" class="charge-dropdown" onclick="event.stopPropagation();" onchange="LBG_setFilter('Ammo 3', this.selectedIndex)">
							<option>Flaming S</option>
							<option>Water S</option>
							<option>Thunder S</option>
							<option>Freeze S</option>
							<option>Dragon S</option>
						</select>
					</td></tr>
					
					<tr><td style="border: none; cursor: default; background-color: transparent;"></td></tr>
					
					<tr><td onClick="filterTable('Ammo 3 RF')" style="border: none; color: #c0c0c0; font-size: 10px; width: auto;">Rapid<br>Fire</td></tr>
				</table>
			</td>
			
			<td style="background-color: transparent; font-size: 12px; width: auto; cursor: default; padding: 0 0;">
				<table class="filters-table" style="table-layout: unset; border: 1px dotted #707070">
					<tr><td onClick="filterTable('Ammo 4')" style="border: none; color: #c0c0c0; font-size: 10px; width: auto;">
						<label>Ammo 4:</label><br>
						<select id="ammo_4_dropdown" class="charge-dropdown" onclick="event.stopPropagation();" onchange="LBG_setFilter('Ammo 4', this.selectedIndex)">
							<option>Tranq S</option>
							<option>Paint S</option>
							<option>Demon S</option>
							<option>Armor S</option>
							<option>Slicing S</option>
						</select>
					</td></tr>
			
					<tr><td style="border: none; cursor: default; background-color: transparent;"></td></tr>
					
					<tr><td onClick="filterTable('Ammo 4 RF')" style="border: none; color: #c0c0c0; font-size: 10px; width: auto;">Rapid<br>Fire</td>	
				</table>
				<td rowspan="5" onClick="filterTable('Clear')" style="color: #c0c0c0; font-size: 12px;">Clear</td>
			</td>

			
		</tr><tr>
			<td onClick="filterTable('Reload')" style="color: #c0c0c0; font-size: 10px; width: auto;">
				<label>Reload:</label><br>
				<select id="reload_dropdown" class="charge-dropdown" onclick="event.stopPropagation();" onchange="LBG_setFilter('Reload', this.selectedIndex)">
					<option>VeryFast</option>
					<option>Fast</option>
					<option>Normal</option>
					<option>Slow</option>
				</select>
			</td>
			<td onClick="filterTable('Recoil')" style="color: #c0c0c0; font-size: 10px; width: auto;">
				<label>Recoil:</label><br>
				<select id="recoil_dropdown" class="charge-dropdown" onclick="event.stopPropagation();" onchange="LBG_setFilter('Recoil', this.selectedIndex)">
					<option>Light</option>
					<option>Weak</option>
					<option>Moderate</option>
					<option>Strong</option>
					<option>Strngest</option>				
				</select>
			</td>
			<td onClick="filterTable('Drift')" style="color: #c0c0c0; font-size: 10px; width: auto;">
				<label>Drift:</label><br>
				<select id="drift_dropdown" class="charge-dropdown" onclick="event.stopPropagation();" onchange="LBG_setFilter('Drift', this.selectedIndex)">
					<option>None</option>
					<option>Sml/Left</option>
					<option>Sml/Right</option>
					<option>Lrg/Left</option>
					<option>lrg/Right</option>
					
					
				</select>
			</td>
		</tr>
	`;
	
	var table = document.getElementById("materials_info");
	var row_0 = table.insertRow();
	row_0.id = "lbg_ammo_header";
	row_0.innerHTML = `
		<th colspan="2">Ammo</th>
	`;
	var row_1 = table.insertRow();
	row_1.id = "lbg_ammo_body";
	var cell_1 = row_1.insertCell();
	cell_1.colSpan="2";
	cell_1.id = "lbg_ammo";
	cell_1.style.width = "100%";
}

function LBG_terminate(){	
	document.getElementById("elem_sts-header").style.display = "";
	document.getElementById("defense-header").style.display = "";
	for(var i = 0; i < 3; i++){
		LBG_headers[i].style.display = "none";
	}
	
	document.getElementById("filters").innerHTML = `
		<tr>
			<td rowspan="5" onClick="filterTable('Final')" style="color: #c0c0c0; font-size: 12px;">Final</br>Form</td>
			
			<td id="none_filter" onClick="filterTable('None')" style="color: #c0c0c0; font-size: 12px; width: auto;">None</td>
			<td id="fire_filter" onClick="filterTable('Fire')" style="color: #c0c0c0; font-size: 12px; width: auto;">Fire</td>
			<td id="water_filter" onClick="filterTable('Water')" style="color: #c0c0c0; font-size: 12px; width: auto;">Water</td>
			<td id="thunder_filter" onClick="filterTable('Thunder')" style="color: #c0c0c0; font-size: 12px; width: auto;">Thunder</td>
			
			<td rowspan="5" onClick="filterTable('Clear')" style="color: #c0c0c0; font-size: 12px;">Clear</td>
			
		</tr><tr>
			<td id="ice_filter" onClick="filterTable('Ice')" style="color: #c0c0c0; font-size: 12px; width: auto;">Ice</td>
			<td id="dragon_filter" onClick="filterTable('Dragon')" style="color: #c0c0c0; font-size: 12px; width: auto;">Dragon</td>
			<td id="poison_filter" onClick="filterTable('Poison')" style="color: #c0c0c0; font-size: 12px; width: auto;">Poison</td>
			<td id="para_filter" onClick="filterTable('Paralyze')" style="color: #c0c0c0; font-size: 12px; width: auto;">Paralyze</td>
		</tr>
	`;
	var ammo_table = document.getElementById("lbg_ammo_header");
	ammo_table.parentNode.removeChild(ammo_table);
	ammo_table = document.getElementById("lbg_ammo_body");
	ammo_table.parentNode.removeChild(ammo_table);
}