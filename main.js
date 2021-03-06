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
markers_elem = document.getElementById("markers")

// on close button click, hide the main dialog
close_button.onclick = function() {
	main_dialog.hidden = true;
	top_left_info.style.display = "block";
	map.style.display = "block";
}



var scroll_x = 0;
var scroll_y = 0;
var dx = 0;
var dy = 0;
var scale = 1;
var mouse_down = false;
var mouse_down_x = 0;
var mouse_down_y = 0;
var drag_threshold = 10;


var markers = []
update_markers = function() {
	if (scale != 1) {
		markers.forEach(function(elem, index) {
			elem.html_elem.style.display = "none";
		})
		return;
	}
	markers.forEach(function(elem, index) {
		var screen_x = elem.coord_x-(scroll_x+dx+OFFSET_X);
		var screen_y = elem.coord_y-(scroll_y+dy+OFFSET_Y);
		console.log("New marker screen position for " + elem.name + ": " + screen_x + ", " + screen_y);
		elem.html_elem.style.left = screen_x+"px";
		elem.html_elem.style.top = screen_y+"px";
		elem.html_elem.style.display = "block";
	});
}
add_marker = function(coord_x, coord_y, name) {
	console.log("Adding marker " + name + " at " + coord_x + ", " + coord_y);
	var marker_elem = document.createElement("div");
	marker_elem.classList += "marker tooltip";

	var marker_tooltip_elem = document.createElement("span");
	marker_tooltip_elem.classList += "tooltiptext";
	marker_tooltip_elem.innerHTML = name;
	marker_elem.appendChild(marker_tooltip_elem);

	markers_elem.appendChild(marker_elem);
	markers_elem.onclick = function() {
		console.log("marker " + name + " was clicked!");
	}
	markers.push({
		coord_x: coord_x,
		coord_y: coord_y,
		name: name,
		html_elem: marker_elem
	})
	update_markers();
}
DEFAULT_MARKERS.forEach(function(elem, index) {
	add_marker(elem.coord_x, elem.coord_y, elem.name);
})


// function to scroll the map, *not* during mouse drag
rescroll = function(new_scroll_x, new_scroll_y) {
	scroll_x = Math.floor(new_scroll_x);
	scroll_y = Math.floor(new_scroll_y);
}
rescroll(DEFAULT_SCROLL_X, DEFAULT_SCROLL_Y);

// function to scroll the map during mouse drag
rescroll_move = function() {
	map.style.backgroundPositionX = -(scroll_x+dx) + "px";
	map.style.backgroundPositionY = -(scroll_y+dy) + "px";
	scroll_elem.innerHTML = scroll_x + ", " + scroll_y;
	update_markers();
}
rescroll_move();


// function to set scale of map
rescale = function(new_scale) {
	if (new_scale==1) {
		map.style.backgroundImage = "url(\"map.png\")";
		scale = 1;
	} else if (new_scale==2) {
		map.style.backgroundImage = "url(\"map_2x.png\")";
		scale = 2;
	} else if (new_scale==3) {
		map.style.backgroundImage = "url(\"map_3x.png\")";
		scale = 3;
	} else if (new_scale==4) {
		map.style.backgroundImage = "url(\"map_4x.png\")";
		scale = 4;
	} else if (new_scale==0.5) {
		map.style.backgroundImage = "url(\"map_05.png\")";
		scale = 0.5;
	} else if (new_scale==0.2) {
		map.style.backgroundImage = "url(\"map_02.png\")";
		scale = 0.2;
	} else if (new_scale==0.1) {
		map.style.backgroundImage = "url(\"map_01.png\")";
		scale = 0.1;
	}
	unindicator();
	update_markers();
	rescroll(DEFAULT_SCROLL_X*(1/scale), DEFAULT_SCROLL_Y*(1/scale));
}
var avail_scales = [0.1, 0.2, 0.5, 1, 2, 3, 4];
var cur_scale = 4;
zoom_in_elem.onclick = function() {
	if (cur_scale<avail_scales.length) {
		cur_scale += 1;
		rescale(avail_scales[cur_scale]);
	}
	console.log("Zoom in: " + scale + "(" + cur_scale + ")")
}
zoom_out_elem.onclick = function() {
	if (cur_scale>1) {
		cur_scale -= 1;
		rescale(avail_scales[cur_scale]);
	}
	console.log("Zoom out: " + scale + "(" + cur_scale + ")")
}






// add a position indicator for a click
var has_indicator = false;
indicator = function(client_x, client_y) {
	console.log("Showing indicator...");
	indicator_elem.style.display = "block";
	indicator_elem.style.left = (client_x+10)+"px";
	indicator_elem.style.top = (client_y+10)+"px";

	var pos_x = (client_x+scroll_x)*(1/scale)+OFFSET_X;
	var pos_y = (client_y+scroll_y)*(1/scale)+OFFSET_Y;
	position_elem.innerHTML = Math.floor(pos_x) + ", " + Math.floor(pos_y);
	has_indicator = true;
}
// hide indicator
unindicator = function() {
	if (has_indicator) {
		indicator_elem.style.display = "none"
		console.log("hiding indicator...");
		has_indicator = false;
	}
}





map.onmousedown = function(ev) {
	console.log("down",ev);
	mouse_down = true;
	mouse_down_x = ev.clientX;
	mouse_down_y = ev.clientY;
}
map.onmouseup = function(ev) {
	console.log("up",ev);
	mouse_down = false;
	if (dx > drag_threshold || dx > drag_threshold || dx < -drag_threshold || dx < -drag_threshold) {
		// mouse was "dragged", scroll map
		rescroll(scroll_x + dx, scroll_y + dy);
	} else {
		// no mouse drag, show a position indicator
		indicator(ev.clientX, ev.clientY);
	}
	dx = 0;
	dy = 0;
}
map.onmousemove = function(ev) {
	//console.log("move",ev,mouse_down);
	if (dx > drag_threshold || dx > drag_threshold || dx < -drag_threshold || dx < -drag_threshold) {
		// We're dragging the mouse, hide the indicator
		unindicator();
	}
	if (mouse_down) {
		// Drag the map
		//console.log("drag",ev);
		dx = mouse_down_x-ev.clientX;
		dy = mouse_down_y-ev.clientY;
		rescroll_move();
	}
}


map.ontouchstart = function(ev) {
	console.log("touch down",ev);
	mouse_down = true;
	mouse_down_x = ev.touches[0].clientX;
	mouse_down_y = ev.touches[0].clientY;
}
map.ontouchend = function(ev) {
	console.log("touch up",ev);
	mouse_down = false;
	rescroll(scroll_x + dx, scroll_y + dy);
	dx = 0;
	dy = 0;
}
map.ontouchmove = function(ev) {
	console.log("touch move",ev.targetTouches[0].clientX, ev.targetTouches[0].clientY, ev);
	if (dx > drag_threshold || dx > drag_threshold || dx < -drag_threshold || dx < -drag_threshold) {
		unindicator();
	}
	if (mouse_down) {
		dx = mouse_down_x-ev.targetTouches[0].clientX;
		dy = mouse_down_y-ev.targetTouches[0].clientY;
		rescroll_move();
	}
}
