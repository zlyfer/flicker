// jshint esversion: 9

var flickers = [];

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);
  flickers.push(new Flicker(width / 2, height / 2, 10, 500));
  for (let i = 0; i < 20; i++) {
    let size = random(10, 20);
    flickers.push(
      new Flicker(
        random(size, width - size),
        random(size, height - size),
        size,
        random(50, 800),
        random(0, 255),
        random(0, 255),
        random(0, 255)
      )
    );
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  flickers.forEach((flicker) => {
    flicker.process();
  });
}
