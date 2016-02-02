"use strict";
var
  w = require('./request-animation-frame-polyfill')(window),
  matrixFactory = require('./matrix'),
  vectorFactory = require('./vector-3d'),
  descriptorFactory = require('./model-description'),
  modelReaderFactory = require('./model-reader'),
  modelFactory = require('./model-3d'),
  filePickerFactory = require('./file-picker'),
  fileReader = require('./file-reader'),

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
	pickerElementId = "fileselector",
  filePicker = filePickerFactory.create(pickerElementId, (file) => {
    fileReader(file, loadModels);
}, ['obj']);

function loadModels(modelData){
  var reader = modelReaderFactory.create();
  reader.readObjData(modelData, function(models){
    if (models && models.length > 0) {
      draw(models);
    };
  })
}

function draw(models) {
  requestAnimationFrame(function(){draw(models);});

	var width = imageData.width,
      height = imageData.height;
	
  context.clearRect(0, 0, width, height);
	imageData = context.getImageData(0, 0, width, height);
  
  models.forEach((m, i) => {
      m.draw(color, objPos, viewPos, imageData);
      m.transform(transforms[i]);
  });
	
	context.putImageData(imageData, 0, 0);
}
