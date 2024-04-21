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
var charge_lvl_filters = [0, 0, 0];
function Bow_filterShots(weapon){
	var include = [1, 1, 1, 1, 1, 1];
	for(var i = 0; i < filters[1].length; i++){
		switch(filters[1][i]){
			case "Wide":
				var arc_shot = weapon["Arc Shot"];
				if(!arc_shot.includes("Wide")) include[0] = 0;
				break;
			case "Focus":
				var arc_shot = weapon["Arc Shot"];
				if(!arc_shot.includes("Focus")) include[1] = 0;
				break;
			case "Blast":
				var arc_shot = weapon["Arc Shot"];
				if(!arc_shot.includes("Blast")) include[2] = 0;
				break;
			case "Rapid":
				var charge = weapon["Charge"][charge_lvl_filters[0]];
				if(!((typeof charge !== "undefined") && charge.includes("Rapid"))){
					include[3] = 0;
				}
				break;
			case "Pierce":
				var charge = weapon["Charge"][charge_lvl_filters[1]];
				if(!((typeof charge !== "undefined") && charge.includes("Pierce"))){
					include[4] = 0;
				}
				break;
			case "Spread":
				var charge = weapon["Charge"][charge_lvl_filters[2]];
				if(!((typeof charge !== "undefined") && charge.includes("Spread"))){
					include[5] = 0;
				}
				break;
		}
	}

	return include[0] && include[1] && include[2] && include[3] && include[4] && include[5];
}

function Bow_setFilter(id, value){
	charge_lvl_filters[id] = value;
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
			
			<td onClick="filterTable('None')" style="color: #c0c0c0; font-size: 12px; height: 100%; width: auto;">None</td>
			<td onClick="filterTable('Fire')" style="color: #c0c0c0; font-size: 12px; height: 100%; width: auto;">Fire</td>
			<td onClick="filterTable('Water')" style="color: #c0c0c0; font-size: 12px; height: 100%; width: auto;">Water</td>
			<td onClick="filterTable('Thunder')" style="color: #c0c0c0; font-size: 12px; height: 100%; width: auto;">Thunder</td>
			
			<td rowspan="5" onClick="filterTable('Clear')" style="color: #c0c0c0; font-size: 12px;">Clear</td>
			
		</tr><tr>
			<td onClick="filterTable('Ice')" style="color: #c0c0c0; font-size: 12px; height: 100%; width: auto;">Ice</td>
			<td onClick="filterTable('Dragon')" style="color: #c0c0c0; font-size: 12px; height: 100%; width: auto;">Dragon</td>
			<td onClick="filterTable('Wide')" style="color: #c0c0c0; font-size: 10px; height: 100%; width: auto;">Wide</br>Arc Shot</td>
			<td onClick="filterTable('Focus')" style="color: #c0c0c0; font-size: 10px; height: 100%; width: auto;">Focus</br>Arc Shot</td>
			
		</tr><tr>
			<td onClick="filterTable('Blast')" style="color: #c0c0c0; font-size: 10px; height: 100%; width: auto;">Blast</br>Arc Shot</td>
			<td onClick="filterTable('Rapid')" style="color: #c0c0c0; font-size: 10px; height: 100%; width: auto;">
				<label>Rapid:</label><br>
				<select id="rapid_dropdown" class="charge-dropdown" onclick="event.stopPropagation();" onchange="Bow_setFilter(0, this.selectedIndex)">
					<option>Charge 1</option>
					<option>Charge 2</option>
					<option>Charge 3</option>
					<option>Charge 4</option>
				</select>
			</td>
			<td onClick="filterTable('Pierce')" style="color: #c0c0c0; font-size: 10px; height: 100%; width: auto;">
				<label>Pierce:</label><br>
				<select id="pierce_dropdown" class="charge-dropdown" onclick="event.stopPropagation();" onchange="Bow_setFilter(1, this.selectedIndex)">
					<option>Charge 1</option>
					<option>Charge 2</option>
					<option>Charge 3</option>
					<option>Charge 4</option>
				</select>
			</td>
			<td onClick="filterTable('Spread')" style="color: #c0c0c0; font-size: 10px; height: 100%; width: auto;">
				<label>Spread:</label><br>
				<select id="spread_dropdown" class="charge-dropdown" onclick="event.stopPropagation();" onchange="Bow_setFilter(2, this.selectedIndex)">
					<option>Charge 1</option>
					<option>Charge 2</option>
					<option>Charge 3</option>
					<option>Charge 4</option>
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
	sorting = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
	
	for(var i = 0; i < 4; i++){
		document.getElementById("bow-"+i+"-header").style.display = "none";
	}
	
	document.getElementById("filters").innerHTML = `
		<tr>
			<td rowspan="5" onClick="filterTable('Final')" style="color: #c0c0c0; font-size: 12px;">Final</br>Form</td>
			
			<td onClick="filterTable('None')" style="color: #c0c0c0; font-size: 12px; height: 100%; width: auto;">None</td>
			<td onClick="filterTable('Fire')" style="color: #c0c0c0; font-size: 12px; height: 100%; width: auto;">Fire</td>
			<td onClick="filterTable('Water')" style="color: #c0c0c0; font-size: 12px; height: 100%; width: auto;">Water</td>
			<td onClick="filterTable('Thunder')" style="color: #c0c0c0; font-size: 12px; height: 100%; width: auto;">Thunder</td>
			
			<td rowspan="5" onClick="filterTable('Clear')" style="color: #c0c0c0; font-size: 12px;">Clear</td>
			
		</tr><tr>
			<td onClick="filterTable('Ice')" style="color: #c0c0c0; font-size: 12px; height: 100%; width: auto;">Ice</td>
			<td onClick="filterTable('Dragon')" style="color: #c0c0c0; font-size: 12px; height: 100%; width: auto;">Dragon</td>
			<td id="poison_filter" onClick="filterTable('Poison')" style="color: #c0c0c0; font-size: 12px; height: 100%; width: auto;">Poison</td>
			<td id="para_filter" onClick="filterTable('Paralyze')" style="color: #c0c0c0; font-size: 12px; height: 100%; width: auto;">Paralyze</td>				
		</tr>
	`;
	
	var horn_melodies = document.getElementById("bow_coatings_header");
	horn_melodies.parentNode.removeChild(horn_melodies);
	var horn_melodies = document.getElementById("bow_coatings_body");
	horn_melodies.parentNode.removeChild(horn_melodies);
}