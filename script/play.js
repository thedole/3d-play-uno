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

var ModelDescription = function(name){
	this.name = name,
	this.vertices = [];
	this.vertexnormals = [];
	this.faces = [];
	this.perfacevertexcount = [];
	this.facenormals = [];
	this.material = '';
};

var ObjModelReader = function(file, callback){
	var that = this,
	models = [],
	modeldescriptors = [],
	mtllib = '',
	lineHandlers = {
		'#': function(){return;},
		'mtllib': function(name){this.mtllib = name;},
		'o': function(name){modeldescriptors.push(new ModelDescription(name));},
		'v': function(x, y, z){
			if(!modeldescriptors.length){
				return;
			}
			modeldescriptors[modeldescriptors.length - 1].vertices.push([x, y, z]);
		},
		'usemtl': function(name){
			if(!modeldescriptors.length){
				return;
			}
			modeldescriptors[modeldescriptors.length - 1].material = name;
		},
		'f': function(){
			if(!modeldescriptors.length){
				return;
			}
			var vertices = [];
			Array.prototype.forEach.call(arguments, function(vertexindex){
				vertexindex = vertexindex < 0 ? 
					modeldescriptors[modeldescriptors.length - 1].vertices.length + vertexindex
					: vertexindex - 1;
				vertices.push(vertexindex);
			});
			modeldescriptors[modeldescriptors.length - 1].faces.push(vertices);
			modeldescriptors[modeldescriptors.length - 1].perfacevertexcount.push(vertices.length);
		}
	};

	this.getModels = function(){
		return models;
	};

	if (file) {
		var r = new FileReader();
		r.onload = function(e) {
			var contents = e.target.result.match(/^.*$/gm);
			contents.forEach(
				function(line){
					var parts = line.split(/\s+/),
					keyword = parts.shift();
					if(!lineHandlers.hasOwnProperty(keyword)){
						return;
					}

					lineHandlers[keyword].apply(that, parts);
				}
				);
			modeldescriptors.forEach(
				function(descriptor){
					var vertexdata = new Float64Array([].concat.apply([], descriptor.vertices));
					var faces = new Uint16Array([].concat.apply([], descriptor.faces));
					var vcount = new Uint8Array(descriptor.perfacevertexcount);
					models.push(new Model3D([0,0,0], vertexdata, faces, vcount, descriptor.name));
				});
			callback(models);
		};
		r.readAsText(file);
	} else {
		alert("Failed to load file");
	}
};

var Model3D = function(position, vertices, faces, perfacevertexcount, name){
	this.name = name;
	this.position = position;
	this.vertices = vertices;
	this.faces = faces;
	this.perfacevertexcount = perfacevertexcount;

	this.draw = function(imageData, color, viewPos){
		var vertices = this.vertices,
		face,
		faceStartIndex = 0,
		vertexcount,
		vertexcountindex = 0,
		faceEndIndex,
		faceslength = this.faces.length;

		do{
			vertexcount = perfacevertexcount[vertexcountindex++];
			faceEndIndex = faceStartIndex + vertexcount;
			face = faces.subarray(faceStartIndex, faceEndIndex);
			faceStartIndex = faceEndIndex;
			this.drawFace(face, vertexcount, imageData, color, viewPos);
		} while(faceStartIndex < faceslength);
	};

	this.drawFace = function(face, count, imageData, color, viewPos){
		var offset = this.position,
		width = imageData.width,
		data = imageData.data,
		screenX,
		screenY,
		x,
		y,
		z,
		xi,
		yi;

		for (var i = count - 1; i >= 0; i--) {
			x = offset.x + this.vertices[face[i]*3];
			y = offset.y + this.vertices[face[i]*3 + 1];
			z = offset.z + this.vertices[face[i]*3 + 2];

			if(z < 0){
				return;
			}

			screenX = this.calcScreenCoord(z, x, viewPos.x);
			if (0 >= screenX || screenX > width){
				return;
			}
			screenY = this.calcScreenCoord(z, y, viewPos.y);
			if (0 >= screenY || screenY > imageData.height){
				return;
			}

			this.r = color[0];
			this.g = color[1];
			this.b = color[2];
			this.alpha = color[3];

			xi = screenX * 4;
			yi = screenY * (width * 4);

			data[xi + yi] = this.r;
			data[xi + yi + 1] = this.g;
			data[xi + yi + 2] = this.b;
			data[xi + yi + 3] = this.alpha;
			//console.log('x: ' + screenX + ' y: ' + screenY);
		}
	};

	this.calcScreenCoord = function(z, pos, viewpos){
		return Math.floor(((pos - viewpos)/(z - viewPos.z)) * -viewPos.z + viewpos);
	};

	this.transform = function(matrix){
		var index = 0,
		endindex,
		verticeslength = this.vertices.length;

		do{
			endindex = index + 3;
			vertex = vertices.subarray(index, endindex);
			index = endindex;
			this.transformVertex(vertex, matrix);
		} while(index < verticeslength);
	};
	this.transformVertex = function(vertex, matrix){
		var result = new Float64Array([0,0,0]);
		data = matrix.data;

		result[0] += data[0][0] * vertex[0];
		result[0] += data[0][1] * vertex[1];
		result[0] += data[0][2] * vertex[2];

		result[1] += data[1][0] * vertex[0];
		result[1] += data[1][1] * vertex[1];
		result[1] += data[1][2] * vertex[2];

		result[2] += data[2][0] * vertex[0];
		result[2] += data[2][1] * vertex[1];
		result[2] += data[2][2] * vertex[2];

		vertex[0] = result[0];
		vertex[1] = result[1];
		vertex[2] = result[2];
		return vertex;
	};
};


var canvas = document.getElementById('canvas'),
context = canvas.getContext('2d'),

baseImageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height),
imageData = baseImageData,
blackScreen = [],

tmpsina, tmpsinc, tmpsine,


angleX = Math.PI/128,
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
	// sina = 1, cosa=0, sinb = Math.sin(Math.PI/67), cosb=Math.cos(Math.PI/67);
	// sinc = 1, cosc=0, sind = Math.sin(Math.PI/41), cosd=Math.cos(Math.PI/41);
	// sine = 1, cose=0, sinf = Math.sin(Math.PI/7), cosf=Math.cos(Math.PI/7),
	modelDescription = {
		name: 'testCube',
		vertices: []
	},
	color = [0,0,0, 255],
	viewPos = new Vector3D(imageData.width/2, imageData.height/2, -1024);


	function draw(models) {
		context.clearRect(0, 0, imageData.width, imageData.height);
		imageData = context.getImageData(0, 0, imageData.width, imageData.height);
		models.forEach(
			function(model){
				model.position = new Vector3D(400,400,400);
				model.draw(imageData, color, viewPos);
				model.transform(rotationMatrix);
			}
			);
		context.putImageData(imageData, 0, 0);
		setTimeout(function(){draw(models);}, 30);
	}

	var model,
	inputElement = document.getElementById("fileselector");
	inputElement.addEventListener("change", loadmodel, false);
	function loadmodel(event) {
		var fileList = event.target.files,
		file,
		extension,
		model,
		reader;

		/* now you can work with the file list */
		if (!fileList || Object.prototype.toString.call(fileList) !== '[object FileList]'){
			return;
		}
	// May need to change this later for loading materials as well
	if(fileList.length !== 1){
		return;
	}

	file = fileList[0];
	extension = file.name.split('.').pop();
	if(!extension){
		return;
	}

	switch(extension){
		case 'obj':
		reader = new ObjModelReader(file, function(models){
			draw(models);
		});
		break;
	}
}


//draw();
