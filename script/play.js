var Matrix = function(data){
	this.data = data;

	this.rows = function(){
		return data.length;
	};

	this.columns = function(){
		return data.length >= 1 ? data[0].length : 0;
	};

	this.multiply = function(m2){
		var result = [[0,0,0],[0,0,0],[0,0,0]];
		result[0][0] += this.data[0][0]*m2.data[0][0] + this.data[0][1]*m2.data[1][0] + this.data[0][2]*m2.data[2][0];
		result[0][1] += this.data[0][0]*m2.data[0][1] + this.data[0][1]*m2.data[1][1] + this.data[0][2]*m2.data[2][1];
		result[0][2] += this.data[0][0]*m2.data[0][2] + this.data[0][1]*m2.data[1][2] + this.data[0][2]*m2.data[2][2];

		result[1][0] += this.data[1][0]*m2.data[0][0] + this.data[1][1]*m2.data[1][0] + this.data[1][2]*m2.data[2][0];
		result[1][1] += this.data[1][0]*m2.data[0][1] + this.data[1][1]*m2.data[1][1] + this.data[1][2]*m2.data[2][1];
		result[1][2] += this.data[1][0]*m2.data[0][2] + this.data[1][1]*m2.data[1][2] + this.data[1][2]*m2.data[2][2];

		result[2][0] += this.data[2][0]*m2.data[0][0] + this.data[2][1]*m2.data[1][0] + this.data[2][2]*m2.data[2][0];
		result[2][1] += this.data[2][0]*m2.data[0][1] + this.data[2][1]*m2.data[1][1] + this.data[2][2]*m2.data[2][1];
		result[2][2] += this.data[2][0]*m2.data[0][2] + this.data[2][1]*m2.data[1][2] + this.data[2][2]*m2.data[2][2];

		return new Matrix(result);
	};
};

var Vector3D = function(x, y, z) {
	this.transform = function(matrix){
		var result = [0,0,0],
		data = matrix.data;
		
		result[0] += data[0][0] * this.x;
		result[0] += data[0][1] * this.y;
		result[0] += data[0][2] * this.z;

		result[1] += data[1][0] * this.x;
		result[1] += data[1][1] * this.y;
		result[1] += data[1][2] * this.z;

		result[2] += data[2][0] * this.x;
		result[2] += data[2][1] * this.y;
		result[2] += data[2][2] * this.z;


		this.x = result[0];
		this.y = result[1];
		this.z = result[2];
	};

	this.normalize = function(){
		this.x = this.x/this.magnitude;
		this.y = this.y/this.magnitude;
		this.z = this.z/this.magnitude;
		this.magnitude = this.calcMagnitude();

		return this;
	};

	this.scale = function(scalar){
		this.x = this.x*scalar;
		this.y = this.y*scalar;
		this.z = this.z*scalar;
		this.magnitude = this.calcMagnitude();

		return this;
	};

	this.calcMagnitude = function(){
		return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
	};

	this.x = x || Math.random()*2-1;
	this.y = y || Math.random()*2-1;
	this.z = z || Math.random()*2-1;

	this.magnitude = this.calcMagnitude();
};

var Vertex = function(center, offset) {
	this.center = center;
	this.offset = offset;

	this.draw = function(imageData, color, viewPos){
		if(this.posZ < 0){
			return;
		}

		var width = imageData.width,
		data = imageData.data;
		var screenX = this.calcScreenCoord(this.posX, viewPos.x);
		if (0 >= screenX || screenX > width){
			return;
		}
			
			var screenY = this.calcScreenCoord(this.posY, viewPos.y);
			if (0 >= screenY || screenY > imageData.height){
				return;
			}

			this.r = color[0];
			this.g = color[1];
			this.b = color[2];
			this.alpha = this.alpha || Math.floor(color[3] - (this.magnitude*200/683));

			var xi = screenX * 4;
			var yi = screenY * (width * 4);

			data[xi + yi] = this.r;
			data[xi + yi + 1] = this.g;
			data[xi + yi + 2] = this.b;
			data[xi + yi + 3] = this.alpha;
	};

	this.calcScreenCoord = function(pos, viewpos){
		return Math.floor(((pos - viewpos)/(this.posZ - viewPos.z)) * -viewPos.z + viewpos);
	};

	this.transform = function(matrix){
		offset.transform(matrix);
		this.posX = this.center.x + this.offset.x;
		this.posY = this.center.y + this.offset.y;
		this.posZ = this.center.z + this.offset.z;
		this.magnitude = offset.magnitude;
		return this;
	};

	this.posX = this.center.x + this.offset.x;
	this.posY = this.center.y + this.offset.y;
	this.posZ = this.center.z + this.offset.z;
	this.magnitude = offset.magnitude;
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
		return this;
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
		this.vertices.push(new Vertex(center,new Vector3D().normalize().scale(Math.random()*this.halfWidth)
											));
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
		return this;
	};
};

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),

    baseImageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height),
	imageData = baseImageData,
	blackScreen = [],

	tmpsina, tmpsinc, tmpsine,


	angleX = Math.PI/128
	angleY = Math.PI/512,
	angleZ = Math.PI/256,

	x = new Matrix([[1,0,0],
					[0, Math.cos(angleX),-Math.sin(angleX)],
					[0, Math.sin(angleX),Math.cos(angleX),0]]),
	y = new Matrix([[Math.cos(angleY),0,Math.sin(angleY)],
					[0,1,0],
					[-Math.sin(angleY),0,Math.cos(angleY)]]),
	z = new Matrix([[Math.cos(angleZ),-Math.sin(angleZ),0],
					[Math.sin(angleZ),Math.cos(angleZ),0],
					[0,0,1]]),
	rotationMatrix = x.multiply(y).multiply(z),
	sina = 1, cosa=0, sinb = Math.sin(Math.PI/67), cosb=Math.cos(Math.PI/67);
	sinc = 1, cosc=0, sind = Math.sin(Math.PI/41), cosd=Math.cos(Math.PI/41);
	sine = 1, cose=0, sinf = Math.sin(Math.PI/7), cosf=Math.cos(Math.PI/7),

	pointCloud = new PointCloud(16000,	new Vector3D(imageData.width /2, imageData.height/2, 600),
										new Vector3D(1024,1024,1024)),

	viewPos = new Vector3D(imageData.width/2, imageData.height/2, -1024);


function draw() {
	context.clearRect(0, 0, imageData.width, imageData.height);
	imageData = context.getImageData(0, 0, imageData.width, imageData.height);
	//pointCloud.draw(imageData, [(127*(1+sina))|0,(127*(1+sinc))|0,(127*(1+sine))|0,255], viewPos);
	pointCloud.draw(imageData, [255,127,255, 255], viewPos);
	context.putImageData(imageData, 0, 0);
	pointCloud.transform(rotationMatrix);

	// tmpsina = sina*cosb+cosa*sinb;
	// cosa = cosa*cosb - sina*sinb;
	// sina = tmpsina;
	
	// tmpsinc = sinc*cosd+cosc*sind;
	// cosc = cosc*cosd - sinc*sind;
	// sinc = tmpsinc;

	// tmpsine = sine*cosf+cose*sinf;
	// cose = cose*cosf - sine*sinf;
	// sine = tmpsine;

	//console.log(sina);
	setTimeout(draw, 0);
}

draw();