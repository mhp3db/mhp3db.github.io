var HH_song_effects = [];
var HH_filtered_effect = "Abnormal Status Negated";

function notesMatch(notes_0, notes_1){
	n0 = notes_0.toString();
	n1 = notes_1.toString();
	
	n0 = n0.split("").sort().join("");
	n1 =n1.split("").sort().join("");
		
	for(var i = 0; i < 3; i++) if(n0[i] != n1[i]) return false;
	return true;
}

function getSonglist(notes){
    for(var e in songlist) {
        var music = songlist[e];
        if(notesMatch(e, notes)){
            return music;
        }
    }
    return null;
}

function getFullSonglist(){
	HH_song_effects = [];
	for(var name in data){
		var notes = data[name]["Notes"];
		var songlist = getSonglist(notes);
		for(var effect in songlist){
			if(!HH_song_effects.includes(songlist[effect])) HH_song_effects.push(songlist[effect]);
		} 
	}
	HH_song_effects.sort();
}

function HH_showMoreInfo(event){
	var weapon = data[active_row.id];
	var notes = weapon["Notes"];
	var table = `<table><thead><tr><th>Notes</th><th>Effect</th></tr></thead><tbody>`;
	var songs = getSonglist(notes);
	for(var e in songs){
	var song = "";
	for(var i = 0; i < e.length; i++) song += `<img src="assets/database/notes/note_${e[i]}.png">`
		table += `<tr><td><span style="display: inline-block; text-align: left; width:44px; border: 1px;">${song}</span></td></div><td>${songs[e]}</td></tr>`;
	}
	table += "</tbody></table>";
	document.getElementById("horn_melodies_header").innerHTML = `
		<th colspan="2">Horn Melodies</br><img src="assets/database/notes/note_${notes[0]}.png"><img src="assets/database/notes/note_${notes[1]}.png"><img src="assets/database/notes/note_${notes[2]}.png"></th>`;
	document.getElementById("horn_melodies").innerHTML = table;
}

function HH_filterNotes(weapon){
	document.getElementById("horn_melodies").innerHTML = "";
	var include_0 = 1;
	var include_1 = 1;
	var note_names = ["W", "P", "R", "B", "G", "C", "Y", "O"];
	for(var i = 0; i < filters[1].length; i++){
		if(note_names.includes(filters[1][i])) if(!weapon["Notes"].includes(filters[1][i])) include_0 = 0;
		if(filters[1][i] == "Effect"){
			var effects = [];
			var songlist = getSonglist(weapon["Notes"])
			for(var effect in songlist) effects.push(songlist[effect]);
			if(!effects.includes(HH_filtered_effect)) include_1 = 0;
		}
	}
	return include_0 && include_1;
}

function HH_setFilter(filter, id){
	switch(filter){
		case "WP":
			switch(id){
				case "W":
					if(filters[1].includes("P")){
						var index = filters[1].indexOf("P");
						if(index != -1) filters[1].splice(index, 1);
					}
					filterTable("W");
					break;
				case "P":
					if(filters[1].includes("W")){
						var index = filters[1].indexOf("W");
						if(index != -1) filters[1].splice(index, 1);
					}
					filterTable("P");
					break;
			}
			break;
		case "Effect":
			HH_filtered_effect = HH_song_effects[id];
			filterTable();
			break;
	}
}

function HH_init(){
	data = HH_data;
	getFullSonglist();
	var header = document.getElementById("unique-header");
	header.innerHTML = `Notes <i class="fa fa-fw fa-sort"></i>`;
	header.style.display = "";
	
	
	var filters = document.getElementById("filters-table");
	var filter_row_0 = filters.insertRow();
	filter_row_0.innerHTML = `
		<td style="background-color: transparent; font-size: 12px; height: 100%; width: auto; cursor: default; padding: 0 0;">
			<table class="filters-table" style="table-layout: unset"><tr>
				<td onClick="HH_setFilter('WP', 'W')"><img src="assets/database/notes/note_W.png"></td>
				<td onClick="HH_setFilter('WP', 'P')"><img src="assets/database/notes/note_P.png"></td>
			</tr></table>
		</td>
		<td onClick="filterTable('R')"><img src="assets/database/notes/note_R.png"></td>
		<td onClick="filterTable('B')"><img src="assets/database/notes/note_B.png"></td>
		<td onClick="filterTable('G')"><img src="assets/database/notes/note_G.png"></td>
	`;
	filter_row_0.id = "filter_row_0";
	var filter_row_1 = filters.insertRow();
	filter_row_1.innerHTML = `
		
		<td onClick="filterTable('C')"><img src="assets/database/notes/note_C.png"></td>
		<td onClick="filterTable('Y')"><img src="assets/database/notes/note_Y.png"></td>
		<td onClick="filterTable('O')"><img src="assets/database/notes/note_O.png"></td>
		<td onClick="filterTable('Effect')" style="color: #c0c0c0; font-size: 10px; height: 100%; width: auto;">
				<label>Effect:</label><br>
				<select id="HH_effect_dropdown" class="charge-dropdown" onclick="event.stopPropagation();" onchange="HH_setFilter('Effect', this.selectedIndex)">
				</select>
			</td>
	`;
	filter_row_1.id = "filter_row_1";
	
	var table = document.getElementById("materials_info");
	var row_0 = table.insertRow();
	row_0.id = "horn_melodies_header";
	row_0.innerHTML = `
		<th colspan="2">Horn Melodies</th>
	`;
	var row_1 = table.insertRow();
	row_1.id = "horn_melodies_body";
	var cell_1 = row_1.insertCell();
	cell_1.colSpan="2";
	cell_1.id = "horn_melodies";
	cell_1.classList.add("info-table");
	cell_1.style.width = "100%";
	cell_1.innerHTML = 
		`<table><thead><tr style="background-color: #707070"><th>Notes</th><th>Effect</th></tr></thead></table>
	`;
	getFullSonglist();
	var option = document.createElement("option");
	for(var i = 0; i < HH_song_effects.length; i++) {
		option = document.createElement("option");
		option.text = HH_song_effects[i];
		document.getElementById("HH_effect_dropdown").add(option);
	}	
}

function HH_terminate(){
	var filter_row_0 = document.getElementById("filter_row_0");
	filter_row_0.parentNode.removeChild(filter_row_0);
	var filter_row_1 = document.getElementById("filter_row_1");
	filter_row_1.parentNode.removeChild(filter_row_1);
	
	var horn_melodies = document.getElementById("horn_melodies_header");
	horn_melodies.parentNode.removeChild(horn_melodies);
	var horn_melodies = document.getElementById("horn_melodies_body");
	horn_melodies.parentNode.removeChild(horn_melodies);

}