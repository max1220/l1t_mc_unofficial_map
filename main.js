map = document.getElementById("map")
main_dialog = document.getElementById("main_dialog")
close_button = document.getElementById("close_button")
top_left_info = document.getElementById("top_left_info")
top_left_info = document.getElementById("top_left_info")
indicator_elem = document.getElementById("indicator")
position_elem = document.getElementById("position")
scroll_elem = document.getElementById("scroll")

close_button.onclick = function() {
	main_dialog.hidden = true;
	top_left_info.style.display = "block";
	map.style.display = "block";
}

var mouse_down = false;
var scroll_x = 0;
var scroll_y = 0;
var dx = 0;
var dy = 0;
var drag_threshold = 10

map.onmousedown = function(ev) {
	console.log("down",ev);
	mouse_down = ev;
}
map.onmouseup = function(ev) {
	console.log("up",ev);
	mouse_down = false;
	if (dx > drag_threshold || dx > drag_threshold || dx < -drag_threshold || dx < -drag_threshold) {
		scroll_x = scroll_x + dx;
		scroll_y = scroll_y + dy;
	} else {
		console.log("Showing indicator...");
		indicator_elem.style.display = "block";
		indicator_elem.style.left = (ev.clientX+10)+"px"
		indicator_elem.style.top = (ev.clientY+10)+"px"

		var pos_x = ev.clientX+scroll_x+OFFSET_X;
		var pos_y = ev.clientY+scroll_y+OFFSET_Y;
		position_elem.innerHTML = pos_x + ", " + pos_y
	}
	dx = 0;
	dy = 0;
}
map.onmousemove = function(ev) {
	//console.log("move",ev,mouse_down);
	if (dx > drag_threshold || dx > drag_threshold || dx < -drag_threshold || dx < -drag_threshold) {
		// hide map indicator
		indicator_elem.style.display = "none"
		console.log("hiding indicator...");
	}
	if (mouse_down) {
		//console.log("drag",ev);
		dx = mouse_down.clientX-ev.clientX;
		dy = mouse_down.clientY-ev.clientY;
		map.style.backgroundPositionX = -(scroll_x+dx) + "px";
		map.style.backgroundPositionY = -(scroll_y+dy) + "px";
		scroll_elem.innerHTML = scroll_x + ", " + scroll_y
	}
}
