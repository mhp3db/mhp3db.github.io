function getItem(reward){
	const filter = reward.match(/(.+?)\s*x\s*(\d+)/i);
	if(filter){
		return [filter[1], parseInt(filter[2], 10)];
	}
	return ["Empty", 0];
}

function populate_dropdown(ID, array){
	var dropdown = document.getElementById(ID);
	dropdown.size = array.length + 1;
	for(var i = 0; i < array.length; i++){
		var option = document.createElement("option");
		option.textContent = array[i];
		option.value = array[i];
		dropdown.appendChild(option);
	}
}

function get_data(){
	var slot_rewards = [];

	for(var i = 0; i < 10; i++) slot_rewards.push([]);

	for(var i = 0; i < data.length; i++){
		for(var j = 0; j < 10; j++){
			var slot = data[i]["Reward " + (j + 1)];
			if(!slot_rewards[j].includes(slot)) slot_rewards[j].push(slot);
		}
	}

	for(var j = 0; j < 10; j++){
		slot_rewards[j].sort();
		populate_dropdown("slot_" + j, slot_rewards[j]);
	}
}

function search(){
	var rewards = [];
	for(var i = 0; i < 10; i++) rewards[i] = document.getElementById("slot_" + i).value;
	var result = data.filter(item => 
		(rewards[0] === "Any" || item["Reward 1"] === rewards[0]) &&
		(rewards[1] === "Any" || item["Reward 2"] === rewards[1]) &&
		(rewards[2] === "Any" || item["Reward 3"] === rewards[2]) &&
		(rewards[3] === "Any" || item["Reward 4"] === rewards[3]) &&
		(rewards[4] === "Any" || item["Reward 5"] === rewards[4]) &&
		(rewards[5] === "Any" || item["Reward 6"] === rewards[5]) &&
		(rewards[6] === "Any" || item["Reward 7"] === rewards[6]) &&
		(rewards[7] === "Any" || item["Reward 8"] === rewards[7]) &&
		(rewards[8] === "Any" || item["Reward 9"] === rewards[8]) &&
		(rewards[9] === "Any" || item["Reward 10"] === rewards[9])
	);
	document.getElementById("results").innerHTML = "";
	if(result.length == 0) document.getElementById("results").innerHTML = "No results found";
	else{
		var trimmed_results = [];
		for(var i = 0; i < result.length; i++) if(!trimmed_results.includes(result[i]["Table"])) trimmed_results.push(result[i]["Table"]);
		for(var i = 0; i < trimmed_results.length; i++){
			var res = "Table " + String(trimmed_results[i]);
			document.getElementById("results").innerHTML+=res+"<br>";
		}
	}
	
	show_results();
}

function toggle_list(id){
	var reward = document.getElementById(id);
	if(reward.style.display === "none") reward.style.display = "block";
	else reward.style.display = "none";
}

function hide_list(id){
	document.getElementById(id).style.display = "none";
}

document.addEventListener("click", function (event) {
    var dropdowns = document.querySelectorAll(".reward-list");
    for (var i = 0; i < dropdowns.length; i++) {
        var dropdown = dropdowns[i];
        var image = document.querySelector('[data-dropdown="' + dropdown.id + '"]');
        if (event.target !== dropdown && !dropdown.contains(event.target) && event.target !== image) {
            dropdown.style.display = "none";
        }
    }
});

function update(){
	var x = 0, y = 0;
	for(var i = 0; i < 10; i++){
		x = 104 * ((i < 8) ? i : (i-8)) + 84;
		y = (i < 8) ? 48 : 128;
		var icon = document.createElement("img");
		icon.classList.add("reward");
		icon.setAttribute("data-dropdown", "slot_" + i);
		icon.onclick = function(){
			var id = this.getAttribute("data-dropdown");
			toggle_list(id);
		};
		icon.style.left = x + "px";
		icon.style.top = y + "px";
		icon.id = "icon_" + i;
		icon.src = "assets/rewards/Any.png";
		document.getElementById("reward-table").appendChild(icon);
		
		var num = document.createElement("div");
		num.classList.add("reward-num");
		num.style.left = (x + 44) + "px";
		num.style.top = (y + 48) + "px";
		num.textContent = "0";
		num.id = "reward_num_" + i;
		document.getElementById("reward-table").appendChild(num);
		
		var list = document.createElement("select");
		list.id = "slot_" + i;
		list.classList.add("reward-list");
		list.size = 5;
		var default_option = document.createElement("option");
		default_option.value = "Any";
		default_option.textContent = "Any";
		default_option.selected = true;
		list.appendChild(default_option);
		list.onchange = function(){
			var id = this.id;
			if(this.value === "Any"){
				document.getElementById("icon_" + id.split("_")[1]).src = "assets/rewards/Any.png";
				document.getElementById("reward_num_" + id.split("_")[1]).textContent = 0;
			}
			else{
				document.getElementById("icon_" + id.split("_")[1]).src = "assets/rewards/" + getItem(this.value)[0] + ".png";
				document.getElementById("reward_num_" + id.split("_")[1]).textContent = getItem(this.value)[1];
			}
			hide_list(id);
			search();
		};
		list.style.left = (x - 12) + "px";
		list.style.top = (y + 60) + "px";
		document.getElementById("reward-table").appendChild(list);	
	}
	var re = document.createElement("button");
	re.textContent = "Reset";
	re.classList.add("reset");
	re.onclick = function(){window.location.reload();}
	document.getElementById("reward-table").appendChild(re);
}

window.onload=function(){
	update();
	get_data();
}