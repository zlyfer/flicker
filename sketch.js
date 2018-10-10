var flicker;
const maxforce = 500;

function preload() {}

function setup() {
	createCanvas(windowWidth, windowHeight);
	flicker = new Flicker(width / 2, height / 2, 10);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(255);
	flicker.process();
}