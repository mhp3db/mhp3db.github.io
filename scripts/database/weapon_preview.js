var intervalId = null;
var frame = 0;
var frame_num = null;
var startX = null;
var touchStartX = null;
var preview = document.getElementById("weapon_preview");

const rotate = function(deltaX) {
	if (document.getElementById("play_animation").checked) {
		frame--;
		if(frame < 0) {
			frame = frame_num - 1;
		}
		else if(frame >= frame_num) {
			frame = 0;
		}
		preview.style.backgroundPosition = `0 ${frame * 200}px`;
	} else {
		frame += deltaX < 0 ? 1 : -1;
		if(frame < 0) {
			frame = frame_num - 1;
		}
		else if(frame >= frame_num) {
			frame = 0;
		}
		preview.style.backgroundPosition = `0 ${frame * 200}px`;
	}
};

function onMouseMove(e) {
	var deltaX = e.clientX - startX;
	rotate(deltaX);
	startX = e.clientX;
}

function onMouseUp() {
	document.removeEventListener("mousemove", onMouseMove);
	document.removeEventListener("mouseup", onMouseUp);
}

function onMouseDown(e) {
	if (e.target === preview) {
		e.preventDefault();
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
		startX = e.clientX;
	}
}

function onTouchStart(e) {
	touchStartX = e.touches[0].clientX;
	e.preventDefault();
}

function onTouchMove(e) {
	var touch = e.touches[0];
	var deltaX = touch.clientX - touchStartX;
	rotate(deltaX);
	touchStartX = touch.clientX;
	e.preventDefault();
}

function onCheckboxChange() {
	if (this.checked) {
		intervalId = setInterval(rotate, 50);
		document.getElementById("play_pause").classList.remove("fa-play");
		document.getElementById("play_pause").classList.add("fa-pause");
	} else {
		clearInterval(intervalId);
		document.getElementById("play_pause").classList.remove("fa-pause");
		document.getElementById("play_pause").classList.add("fa-play");
	}
}

function weaponPreview() {
	document.removeEventListener("mousedown", onMouseDown);
	document.removeEventListener("mousemove", onMouseMove);
	document.removeEventListener("mouseup", onMouseUp);
	document.removeEventListener("touchstart", onTouchStart);
	document.removeEventListener("touchmove", onTouchMove);
	document.getElementById("play_animation").removeEventListener("change", onCheckboxChange);
	clearInterval(intervalId);
	document.getElementById("play_pause").classList.remove("fa-pause");
	document.getElementById("play_pause").classList.add("fa-play");
	document.getElementById("play_animation").checked = false;
	preview.style.backgroundImage = null;
	preview.style.width = "221px";
	preview.style.height = "200px";
	preview.style.display = "flex";
	frame = 0;

	var weapon = active_row.id;
	var title = document.getElementById("weapon_title");
	title.innerHTML = `${weapon}`;

	var preview_list = preview_data[WEAPON_TYPE];
	for (var key in preview_list) {
		if (preview_list[key].includes(weapon)) {
			var temp = new Image();
			temp.onload = function() {
				frame_num = temp.height / 200;
				preview.style.backgroundPosition = "0 0";
				preview.style.backgroundImage = `url("${temp.src}")`;

				document.addEventListener("mousedown", onMouseDown);

				preview.addEventListener("touchstart", onTouchStart);
				preview.addEventListener("touchmove", onTouchMove);
				document.getElementById("play_animation").addEventListener("change", onCheckboxChange);
			};
			temp.src = `assets/database/weapons/${WEAPON_TYPE}/${key}.png`;
		}
	}
}