var Matrix = function(data){
	this.data = data;

	this.rows = function(){
		return data.length;
	};

	this.columns = function(){
		return data.length >= 1 ? data[0].length : 0;
	};
};

var Vector3D = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;

	this.magnitude = function(){
		return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
	};

	this.transform = function(matrix){
		var n = 3;
		var result = [0,0,0];
		for (var row = 0; row < n; row++) {
				result[row] += matrix.data[row][0] * this.x;
				result[row] += matrix.data[row][1] * this.y;
				result[row] += matrix.data[row][2] * this.z;
		};

		this.x = result[0];
		this.y = result[1];
		this.z = result[2];
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

	this.transform = function(matrix){
		offset.transform(matrix);
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
		this.vertices.push(new Vertex(center, new Vector3D(-this.halfWidth, -this.halfHeight, -this.halfDepth)));
		this.vertices.push(new Vertex(center, new Vector3D(-this.halfWidth, -this.halfHeight, +this.halfDepth)));
		this.vertices.push(new Vertex(center, new Vector3D(-this.halfWidth, this.halfHeight, -this.halfDepth)));
		this.vertices.push(new Vertex(center, new Vector3D(-this.halfWidth, this.halfHeight, this.halfDepth)));

		this.vertices.push(new Vertex(center, new Vector3D(this.halfWidth, -this.halfHeight, -this.halfDepth)));
		this.vertices.push(new Vertex(center, new Vector3D(this.halfWidth, -this.halfHeight, this.halfDepth)));
		this.vertices.push(new Vertex(center, new Vector3D(this.halfWidth, this.halfHeight, -this.halfDepth)));
		this.vertices.push(new Vertex(center, new Vector3D(this.halfWidth, this.halfHeight, this.halfDepth)));
	};

	this.transform = function(matrix){
		this.vertices.forEach(function(vertex){
			vertex.transform(matrix);
		});
	};

	this.initializeVertices();
};

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
var imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);

var cuboid = new Cuboid(new Vector3D(imageData.width/2, imageData.height/2, 300), 
						new Vector3D(250, 250, 250));

var angleZ = 3.14/18;
var angleY = 3.14/5;

var z = new Matrix([[Math.cos(angleZ),-Math.sin(angleZ),0],
					[Math.sin(angleZ),Math.cos(angleZ),0],
					[0,0,1]]);

var y = new Matrix([[Math.cos(angleY),0,Math.sin(angleY)],
					[0,1,0],
					[-Math.sin(angleY),0,Math.cos(angleY)]]);

function draw() {
	cuboid.draw(imageData, [200,200,200,255]);
	cuboid.transform(z);
	cuboid.transform(y);
	context.putImageData(imageData, 0, 0);
}

setInterval(draw, 30);