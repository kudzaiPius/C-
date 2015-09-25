/*
* 	@author Jason Bredberg, Kudzai Pius Whande
*	methods to handle pyramid generation and population
*/


function rgbToHex(r, g, b)
{ //converts rgb data to hexidecimal
	if(r > 255 || g > 255 || b > 255)
		throw "Invalid color component";
	return "#" + ((r << 16) | (g << 8) | b).toString(16);
}



/*
 * @param array is the randomly generated points array, assume length N
 * @param N the number of sites/sections
 * This method creates pyramids at every point in the array and initializes them with random colours
*/			
function populatePyramids(array, N)
{ //create pyramids using the add pyramid method and information from the site generation
	for(var i = 0;i<N;i++)
	{ //assuming y points are currently positive and camera requires negative y co-ordinates
		addPyramid(rgbToHex(array.p_colors[i][0], array.p_colors[i][1], array.p_colors[i][2]), scene, array.points[i][0], -array.points[i][1], -500);
	}
};



function getPixel(imagedata, x, y) 
{ //obtain pixel information (rgba) from imagedata
	var position = (x + imagedata.width * y) * 4, data = imagedata.data;
	return {r: data[ position ], g: data[ position + 1 ], b: data[ position + 2 ], a: data[ position + 3 ]};
}



function readBack(renderer, w, h)
{ //readback of pixel data from framebuffer - currently not operating correctly *****
	var pixels = new Uint8Array(w * h * 4);
	renderer.gl.readPixels(x, y, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
	
	return pixels;
}


function addPyramid(pyrColor, myScene, posX, posY, posZ)
{ //place individual pyramid method
	var pyrGeom = new THREE.CylinderGeometry(0, 200, 200, 4, false); //(size of pyramid peak, size of pyramid base, length of pyramid, radius segments : 4 in this case, false)
	var pyrMat = new THREE.MeshBasicMaterial({/*wireframe: true, */color: pyrColor});
	var pyr = new THREE.Mesh(pyrGeom, pyrMat);
	
	// if the positions are given
	if( typeof posX !== "undefined" && typeof posY !== "undefined" && typeof posZ !== "undefined")
	{
		pyr.position.set(posX, posY, posZ);
	}
	// else use default
	
	// rotate the pyramid so that it's perpendicular to the image
	pyr.rotation.x += Math.PI*0.5;
	
	// add the pyramid to the scene at the given position
	myScene.add(pyr);
}


function generateSites(x_range, y_range, N)
{
	/*var */this.pixel_data; // assign the current voronoi data to this variable
	/*var */this.site_width = 10; // TEST DATA, TO BE REMODELLED
	/*var */this.site_length = 10; // TEST DATA, TO BE REMODELLED
	
	/* @attr points contains the points of the voronoi diagram */
	/*var */this.points = new function()
	{
		var tmp_arr = Array(0);
		do
		{
			/* Add random point to the array
			 * OPTIMIZATION : Can optimise by doing unique check before adding(vs add, 
			 * check unique, and if not, remove
			*/
			tmp_arr.push([Math.floor(_.random(x_range)), Math.floor(_.random(y_range))]);
			
			// remove duplicates
			tmp_arr = _.uniq(tmp_arr);
		}
		while(tmp_arr.length != N)
		return tmp_arr;
	};
	
	/* @attr p_colors contains the colors for voronoi segments(UNIQUE) */
	/*var */this.p_colors = new function()
	{
		var tmp_arr = Array(0);
		
		/* Add random color to the array
			 * OPTIMIZATION : Can optimise by doing unique check before adding(vs add, 
			 * check unique, and if not, remove
		*/
		do
		{
			// create rgba data randomly : alpha value is between 0.0 and 1.0, so fix to 1 decimal place OR USE CLAMPED ALPHA
			tmp_arr.push([ Math.floor(_.random(255)), Math.floor(_.random(255)), 
				Math.floor(_.random(255)), /*Math.random().toFixed(1)*/1.0 ]);
			
			// remove duplicates
			tmp_arr = _.uniq(tmp_arr);
		}
		while(tmp_arr.length != N)
		
		return tmp_arr;
	};
}