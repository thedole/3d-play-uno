var Vector = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;

	this.magnitude = function(){
		return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
	};
};

var Vertex = function(center, offset) {
	this.center = center;
	this.offset = offset;

	this.draw = function(imageData, color, viewDistance){
		viewDistance = viewDistance || 300;
		var posX = this.center.x + this.offset.x;
		var posY = this.center.y + this.offset.y;
		var posZ = this.center.z + this.offset.z;
		var perspectiveFactor = (posZ + viewDistance);
		var screenX = Math.floor((((posX - imageData.width/2)/perspectiveFactor) * viewDistance) + imageData.width/2);
		var screenY = Math.floor(((posY - imageData.height/2)/perspectiveFactor) * viewDistance + imageData.height/2);
		var xi = screenX * 4;
		var yi = screenY * (imageData.width * 4);
		
		imageData.data[xi + yi] = color[0];
		imageData.data[xi + yi + 1] = color[1];
		imageData.data[xi + yi + 2] = color[2];
		imageData.data[xi + yi + 3] = color[3];
	};
};



var Cuboid = function(center, size){
	this.center = center;
	this.size = size;
	this.halfWidth = this.size.x/2;
	this.halfHeight = this.size.y/2;
	this.halfDepth = this.size.z/2;
	this.vertices = [];

	this.draw = function (imageData, color) {
		for (var i = this.vertices.length - 1; i >= 0; i--) {
			this.vertices[i].draw(imageData, color);
		}
	};

	this.initializeVertices = function(){
		this.vertices.push(new Vertex(center, new Vector(-this.halfWidth, -this.halfHeight, -this.halfDepth)));
		this.vertices.push(new Vertex(center, new Vector(-this.halfWidth, -this.halfHeight, +this.halfDepth)));
		this.vertices.push(new Vertex(center, new Vector(-this.halfWidth, this.halfHeight, -this.halfDepth)));
		this.vertices.push(new Vertex(center, new Vector(-this.halfWidth, this.halfHeight, this.halfDepth)));

		this.vertices.push(new Vertex(center, new Vector(this.halfWidth, -this.halfHeight, -this.halfDepth)));
		this.vertices.push(new Vertex(center, new Vector(this.halfWidth, -this.halfHeight, this.halfDepth)));
		this.vertices.push(new Vertex(center, new Vector(this.halfWidth, this.halfHeight, -this.halfDepth)));
		this.vertices.push(new Vertex(center, new Vector(this.halfWidth, this.halfHeight, this.halfDepth)));
	};

	this.initializeVertices();
};

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
var imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);

var cuboid = new Cuboid(new Vector(imageData.width/2, imageData.height/2, 300), 
						new Vector(250, 250, 250));

cuboid.draw(imageData, [200,200,200,255]);
context.putImageData(imageData, 0, 0);