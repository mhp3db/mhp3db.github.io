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
	
	populate_dropdown("skill_1_name", skill_1_names);
	populate_dropdown("skill_2_name", skill_2_names);
	populate_dropdown("slots", slots);
	populate_dropdown("table", tables);
}

function search(){
	var max_results = document.getElementById("max_results").value;
	var skill_1_name = document.getElementById("skill_1_name").value;
	var skill_1_eq = document.getElementById("skill_1_eq").value;
	var skill_1_num = parseInt(document.getElementById("skill_1_num").value);
	var skill_2_name = document.getElementById("skill_2_name").value;
	var skill_2_eq = document.getElementById("skill_2_eq").value;
	var skill_2_num = parseInt(document.getElementById("skill_2_num").value);
	var slots = document.getElementById("slots").value;
	var table = document.getElementById("table").value;
	
	
	
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
			(skill_1_name === "Any" || ((getSkill(item["Skill 1"])[0] === skill_1_name) && cdt_1)) &&
			(skill_2_name === "Any" || ((getSkill(item["Skill 2"])[0] === skill_2_name) && cdt_2)) &&
			(slots === "Any" || item["Charm Slot"] === slots) &&
			(table === "Any" || item["Table No."] === table) &&
			(getSkill(item["Skill 1"])[0] !== getSkill(item["Skill 2"])[0])
		);
	});


	document.getElementById("results").innerHTML = "";
	if(result.length == 0) document.getElementById("results").innerHTML = "No results found";
	for(var i = 0; i < Math.min(result.length, max_results); i++){
		var n_slots = "---";
		switch(result[i]["Charm Slot"]){
			case "0": n_slots = "---"; break;
			case "1": n_slots = "O--"; break;
			case "2": n_slots = "OO-"; break;
			case "3": n_slots = "OOO"; break;
		};
		var res = '<img src="assets/talismans/' + result[i]["Charm Name"] + '.png" style="position: relative; top: 2px;">' + " Table " + result[i]["Table No."] + " [" + result[i]["Skill 1"] + ", " + result[i]["Skill 2"] + " " + n_slots + "]";
		
		document.getElementById("results").innerHTML+=res+"<br>";
	}
	show_results();
}

function reset_inputs(){
	document.getElementById("max_results").value = "100";
	document.getElementById("skill_1_name").value = "Any";
	document.getElementById("skill_1_eq").value = "e";
	document.getElementById("skill_1_num").value = "0";
	document.getElementById("skill_2_name").value = "Any";
	document.getElementById("skill_2_eq").value = "e";
	document.getElementById("skill_2_num").value = "0";
	document.getElementById("slots").value = "Any";
	document.getElementById("table").value = "Any";
	document.getElementById("results").innerHTML = "";
	hide_results();
}

window.onload = function(){
	reset_inputs();
	get_data();
}
