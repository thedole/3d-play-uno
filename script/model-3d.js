"use strict";
module.exports = (function(){
var
	dokdraw = require('./dok-draw'),
	model3DPrototype = {
	draw: function(color, pos, viewPos, imageData){
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
			this.drawFace(face, vertexcount, color, pos, viewPos, imageData);
		} while(faceStartIndex < faceslength);
		vertices = null;
		faceslength = null;
	},

	drawFace: function(face, count, color, pos, viewPos, imageData){
		var offset = pos.components,
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
		vertex,
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
		var result = new Float64Array([0,0,0]),
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
