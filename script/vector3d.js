"use strict";
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
