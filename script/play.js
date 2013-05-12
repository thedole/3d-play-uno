var Vertex = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;

	this.draw = function(imageData, color){
		imageData.data[(x*4) + (y * (imageData.width * 4))] = color[0];
		imageData.data[(x*4) + (y * (imageData.width * 4)) + 1] = color[1];
		imageData.data[(x*4) + (y * (imageData.width * 4)) + 2] = color[2];
		imageData.data[(x*4) + (y * (imageData.width * 4)) + 3] = color[3];
	};
};

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

context.font = '38pt Arial';
context.fillStyle = 'cornflowerblue';
context.strokeStyle = 'blue';

context.fillText("Hello Canvas", canvas.width/2 - 150,
                                 canvas.height/2 + 15);

context.strokeText("Hello Canvas", canvas.width/2 - 150,
                                   canvas.height/2 + 15);
var imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);

var pixels = [];
for (var i = 99; i; i--) {
	pixels.push(new Vertex(i, i));
}

for (var i = pixels.length - 1; i; i--) {
	pixels[i].draw(imageData, [200,200,200,255]);
}

context.putImageData(imageData, 0, 0);