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
	var include = 1;
	for(var i = 0; i < filters[1].length; i++){
		if(!weapon["Notes"].includes(filters[1][i])) include = 0;
	}
	return include;
}

function HH_init(){
	data = HH_data;
	var header = document.getElementById("unique-header");
	header.innerHTML = `Notes <i class="fa fa-fw fa-sort"></i>`;
	header.style.display = "";
	
	
	var filters = document.getElementById("filters-table");
	var filter_row_0 = filters.insertRow();
	filter_row_0.innerHTML = `
		<td onClick="filterTable('W')"><img src="assets/database/notes/note_W.png"></td>
		<td onClick="filterTable('P')"><img src="assets/database/notes/note_P.png"></td>
		<td onClick="filterTable('R')"><img src="assets/database/notes/note_R.png"></td>
		<td onClick="filterTable('B')"><img src="assets/database/notes/note_B.png"></td>
	`;
	filter_row_0.id = "filter_row_0";
	var filter_row_1 = filters.insertRow();
	filter_row_1.innerHTML = `
		<td onClick="filterTable('G')"><img src="assets/database/notes/note_G.png"></td>
		<td onClick="filterTable('C')"><img src="assets/database/notes/note_C.png"></td>
		<td onClick="filterTable('Y')"><img src="assets/database/notes/note_Y.png"></td>
		<td onClick="filterTable('O')"><img src="assets/database/notes/note_O.png"></td>
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