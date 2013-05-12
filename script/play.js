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

	this.draw = function(imageData, color, viewPos){
		var perspectiveFactor = (this.posZ - viewPos.z);
		var screenX = Math.floor((((this.posX - viewPos.x)/perspectiveFactor) * -viewPos.z) + viewPos.x);
		if (0 <= screenX && screenX < imageData.width){
			var screenY = Math.floor(((this.posY - viewPos.y)/perspectiveFactor) * -viewPos.z + viewPos.y);
		
			if (0 <= screenY && screenY < imageData.height) {
				var alpha = Math.floor(color[3]/(1 + offset.magnitude()/512));
				var xi = screenX * 4;
				var yi = screenY * (imageData.width * 4);
				
				
				imageData.data[xi + yi] = color[0];
				imageData.data[xi + yi + 1] = color[1];
				imageData.data[xi + yi + 2] = color[2];
				imageData.data[xi + yi + 3] = alpha;
			}
		}
	};

	this.transform = function(matrix){
		offset.transform(matrix);
		this.setPos();
	};

	this.setPos = function(){
		this.posX = this.center.x + this.offset.x;
		this.posY = this.center.y + this.offset.y;
		this.posZ = this.center.z + this.offset.z;
	};

	this.setPos();
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

var PointCloud = function(n, center, size){
	this.center = center;
	this.size = size;
	this.halfWidth = this.size.x/2;
	this.halfHeight = this.size.y/2;
	this.halfDepth = this.size.z/2;
	this.vertices = [];

	for (var i = n; i; i--) {
		this.vertices.push(new Vertex(center, 
							new Vector3D(	Math.random()*this.size.x - this.halfWidth,
											Math.random()*this.size.y - this.halfHeight,
											Math.random()*this.size.z - this.halfDepth)));
	}

	this.draw = function(imageData, color, viewPos){
		this.vertices.forEach(function(vertex){
			vertex.draw(imageData, color, viewPos);
		});
	};

	this.transform = function(matrix){
		this.vertices.forEach(function(point){
			point.transform(matrix);
		});
	};
};

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
	
	baseImageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height),
	imageData = baseImageData,
	blackScreen = [],
	
	pointCloud = new PointCloud(6400,	new Vector3D(imageData.width /2, imageData.height/2, 1000), 
										new Vector3D(6400,6400,6400)),


	angleZ = 3.14/170,
	angleY = 3.14/200,

	z = new Matrix([[Math.cos(angleZ),-Math.sin(angleZ),0],
					[Math.sin(angleZ),Math.cos(angleZ),0],
					[0,0,1]]),
	y = new Matrix([[Math.cos(angleY),0,Math.sin(angleY)],
					[0,1,0],
					[-Math.sin(angleY),0,Math.cos(angleY)]]),

	viewPos = new Vector3D(imageData.width/2, imageData.height/2, -300);

	

function draw() {
	context.clearRect(0, 0, imageData.width, imageData.height);
	imageData = context.getImageData(0, 0, imageData.width, imageData.height);
	pointCloud.draw(imageData, [255,255,255,255], viewPos);
	context.putImageData(imageData, 0, 0);
	pointCloud.transform(z);
	pointCloud.transform(y);
}

setInterval(draw, 45);