new p5();

var SIDE = 60;
var HEIGHT = SIDE * sin(radians(60));


function setup() {
    var canvas = createCanvas(windowWidth, 400);
    canvas.parent('header');

    background(255, 0, 0);

    for(var i = 0; i * HEIGHT < 400; i++) {
	if (i % 2 === 0) {
	    fillRow(i * HEIGHT);
	} else {
	    fillRow(i * HEIGHT, SIDE / 2);
	}
    }
}


function fillRow(y, translation = 0) {
    for(var i = 0; i < windowWidth; i += SIDE) {
	var t1 = new Triangle(i + translation, y);
	var t2 = new Triangle(i + translation + SIDE/2, y);
	t1.display('down');
	t2.display('up');
    }
}


function Triangle(x, y) {
    this.x = x;
    this.y = y;
    this.height = SIDE * sin(radians(60));

    this.color = color(random(150, 255), random(0, 30), random(0, 30));

    this.display = function(direction) {
	fill(this.color);
	noStroke();
	if (direction == 'down') {
	    triangle(this.x, this.y,
		     this.x + SIDE, this.y,
		     this.x + SIDE / 2, this.y + HEIGHT);
	} else {
	    triangle(this.x, this.y + HEIGHT,
		     this.x + SIDE, this.y + HEIGHT,
		     this.x + SIDE / 2, this.y);
	}
    }
}




