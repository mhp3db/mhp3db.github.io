function Bow_showMoreInfo(event){
	var weapon = data[active_row.id];
	var coatings = weapon["Coatings"];
	var table = `<div class="mat-box"><table style="border: none">`;
	const coating_list  = ["Power Coating", "C.Range Coating", "Poison Coating", "Paint Coating", "Para Coating", "Exhaust Coating", "Sleep Coating"];
	for(var i = 0; i < coating_list.length; i++){
		if(i % 2 == 0){
			table += `<tr>`;
			if(coatings.includes(coating_list[i])){
				table += `
					<td style="width: auto">
						${getSprite(coating_list[i])}
					</td>
					<td style="width: auto; text-align: left" class="mat-name">
						${coating_list[i]}
					</td>
				`;
			}
			else if(coatings.includes("+"+coating_list[i])){
				table += `
					<td style="width: auto">
						${getSprite(coating_list[i])}
					</td>
					<td style="width: auto; text-align: left; color: #25ff25" class="mat-name">
						${coating_list[i]}+
					</td>
				`;
			}
			else{
				table += `
					<td style="width: auto">
						${getSprite("No Coating")}
					</td>
					<td style="width: auto; text-align: left; opacity: 0.25;" class="mat-name">
						${coating_list[i]}
					</td>
				`;
			}
			if(i != 6){
				if(coatings.includes(coating_list[i+1])){
					table += `
						<td style="width: auto">
							${getSprite(coating_list[i+1])}
						</td>
						<td style="width: auto; text-align: left;" class="mat-name">
							${coating_list[i+1]}
						</td>
					`;
				}
				else if(coatings.includes("+"+coating_list[i+1])){
					table += `
						<td style="width: auto">
							${getSprite(coating_list[i+1])}
						</td>
						<td style="width: auto; text-align: left; color: #25ff25" class="mat-name">
							${coating_list[i+1]}+
						</td>
					`;
				}
				else{
					table += `
						<td style="width: auto">
							${getSprite("No Coating")}
						</td>
						<td style="width: auto; text-align: left; opacity: 0.25;" class="mat-name">
							${coating_list[i+1]}
						</td>
					`;
				}
			}
			table += `</tr>`;
		}
	}
	table += "</table></div>";
	document.getElementById("bow_coatings").innerHTML = table;
}

function Bow_filterShots(weapon){
	var include = [1, 1, 1, 1, 1, 1];
	for(var i = 0; i < filters[1].length; i++){
		switch(filters[1][i]){
			case "Arc Shot":
				var arc_shot = weapon["Arc Shot"];
				if(!arc_shot.includes(arc_shot_filter)) include[0] = 0;
				break;
			case "Coating":
				var coatings = weapon["Coatings"];
				if(!coatings.includes(coating_filter)) include[1] = 0;
				break;
			case "Charge 1":
				var charge = weapon["Charge"][0];
				if(!((typeof charge !== "undefined") && charge.includes(charge_filters[0]))){
					include[2] = 0;
				}
				break;
			case "Charge 2":
				var charge = weapon["Charge"][1];
				if(!((typeof charge !== "undefined") && charge.includes(charge_filters[1]))){
					include[3] = 0;
				}
				break;
			case "Charge 3":
				var charge = weapon["Charge"][2];
				if(!((typeof charge !== "undefined") && charge.includes(charge_filters[2]))){
					include[4] = 0;
				}
				break;
			case "Charge 4":
				var charge = weapon["Charge"][3];
				if(!((typeof charge !== "undefined") && charge.includes(charge_filters[3]))){
					include[5] = 0;
				}
				break;
		}
	}

	return include[0] && include[1] && include[2] && include[3] && include[4] && include[5];
}

var arc_shot_filter = "Wide";
var coating_filter = "Power Coating";
var charge_filters = ["Rapid", "Rapid", "Rapid", "Rapid"];

function Bow_setFilter(filter, id){
	if(filter == "Arc Shot"){
		arc_shot_filter = (id == 0) ? "Wide" : (id == 1) ? "Focus" : "Blast";
	}
	else if(filter == "Coating"){
		coating_filter = 
			(id == 0) ? "Power Coating" : 
			(id == 1) ? "C.Range Coating" :
			(id == 2) ? "Poison Coating" :
			(id == 3) ? "Paint Coating" :
			(id == 4) ? "Para Coating" :
			(id == 5) ? "Exhaust Coating" : "Sleep Coating";
	}
	else if(filter == "Charge 1"){
		charge_filters[0] = (id == 0) ? "Rapid" : (id == 1) ? "Pierce" : "Spread";
	}
	else if(filter == "Charge 2"){
		charge_filters[1] = (id == 0) ? "Rapid" : (id == 1) ? "Pierce" : "Spread";
	}
	else if(filter == "Charge 3"){
		charge_filters[2] = (id == 0) ? "Rapid" : (id == 1) ? "Pierce" : "Spread";
	}
	else if(filter == "Charge 4"){
		charge_filters[3] = (id == 0) ? "Rapid" : (id == 1) ? "Pierce" : "Spread";
	}
	filterTable();
}
function Bow_init(){
	data = Bow_data;
	var header = document.getElementById("unique-header");
	header.innerHTML = `Arc Shot <i class="fa fa-fw fa-sort"></i>`;
	header.style.display = "";

	for(var i = 0; i < 4; i++){
		var shot_type = document.getElementById("bow-"+i+"-header");
		shot_type.innerHTML = `Charge ${i+1} <i class="fa fa-fw fa-sort"></i>`;
		shot_type.style.display = "";
	}
	
	document.getElementById("poison_filter").style.display = "none";
	document.getElementById("para_filter").style.display = "none";
	document.getElementById("filters").innerHTML = `
		<tr>
			<td rowspan="5" onClick="filterTable('Final')" style="color: #c0c0c0; font-size: 12px;">Final</br>Form</td>
			
			<td onClick="filterTable('None')" style="color: #c0c0c0; font-size: 12px; width: auto;">None</td>
			<td onClick="filterTable('Fire')" style="color: #c0c0c0; font-size: 12px; width: auto;">Fire</td>
			<td onClick="filterTable('Water')" style="color: #c0c0c0; font-size: 12px; width: auto;">Water</td>
			<td onClick="filterTable('Thunder')" style="color: #c0c0c0; font-size: 12px; width: auto;">Thunder</td>
			
			<td rowspan="5" onClick="filterTable('Clear')" style="color: #c0c0c0; font-size: 12px;">Clear</td>
			
		</tr><tr>
			<td onClick="filterTable('Ice')" style="color: #c0c0c0; font-size: 12px; width: auto;">Ice</td>
			<td onClick="filterTable('Dragon')" style="color: #c0c0c0; font-size: 12px; width: auto;">Dragon</td>
			
			<td onClick="filterTable('Arc Shot')" style="color: #c0c0c0; font-size: 10px; width: auto;">
				<label>Arc Shot:</label><br>
				<select id="arc_shot_dropdown" class="charge-dropdown" onclick="event.stopPropagation();" onchange="Bow_setFilter('Arc Shot', this.selectedIndex)">
					<option>Wide</option>
					<option>Focus</option>
					<option>Blast</option>
				</select>
			</td>
			
			<td onClick="filterTable('Coating')" style="color: #c0c0c0; font-size: 10px; width: auto;">
				<label>Coating:</label><br>
				<select id="coating_dropdown" class="charge-dropdown" onclick="event.stopPropagation();" onchange="Bow_setFilter('Coating', this.selectedIndex)">
					<option>Power</option>
					<option>C.Range</option>
					<option>Poison</option>
					<option>Paint</option>
					<option>Para</option>
					<option>Exhaust</option>
					<option>Sleep</option>
				</select>
			</td>
			
		</tr><tr>
			<td onClick="filterTable('Charge 1')" style="color: #c0c0c0; font-size: 10px; width: auto;">
				<label>Charge 1:</label><br>
				<select id="charge_1_dropdown" class="charge-dropdown" onclick="event.stopPropagation();" onchange="Bow_setFilter('Charge 1', this.selectedIndex)">
					<option>Rapid</option>
					<option>Pierce</option>
					<option>Spread</option>
				</select>
			</td>
			<td onClick="filterTable('Charge 2')" style="color: #c0c0c0; font-size: 10px; width: auto;">
				<label>Charge 2:</label><br>
				<select id="charge_2_dropdown" class="charge-dropdown" onclick="event.stopPropagation();" onchange="Bow_setFilter('Charge 2', this.selectedIndex)">
					<option>Rapid</option>
					<option>Pierce</option>
					<option>Spread</option>
				</select>
			</td>
			<td onClick="filterTable('Charge 3')" style="color: #c0c0c0; font-size: 10px; width: auto;">
				<label>Charge 3:</label><br>
				<select id="charge_3_dropdown" class="charge-dropdown" onclick="event.stopPropagation();" onchange="Bow_setFilter('Charge 3', this.selectedIndex)">
					<option>Rapid</option>
					<option>Pierce</option>
					<option>Spread</option>
				</select>
			</td>
			<td onClick="filterTable('Charge 4')" style="color: #c0c0c0; font-size: 10px; width: auto;">
				<label>Charge 4:</label><br>
				<select id="charge_4_dropdown" class="charge-dropdown" onclick="event.stopPropagation();" onchange="Bow_setFilter('Charge 4', this.selectedIndex)">
					<option>Rapid</option>
					<option>Pierce</option>
					<option>Spread</option>
				</select>
			</td>
		</tr>
	`;
	
	var table = document.getElementById("materials_info");
	var row_0 = table.insertRow();
	row_0.id = "bow_coatings_header";
	row_0.innerHTML = `
		<th colspan="2">Coatings</th>
	`;
	var row_1 = table.insertRow();
	row_1.id = "bow_coatings_body";
	var cell_1 = row_1.insertCell();
	cell_1.colSpan="2";
	cell_1.id = "bow_coatings";
	cell_1.style.width = "100%";
}

function Bow_terminate(){	
	for(var i = 0; i < 4; i++){
		document.getElementById("bow-"+i+"-header").style.display = "none";
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
	
	var bow_coatings_header = document.getElementById("bow_coatings_header");
	bow_coatings_header.parentNode.removeChild(bow_coatings_header);
	var bow_coatings_body = document.getElementById("bow_coatings_body");
	bow_coatings_body.parentNode.removeChild(bow_coatings_body);
}