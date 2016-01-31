"use strict";
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
