var tree = document.getElementById("weapon_tree");

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

function weaponTree() {
	var table = document.createElement("table");
	table.style.border = "none";
	table.style.borderBottom = "1px solid #c0c0c0";
	var tree = getWeaponTree(active_row.id).reverse();
	var weapon_tree = document.getElementById("weapon_tree");
	weapon_tree.classList.add("weapon-table");
	while (weapon_tree.firstChild) weapon_tree.removeChild(weapon_tree.firstChild);
	for (var i = 0; i < tree.length; i++) {
		var row_0 = table.insertRow();
		row_0.id = tree[i];
		row_0.addEventListener("click", function(event) {
			showMoreInfo(event, data);
		});
		if (tree[i] == active_row.id) row_0.classList.add("active-row");
		else row_0.classList.remove("active-row");
		var cell_0 = row_0.insertCell();
		cell_0.innerHTML = "";
		if (data[tree[i]]["Craft"]) {
			cell_0.innerHTML += `<span style="float: right">Craftable</span>`;
		} else {
			cell_0.innerHTML += `<span style="float: right">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
			</span>`;
		}

		cell_0.innerHTML += `<span style="float: left">${(i+1)}</span><span style="display: inline-block; text-align: left; width: 150px;">${tree[i]}</span>`;

	}
	


	weapon_tree.appendChild(table);
}