let defaultBoxes = 16;
let maxBoxes = 50;
let currentBoxes = defaultBoxes;
let grid = document.querySelector(".container");
let menu = document.querySelector(".menu");
let input = document.querySelector("#dim");
let message = document.querySelector("p");

let r;
let g;
let b;
let a;
let rate = 25;

document.querySelector("i").addEventListener("click", function() {
	menu.classList.toggle("show");
});

document.querySelector("button").addEventListener("click", function() {
	let dim = parseInt(input.value);

	message.textContent = "Please wait..";
	input.value = "";
	if(currentBoxes == dim) {
		reset();
	} else if(dim > 0 && dim <= maxBoxes) {
		init(dim);
	} else {
		message.textContent = "Valid range is from 1 - 50";
	}
});

function reset() {
	menu.classList.remove("show");
	message.textContent = "";
	grid.childNodes.forEach(function(el) {
		el.style.backgroundColor = "white";
	});
}

function randomColor() {
	r = Math.floor(Math.random() * 256);
	g = Math.floor(Math.random() * 256);
	b = Math.floor(Math.random() * 256);
	a = Math.random();
}

function init(boxes) {
	menu.classList.remove("show");
	while(grid.firstChild) {
		grid.removeChild(grid.firstChild);
	}
	currentBoxes = boxes;
	message.textContent = "";

	for(let i=0; i < boxes; i++) {
		for(let j=0; j < boxes; j++) {
			let box = document.createElement("div");
			box.style.width = (grid.offsetWidth - 2) / boxes + "px";
			box.style.height = (grid.offsetHeight - 2) / boxes + "px";
			box.style.float = "left";
			box.style.backgroundColor = "white";

			box.addEventListener("mouseover", function() {
				randomColor();

				let bgColor = this.style.backgroundColor;
				if(bgColor != "white") {
					let rgb = bgColor.split(", ");
					
					r = rgb[0].split("(")[1] - rate;
					g = rgb[1] - rate;
					b = rgb[2].split(")")[0] - rate;

					if(rgb[0].indexOf("a") != -1) {
						a = rgb[rgb.length - 1];
						a = a.split(")")[0];

						if(a < 1) {
							a = parseFloat(a) + .1;
						} else if(a >= 1) {
							a = 1;
						}
					} else {
						a = 1;
					}

					if(r != 0 && r < 0) {
						r = 0;
					}

					if(g != 0 && g < 0) {
						g = 0;
					}

					if(b != 0 && b < 0) {
						b = 0;
					}
				}

				this.style.backgroundColor = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
			});

			grid.appendChild(box);
		}
	}
}

init(defaultBoxes);