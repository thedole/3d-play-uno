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
    models.forEach((m) => {
        m.draw(color, viewPos, imageData);
        m.transform(rotationMatrix);
    });
		
		context.putImageData(imageData, 0, 0);
	}
