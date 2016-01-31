(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**********************************************
	Line Drawing function that uses Bresenham
	Line Drawing algorithm.
 **********************************************/
module.exports =
(function(){
	var x1 = 0,
	y1 = 1,
	x2 = 2,
	y2 = 3;



	function drawHorizontal(pos, screenBuffer, color, deltaX){
		var iterations = (deltaX / 8) | 0,
		rest = deltaX % 8,
		i = 0;

		if (rest > 0) {
			do{
				screenBuffer[pos++] = color[0];
				screenBuffer[pos++] = color[1];
				screenBuffer[pos++] = color[2];
				screenBuffer[pos++] = color[3];
			} while (--rest > 0);
		}

		if(iterations === 0){
			return;
		}

		do{
		// 1
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos++] = color[3];


		// 2
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos++] = color[3];

		// 3
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos++] = color[3];

		// 4
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos++] = color[3];

		// 5
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos++] = color[3];

		// 6
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos++] = color[3];

		// 7
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos++] = color[3];

		// 8
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos++] = color[3];
	} while(--iterations > 0);
}

function drawVertical(pos, screenBuffer, color, deltaY, width){
	var iterations = (deltaY / 8) | 0,
	rest = deltaY % 8,
	increment = width * 4 - 3;
	i = 0;

	if (rest > 0) {
		do{
			screenBuffer[pos++] = color[0];
			screenBuffer[pos++] = color[1];
			screenBuffer[pos++] = color[2];
			screenBuffer[pos] = color[3];
			pos += increment;
		} while (--rest > 0);
	}

	if(iterations === 0){
		return;
	}

	do{
		// 1
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += increment;


		// 2
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += increment;

		// 3
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += increment;

		// 4
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += increment;

		// 5
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += increment;

		// 6
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += increment;

		// 7
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += increment;

		// 8
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += increment;
	} while(--iterations > 0);
}

function drawShallow(pos, screenBuffer, color, deltaX, deltaY, absX, absY, width, deltaError){
	var iterations = (absX >> 3) | 0,
	rest = absX % 8,
	incrementX = deltaX > 0 ? 1 : -7,
	incrementY = deltaY > 0 ? (width * 4) : (width * -4),
	error = 0;

	if (rest > 0) {
		do{
			error += deltaError;
			if (error > 0.5) {
				pos += incrementY;
				error--;
			}
			screenBuffer[pos++] = color[0];
			screenBuffer[pos++] = color[1];
			screenBuffer[pos++] = color[2];
			screenBuffer[pos] = color[3];
			pos += incrementX;
		} while (--rest > 0);
	}

	if(iterations === 0){
		return;
	}

	do{
		// 1
		error += deltaError;
		if (error > 0.5) {
			pos += incrementY;
			error--;
		}
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += incrementX;


		// 2
		error += deltaError;
		if (error > 0.5) {
			pos += incrementY;
			error--;
		}
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += incrementX;

		// 3
		error += deltaError;
		if (error > 0.5) {
			pos += incrementY;
			error--;
		}
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += incrementX;

		// 4
		error += deltaError;
		if (error > 0.5) {
			pos += incrementY;
			error--;
		}
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += incrementX;

		// 5
		error += deltaError;
		if (error > 0.5) {
			pos += incrementY;
			error--;
		}
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += incrementX;

		// 6
		error += deltaError;
		if (error > 0.5) {
			pos += incrementY;
			error--;
		}
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += incrementX;

		// 7
		error += deltaError;
		if (error > 0.5) {
			pos += incrementY;
			error--;
		}
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += incrementX;

		// 8
		error += deltaError;
		if (error > 0.5) {
			pos += incrementY;
			error--;
		}
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += incrementX;
	} while(--iterations > 0);
}

function drawSteep(pos, screenBuffer, color, deltaX, deltaY, absX, absY, width, deltaError){
	var iterations = (absY >> 3) | 0,
	rest = absY % 8,
	incrementX = deltaX > 0 ? 4 : -4,
	incrementY = deltaY > 0 ? (width * 4 - 3) : (width * -4 - 3),
	error = 0;

	if (rest > 0) {
		do{
			error += deltaError;
			if (error > 0.5) {
				pos += incrementX;
				error--;
			}
			screenBuffer[pos++] = color[0];
			screenBuffer[pos++] = color[1];
			screenBuffer[pos++] = color[2];
			screenBuffer[pos] = color[3];
			pos += incrementY;
		} while (--rest > 0);
	}

	if(iterations === 0){
		return;
	}

	do{
		// 1
		error += deltaError;
		if (error > 0.5) {
			pos += incrementX;
			error--;
		}
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += incrementY;


		// 2
		error += deltaError;
		if (error > 0.5) {
			pos += incrementX;
			error--;
		}
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += incrementY;

		// 3
		error += deltaError;
		if (error > 0.5) {
			pos += incrementX;
			error--;
		}
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += incrementY;

		// 4
		error += deltaError;
		if (error > 0.5) {
			pos += incrementX;
			error--;
		}
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += incrementY;

		// 5
		error += deltaError;
		if (error > 0.5) {
			pos += incrementX;
			error--;
		}
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += incrementY;

		// 6
		error += deltaError;
		if (error > 0.5) {
			pos += incrementX;
			error--;
		}
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += incrementY;

		// 7
		error += deltaError;
		if (error > 0.5) {
			pos += incrementX;
			error--;
		}
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += incrementY;

		// 8
		error += deltaError;
		if (error > 0.5) {
			pos += incrementX;
			error--;
		}
		screenBuffer[pos++] = color[0];
		screenBuffer[pos++] = color[1];
		screenBuffer[pos++] = color[2];
		screenBuffer[pos] = color[3];
		pos += incrementY;
	} while(--iterations > 0);
}

return function drawLine(coordinates, imageData, color){
	var screenBuffer = imageData.data,
	deltaY = coordinates[y2] - coordinates[y1],
	deltaX = coordinates[x2] - coordinates[x1],
	width = imageData.width,
	deltaError,
	absX,
	absY,
	startX,
	startY;

			// Line is horizontal
			if (deltaY === 0) {

				// Line is Left -> Right
				if (deltaX > 0) {
					drawHorizontal(coordinates[x1] * 4 + coordinates[y1] * (width * 4), screenBuffer, color, deltaX);
					return;
				}

				// Line is Right -> Left
				if(deltaX < 0){
					drawHorizontal(coordinates[x2] * 4 + coordinates[y2] * (width * 4), screenBuffer, color, -deltaX);
					return;
				}

				// Coordinates are a single dot.
				if(deltaX === 0) {
					pos = coordinates[x1] * 4 +coordinates[y1] * (width* 4);
					screenBuffer[pos++] = color[0];
					screenBuffer[pos++] = color[1];
					screenBuffer[pos++] = color[2];
					screenBuffer[pos++] = color[3];
					return;
				}
			}

			// Line is vertical
			if (deltaX === 0) {

				// Line is Top -> Bottom
				if (deltaY > 0) {
					width = imageData.width;
					drawVertical(coordinates[x1] * 4 + coordinates[y1] * (width * 4), screenBuffer, color, deltaY, width);
					return;
				}

				// Line is Bottom -> Top
				if(deltaY < 0){
					drawVertical(coordinates[x2] * 4 + coordinates[y2] * (width * 4), screenBuffer, color, -deltaY, width);
					return;
				}

				// Coordinates are a single dot.
				if(deltaX === 0) {
					pos = coordinates[x1] * 4 +coordinates[y1] * (width * 4);
					screenBuffer[pos++] = color[0];
					screenBuffer[pos++] = color[1];
					screenBuffer[pos++] = color[2];
					screenBuffer[pos++] = color[3];
					return;
				}
			}


			absX = Math.abs(deltaX);
			absY = Math.abs(deltaY);
			startX = coordinates[x1];
			startY = coordinates[y1];
			width = imageData.width;

			// Octant 0, 3, 4, 7
			if (absX > absY) {
				deltaError = absY/absX;
				drawShallow(startX * 4 + startY * (width * 4), screenBuffer, color, deltaX, deltaY, absX, absY, width, deltaError);
				return;
			}
			else{
				deltaError = absX/absY;
				drawSteep(startX * 4 + startY * (width * 4), screenBuffer, color, deltaX, deltaY, absX, absY, width, deltaError);
				return;
			}
		screenBuffer = null;	
		};
	})();

},{}],2:[function(require,module,exports){
module.exports = (function(){
  var matrixPrototype = {
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

  		return create3x3Matrix(result);
  	}
  },
  create3x3Matrix = function(data){
    return Object.create(matrixPrototype, {
        data: {
          enumerable: true,
          writable: true,
          value: data
        }
      });
  };

  return {
    create3x3: create3x3Matrix,
    prototype: matrixPrototype
  };
})();

},{}],3:[function(require,module,exports){
module.exports = (function(){
var
	dokdraw = require('./dok-draw'),
	model3DPrototype = {
	draw: function(color, viewPos, imageData){
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
			this.drawFace(face, vertexcount, color, viewPos, imageData);
		} while(faceStartIndex < faceslength);
		vertices = null;
		faceslength = null;
	},

	drawFace: function(face, count, color, viewPos, imageData){
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
		line = dokdraw;

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
},

model3DCreate = function(
	position,
	vertices,
	faces,
	perfacevertexcount,
	name,
	drawLine)
	{
		var model = Object.create(model3DPrototype, {
			name: {
				enumerable: true,
				writable: true,
				value: name
			},
			position: {
				enumerable: true,
				writable: true,
				value: position
			},
			vertices: {
				enumerable: true,
				writable: true,
				value: vertices
			},
			faces: {
				enumerable: true,
				writable: true,
				value: faces
			},
			perfacevertexcount: {
				enumerable: true,
				writable: true,
				value: perfacevertexcount
			},
			drawLine: {
				enumerable: true,
				writable: true,
				value: drawLine || dokdraw
			}
		});

		return model;
};

return {
	create: model3DCreate,
	prototype: model3DPrototype
};
})();

},{"./dok-draw":1}],4:[function(require,module,exports){
module.exports = (function(){
  return {
    create: function(name){
      return {
        name: name,
        vertices: [],
      	vertexnormals: [],
      	faces: [],
      	perfacevertexcount: [],
      	facenormals: [],
      	material: ''
      }
    }
  }
})();

},{}],5:[function(require,module,exports){
module.exports = (function(){
  var
    modelFactory = require('./model3d'),
    descriptorFactory = require('./modeldescription'),
    modelReaderPrototype = {
    lineHandlers: {
  		'#': () => '',
  		'mtllib': function(name){this.mtllib = name;},
  		'o': function(name){this.modeldescriptors.push(descriptorFactory.create(name));},
  		'v': function(x, y, z){
  			if(!this.modeldescriptors.length){
  				return;
  			}
  			this.modeldescriptors[this.modeldescriptors.length - 1].vertices.push([x, y, z]);
  		},
  		'usemtl': function(name){
  			if(!this.modeldescriptors.length){
  				return;
  			}
  			this.modeldescriptors[this.modeldescriptors.length - 1].material = name;
  		},
  		'f': function(){
  			if(!this.modeldescriptors.length){
  				return;
  			}
  			var vertices = [];
  			Array.prototype.forEach.call(arguments, function(vertexindex){
  				vertexindex = vertexindex < 0 ?
  					this.modeldescriptors[this.modeldescriptors.length - 1].vertices.length + vertexindex
  					: vertexindex - 1;
  				vertices.push(vertexindex);
  			});
  			this.modeldescriptors[this.modeldescriptors.length - 1].faces.push(vertices);
  			this.modeldescriptors[this.modeldescriptors.length - 1].perfacevertexcount.push(vertices.length);
  		}
  	},

    getModels: function(){
  		return this.models;
  	},

    readFile: function(file, callback){
      if (file) {
    		var modelReader = this,
            lineHandlers = modelReader.lineHandlers,
            modeldescriptors = modelReader.modeldescriptors,
            models = modelReader.models,
            objPos = modelReader.objPos,
            r = new FileReader();

    		r.addEventListener('load', function(e) {
    			var contents = e.target.result.match(/^.*$/gm);
    			contents.forEach(
    				(line) => {
    					var parts = line.split(/\s+/),
    					keyword = parts.shift();
    					if(!lineHandlers.hasOwnProperty(keyword)){
    						return;
    					}

              lineHandlers[keyword].apply(modelReader, parts);
    				});

          modeldescriptors.forEach(
    				function(descriptor){
    					var vertexdata = new Float64Array([].concat.apply([], descriptor.vertices));
    					var faces = new Uint16Array([].concat.apply([], descriptor.faces));
    					var vcount = new Uint8Array(descriptor.perfacevertexcount);
              var model = modelFactory.create(objPos, vertexdata, faces, vcount, descriptor.name);
              models.push(model);
  				});

          if(callback && typeof callback === 'function'){
    			  callback(models);
          }
    		}, false);

    		r.readAsText(file);
    	} else {
        var error = {message: 'File is missing'};
        if(callback && typeof callback === 'function'){
          callback(null, error);
        }
        else
        {
            throw error;
        }
    	}
    }
  },

  createModelReader = function(position){
    return Object.create(modelReaderPrototype, {
      models: {
        enumerable: true,
				writable: true,
				value: []
        },
      modeldescriptors: {
        enumerable: true,
				writable: true,
				value: []
      },
      mtllib: {
        enumerable: true,
				writable: true,
				value: ''
      },
      objPos: {
        enumerable: true,
        writable: true,
        value: position
      }
    });
  }

  return {
    create: createModelReader
  }
})();

},{"./model3d":3,"./modeldescription":4}],6:[function(require,module,exports){
var
  w = require('./request-animation-frame-polyfill')(window),
  matrixFactory = require('./matrix'),
  vectorFactory = require('./vector3d'),
  descriptorFactory = require('./modeldescription'),
  modelReaderFactory = require('./modelreader'),
  modelFactory = require('./model3d'),

  canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),

  baseImageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height),
  imageData = baseImageData,
  blackScreen = [],

  angleX = Math.PI/128,
  angleY = Math.PI/512,
  angleZ = Math.PI/256,

  x = matrixFactory.create3x3(
    [[1,0,0],
  	[0, Math.cos(angleX),-Math.sin(angleX)],
  	[0, Math.sin(angleX),Math.cos(angleX),0]]),
  y = matrixFactory.create3x3(
    [[Math.cos(angleY),0,Math.sin(angleY)],
  	[0,1,0],
  	[-Math.sin(angleY),0,Math.cos(angleY)]]),
  z = matrixFactory.create3x3(
    [[Math.cos(angleZ),-Math.sin(angleZ),0],
  	[Math.sin(angleZ),Math.cos(angleZ),0],
  	[0,0,1]]),

  rotationMatrix = x.multiply(y).multiply(z),

  x2 = matrixFactory.create3x3(
    [[1,0,0],
    [0, Math.cos(-angleX),-Math.sin(-angleX)],
    [0, Math.sin(-angleX),Math.cos(-angleX),0]]),
  y2 = matrixFactory.create3x3(
    [[Math.cos(-angleY),0,Math.sin(-angleY)],
    [0,1,0],
    [-Math.sin(-angleY),0,Math.cos(-angleY)]]),
  z2 = matrixFactory.create3x3(
    [[Math.cos(-angleZ),-Math.sin(-angleZ),0],
    [Math.sin(-angleZ),Math.cos(-angleZ),0],
    [0,0,1]]),

  rotationMatrix2 = x2.multiply(y2).multiply(z2),

  transforms = [rotationMatrix, rotationMatrix2],
	// sina = 1, cosa=0, sinb = Math.sin(Math.PI/67), cosb=Math.cos(Math.PI/67);
	// sinc = 1, cosc=0, sind = Math.sin(Math.PI/41), cosd=Math.cos(Math.PI/41);
	// sine = 1, cose=0, sinf = Math.sin(Math.PI/7), cosf=Math.cos(Math.PI/7),
	
	color = [0,0,0, 255],
	objPos = vectorFactory.create(new Float64Array([400,400,600])),
	viewPos = vectorFactory.create(new Float64Array([imageData.width/2, imageData.height/2, -1024])),

  model,
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
  		reader = modelReaderFactory.create(objPos);
      reader.readFile(file, function(models){
  			if (models && models.length > 0) {
  				draw(models);
  			};
  		});
  		break;
  	}
}


	function draw(models) {
		var width = imageData.width,
			height = imageData.height;
		requestAnimationFrame(function(){draw(models);});
		context.clearRect(0, 0, width, height);
		imageData = context.getImageData(0, 0, width, height);
    models.forEach((m, i) => {
        m.draw(color, viewPos, imageData);
        m.transform(transforms[i]);
    });
		
		context.putImageData(imageData, 0, 0);
	}

},{"./matrix":2,"./model3d":3,"./modeldescription":4,"./modelreader":5,"./request-animation-frame-polyfill":7,"./vector3d":8}],7:[function(require,module,exports){
module.exports = function (ns) {
    var lastTime = 0,
    	vendors = ['ms', 'moz', 'webkit', 'o'],
    	x;

    ns = ns || {};
    for (x = 0; x < vendors.length && !ns.requestAnimationFrame; ++x) {
        ns.requestAnimationFrame = ns[vendors[x]+'RequestAnimationFrame'];
        ns.cancelRequestAnimationFrame = ns[vendors[x]+
          'CancelRequestAnimationFrame'];
    }

    if (!ns.requestAnimationFrame)
        ns.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = ns.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!ns.cancelAnimationFrame)
        ns.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    return ns;
};

},{}],8:[function(require,module,exports){
module.exports = (function(){
	var vector3DPrototype = {
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
			this.magnitude = this.calcMagnitude();

			return this;
		},

		scale: function(scalar){
			this.components[0] = this.components[0]*scalar;
			this.components[1] = this.components[1]*scalar;
			this.components[2] = this.components[2]*scalar;
			this.magnitude = this.calcMagnitude();

			return this;
		},

		calcMagnitude: function(){
			return Math.sqrt((this.components[0] * this.components[0]) + (this.components[1] * this.components[1]) + (this.components[2] * this.components[2]));
		},
		toString: function(){
			return 'x: {x}, y: {y}, z: {z} - Magnitude: {magnitude}'
				.replace(/\{x\}/, this.components[0])
				.replace(/\{y\}/, this.components[1])
				.replace(/\{z\}/, this.components[2])
				.replace(/\{magnitude\}/, this.magnitude);
		}
	},
	createVector3D = function(components) {
		components = components || new Float64Array(3);
		components[0] = components[0] || Math.random()*2-1;
		components[1] = components[1] || Math.random()*2-1;
		components[2] = components[2] || Math.random()*2-1;

		var vector = Object.create(vector3DPrototype, {
			components: {
          enumerable: true,
          writable: true,
          value: components
        }
      });

		vector.magnitude = vector.calcMagnitude();
		return vector;
	};

	return {
		create: createVector3D,
		prototype: vector3DPrototype
	};
})();

},{}]},{},[6]);
