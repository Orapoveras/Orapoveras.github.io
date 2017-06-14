new p5();

var SIDE = 60;
var HEIGHT = SIDE * sin(radians(60));
var CANVAS_HEIGHT = windowHeight;
var CANVAS_WIDTH = windowWidth;

var triangles;

function setup() {
    frameRate(10);
    var canvas = createCanvas(windowWidth, CANVAS_HEIGHT);
    canvas.parent('header');
    background(255, 0, 0);

    triangles = fillCanvas();
    drawTriangles(triangles);
}


function draw() {
    for (var i = 0; i < triangles.length; i++) {
	triangles[i].driftColor();
    }
    drawTriangles(triangles);
}


function fillCanvas() {
    res = [];
    var i = 0;
    while (i * HEIGHT < CANVAS_HEIGHT) {
	if (i % 2 === 0) {
	    res = res.concat(fillRow(i * HEIGHT));
	} else {
	    res = res.concat(fillRow(i * HEIGHT, SIDE / 2));
	}
	i++;
    }

    return res;
}


function fillRow(y, translation = 0) {
    res = [];
    var i = 0;
    while (i * SIDE < windowWidth) {
	res.push(createTriangle(i * 60 + translation,
				y, 'down'));
	res.push(createTriangle(i * 60 + translation + SIDE / 2,
				y + HEIGHT, 'up'));
	i++;
    }
    
    return res;
}


function drawTriangles(triangles) {
    for (var i = 0; i < triangles.length; i++) {
	triangles[i].display();
    }
}


function createTriangle(x, y, orientation) {
    var p1 = new Point(x           , y);
    var p2 = new Point(x + SIDE    , y);
    var p3 = new Point(x + SIDE / 2,
		       (orientation === 'down') ? y + HEIGHT : y - HEIGHT)

    return new Triangle(p1, p2, p3);
}


function Point(x, y) {
    this.x = x;
    this.y = y;
}


function Triangle(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;

    this.color = randomColor();
    this.colorTarget = randomColor();

    this.driftColor = function() {
	var red = this.color.levels[0];
	var targetRed = this.colorTarget.levels[0];
	if (red < targetRed) {
	    this.color = color(red + 1, 0, 0);
	} else if (red > targetRed) {
	    this.color = color(red - 1, 0, 0);
	} else {
	    this.colorTarget = randomColor();
	}
    }

    this.display = function() {
	fill(this.color);
	noStroke();
	triangle(this.p1.x, this.p1.y,
		 this.p2.x, this.p2.y,
		 this.p3.x, this.p3.y)
    }
}


function randomColor() {
    var c = color(random(150, 255), 0, 0);
    return c;
}
