(function () {
    var lastTime = 0,
    	vendors = ['ms', 'moz', 'webkit', 'o'],
    	x;
    for (x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelRequestAnimationFrame = window[vendors[x]+
          'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

var Matrix = function(data){
	this.data = data;
};

Matrix.prototype = {
	rows: function(){
		return this.data.length;
	},

	columns: function(){
		return this.data.length >= 1 ? this.data[0].length : 0;
	},

	multiply: function(m2){
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
	}
};

var Vector3D = function(components) {

	this.components = components;
	this.components[0] = components[0] || Math.random()*2-1;
	this.components[1] = components[1] || Math.random()*2-1;
	this.components[2] = components[2] || Math.random()*2-1;

	this.magnitude = this.calcMagnitude();
};

Vector3D.prototype = {
	transform: function(matrix){
		var result = new Float64Array([0,0,0]),
		data = matrix.data;

		result[0] += data[0][0] * this.components[0];
		result[0] += data[0][1] * this.components[1];
		result[0] += data[0][2] * this.components[2];

		result[1] += data[1][0] * this.components[0];
		result[1] += data[1][1] * this.components[1];
		result[1] += data[1][2] * this.components[2];

		result[2] += data[2][0] * this.components[0];
		result[2] += data[2][1] * this.components[1];
		result[2] += data[2][2] * this.components[2];


		this.components[0] = result[0];
		this.components[1] = result[1];
		this.components[2] = result[2];
	},

	normalize: function(){
		this.components[0] = this.components[0]/this.magnitude;
		this.components[1] = this.components[1]/this.magnitude;
		this.components[2] = this.components[2]/this.magnitude;
		this.magnitude = calcMagnitude();

		return this;
	},

	scale: function(scalar){
		this.components[0] = this.components[0]*scalar;
		this.components[1] = this.components[1]*scalar;
		this.components[2] = this.components[2]*scalar;
		this.magnitude = calcMagnitude();

		return this;
	},

	calcMagnitude: function(){
		return Math.sqrt((this.components[0] * this.components[0]) + (this.components[1] * this.components[1]) + (this.components[2] * this.components[2]));
	}	
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
					models.push(new Model3D(objPos, vertexdata, faces, vcount, descriptor.name, drawLine));
				});
			drawLine = null;
			objPos = null;
			callback(models);
		};
		r.readAsText(file);
	} else {
		alert("Failed to load file");
	}
};

var Model3D = function(position, vertices, faces, perfacevertexcount, name, drawLine){
	this.name = name;
	this.position = position;
	this.vertices = vertices;
	this.faces = faces;
	this.perfacevertexcount = perfacevertexcount;
	this.drawLine = drawLine;
};

Model3D.prototype = {
	draw: function(color, viewPos){
		var vertices = this.vertices,
		face,
		faceStartIndex = 0,
		vertexcount,
		vertexcountindex = 0,
		faceEndIndex,
		faceslength = this.faces.length;

		do{
			vertexcount = this.perfacevertexcount[vertexcountindex++];
			faceEndIndex = faceStartIndex + vertexcount;
			face = this.faces.subarray(faceStartIndex, faceEndIndex);
			faceStartIndex = faceEndIndex;
			this.drawFace(face, vertexcount, color, viewPos);
		} while(faceStartIndex < faceslength);
		vertices = null;
		faceslength = null;
	},

	drawFace: function(face, count, color, viewPos){
		var offset = this.position.components,
		view = viewPos.components,
		viewPosX = view[0],
		viewPosY = view[1],
		viewPosZ = view[2],
		width = imageData.width,
		data = imageData.data,
		screenX,
		screenY,
		deltaZ,
		x,
		y,
		z,
		xi,
		yi,
		faceIndex,
		screenPoints = new Uint16Array(count*2),
		currentPointIndex=0,
		currentCoordinateIndex=0,
		noPoints,
		line = this.drawLine;

		for (var i = count - 1; i >= 0; i--) {
			faceIndex = face[i]*3;
			x = offset[0] + this.vertices[faceIndex];
			y = offset[1] - this.vertices[faceIndex + 1];
			z = offset[2] + this.vertices[faceIndex + 2];

			if(z < 0){
				return;
			}
			
			deltaZ = z - viewPosZ;
			screenX = Math.floor(((x - viewPosX)/deltaZ) * -viewPosZ + viewPosX);
			if (0 >= screenX || screenX > width){
				return;
			}
			screenY = Math.floor(((y - viewPosY)/deltaZ) * -viewPosZ + viewPosY);
			if (0 >= screenY || screenY > imageData.height){
				return;
			}

			screenPoints[currentCoordinateIndex++] = screenX;
			screenPoints[currentCoordinateIndex++] = screenY;
			if (++currentPointIndex !==1) {
				line(screenPoints.subarray(currentCoordinateIndex - 4, currentCoordinateIndex), imageData, color);
			}
		}
		if(currentPointIndex > 1 && currentCoordinateIndex === screenPoints.length){
			currentCoordinateIndex-=2;
			line(new Uint16Array([
				screenPoints[currentCoordinateIndex++],
				screenPoints[currentCoordinateIndex],
				screenPoints[0],screenPoints[1]]), imageData, color);
		}

		offset = null;
		view = null;
		width = null;
		data = null;
		screenPoints = null;
		line = null;
	},

	transform: function(matrix){
		var index = 0,
		endindex,
		vertices = this.vertices,
		verticeslength = this.vertices.length,
		transformVertex = this.transformVertex;

		do{
			endindex = index + 3;
			vertex = vertices.subarray(index, endindex);
			index = endindex;
			transformVertex(vertex, matrix);
		} while(index < verticeslength);
	},
	transformVertex: function(vertex, matrix){
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
	}
};


var canvas = document.getElementById('canvas'),
context = canvas.getContext('2d'),

baseImageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height),
imageData = baseImageData,
blackScreen = [],

tmpsina, tmpsinc, tmpsine,
drawLine = DOK.drawLine,

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
	objPos = new Vector3D(new Float64Array([400,400,600])),
	viewPos = new Vector3D(new Float64Array([imageData.width/2, imageData.height/2, -1024]));
	DOK.drawLine = null;
	DOK = null;


	function draw(model) {
		var width = imageData.width,
			height = imageData.height;
		requestAnimationFrame(function(){draw(model);});
		context.clearRect(0, 0, width, height);
		//imageData = context.getImageData(0, 0, width, height);
		model.draw(color, viewPos);
		model.transform(rotationMatrix);
		context.putImageData(imageData, 0, 0);		
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
			if (models && models.length === 1) {
				draw(models[0]);
			};
		});
		break;
	}
}


//draw();
