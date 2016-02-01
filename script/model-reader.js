"use strict";
module.exports = (function(){
  var modelFactory = require('./model-3d'),
    descriptorFactory = require('./model-description'),
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
            vertexindex = vertexindex < 0 
              ? this.modeldescriptors[this.modeldescriptors.length - 1].vertices.length + vertexindex
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

      readObjData: function(contents, callback){
        var modelReader = this,
            lineHandlers = modelReader.lineHandlers,
            modeldescriptors = modelReader.modeldescriptors,
            models = modelReader.models,
            objPos = modelReader.objPos;

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
            var model = modelFactory.create(vertexdata, faces, vcount, descriptor.name);
            models.push(model);
          });

        if(callback && typeof callback === 'function'){
          callback(models);
        }
      }
},

createModelReader = function(){
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
    }
  });
}

return {
  create: createModelReader
}
})();
