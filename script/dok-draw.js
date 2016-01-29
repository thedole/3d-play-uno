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

return function(coordinates, imageData, color){
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
