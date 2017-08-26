function translate(x, start1, end1, start2, end2) {
    var width1 = end1 - start1;
    var width2 = end2 - start2;
    return x * width2/width1;
}


var footer = document.querySelector("footer");

addEventListener("scroll", function() {
    var bottom = document.body.scrollHeight - innerHeight;
    var appearancePoint = bottom - 250;
    var opacity = translate(max(pageYOffset, appearancePoint) - appearancePoint,
			    appearancePoint, bottom,
			    0, 1);
    footer.style.opacity = opacity;
});
