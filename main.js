map = document.getElementById("map")
main_dialog = document.getElementById("main_dialog")
close_button = document.getElementById("close_button")
top_left_info = document.getElementById("top_left_info")
top_left_info = document.getElementById("top_left_info")
indicator_elem = document.getElementById("indicator")
position_elem = document.getElementById("position")
scroll_elem = document.getElementById("scroll")
zoom_in_elem = document.getElementById("zoom_in")
zoom_out_elem = document.getElementById("zoom_out")

// on close button click, hide the main dialog
close_button.onclick = function() {
	main_dialog.hidden = true;
	top_left_info.style.display = "block";
	map.style.display = "block";
}

// function to scroll the map, *not* during mouse drag
var scroll_x = 0;
var scroll_y = 0;
var dx = 0;
var dy = 0;
rescroll = function(new_scroll_x, new_scroll_y) {
	scroll_x = new_scroll_x;
	scroll_y = new_scroll_y;
}
rescroll(DEFAULT_SCROLL_X, DEFAULT_SCROLL_Y);

// function to scroll the map during mouse drag
rescroll_move = function() {
	map.style.backgroundPositionX = -(scroll_x+dx) + "px";
	map.style.backgroundPositionY = -(scroll_y+dy) + "px";
	scroll_elem.innerHTML = scroll_x + ", " + scroll_y
}
rescroll_move();


// function to set scale of map
var scale = 1
var iscale = 1
rescale = function(new_scale) {
	if (new_scale==1) {
		map.style.backgroundImage = "url(\"map.png\")"
		scale = 1;
	} else if (new_scale==2) {
		map.style.backgroundImage = "url(\"map_2x.png\")"
		scale = 2;
	} else if (new_scale==3) {
		map.style.backgroundImage = "url(\"map_3x.png\")"
		scale = 3;
	} else if (new_scale==4) {
		map.style.backgroundImage = "url(\"map_4x.png\")"
		scale = 4;
	}
	iscale = 1/scale;
}
zoom_in_elem.onclick = function() {
	if (scale<4) {
		rescale(scale+1)
	}
}
zoom_out_elem.onclick = function() {
	if (scale>1) {
		rescale(scale-1)
	}
}


// add a position indicator for a click
var has_indicator = false
indicator = function(client_x, client_y) {
	console.log("Showing indicator...");
	indicator_elem.style.display = "block";
	indicator_elem.style.left = (client_x+10)+"px"
	indicator_elem.style.top = (client_y+10)+"px"

	var pos_x = (client_x+scroll_x)*iscale+OFFSET_X;
	var pos_y = (client_y+scroll_y)*iscale+OFFSET_Y;
	position_elem.innerHTML = pos_x + ", " + pos_y
	has_indicator = true
}
// hide indicator
unindicator = function() {
	if (has_indicator) {
		indicator_elem.style.display = "none"
		console.log("hiding indicator...");
		has_indicator = false;
	}
}


var mouse_down = false;
var drag_threshold = 10


map.onmousedown = function(ev) {
	console.log("down",ev);
	mouse_down = ev;
}
map.onmouseup = function(ev) {
	console.log("up",ev);
	mouse_down = false;
	if (dx > drag_threshold || dx > drag_threshold || dx < -drag_threshold || dx < -drag_threshold) {
		// mouse was "dragged", scroll map
		rescroll(scroll_x + dx, scroll_y + dy)
	} else {
		// no mouse drag, show a position indicator
		indicator(ev.clientX, ev.clientY)
	}
	dx = 0;
	dy = 0;
}
map.onmousemove = function(ev) {
	//console.log("move",ev,mouse_down);
	if (dx > drag_threshold || dx > drag_threshold || dx < -drag_threshold || dx < -drag_threshold) {
		// We're dragging the mouse, hide the indicator
		unindicator()
	}
	if (mouse_down) {
		// Drag the map
		//console.log("drag",ev);
		dx = mouse_down.clientX-ev.clientX;
		dy = mouse_down.clientY-ev.clientY;
		rescroll_move(mouse_down, ev);
	}
}
