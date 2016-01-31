"use strict";
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
