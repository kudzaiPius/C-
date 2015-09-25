/**
 * Canny Edge Detection Implementation
 * Broken down into 5 methods, each handling a step of the algorithm
 */
 
 /*
 * Copy Image data from a canvas, given context, a width and height
 * Assumes image starts at point(0,0)
*/
function copyImageData(imgCtx, w, h)
{
	var imgData = imgCtx.getImagedata(0,0,w,h);
	return imgData;
}

/*
 * @param imgData array of rgba data
 * Apply gaussian filter to smooth the image. 
 * Remove noise that may result in faulty egdge detection.
 * Step 1 of the algorithm.
*/
function sobelFilter(imgData)
{
	
}

/*
 * Object that iterates over pixels and rgba values
*/
function ImgIterator(imgData, w, h)
{
	var data = imgData;
	var width = w;
	var height = h;
	var elements = 4*width*height;
}

/*
 * @param row the pixel row.
 * @param col the pixel colomn.
 * return a 4-element array containing rgba values of given pixel.
 * Assume rows and columns referenced beginning at 1.
 *
*/
/*var pixel = */function pixel(row, column, w, data)
{
	// 4 * (((row-1) * total_columns) + (colomn-1))
	var pxIndex = 4*(((row-1)*w) + (column-1));
	return [ data[pxIndex++], data[pxIndex++], data[pxIndex++], data[pxIndex++] ];
};

/*
 * @param row the pixel row.
 * @param col the pixel colomn.
 * @param index the wanted value(r,g,b or a)
 * Assume rows, columns and indices referenced beginning at 1.
 *
var rgbaValue = function(row, column, index)
{
	return (pixel(row, column))[index-1];
}/**/

/*
 * @param rgba an array of pixel values
 * convert a coloured pixel to greyscale pixel
*/
function greyScalePixel(rgba)
{
	return (rgba[0] + rgba[1] + rgba[2])/3;
}

/*
 * Convert color image array to greyscale array
*/
function greyScaleImage(imgData, w, h)
{
	var data = imgData.data;
	var width = Math.round(w);
	var height = Math.round(h);
	
	var return_arr = new Array(width*height);
	//iter = new ImgIterator(data, w, h)
	
	var cur_i = 0;
	for( var i = 0; i < h ; ++i) // rows
	{
		for( var j = 0; j < w; ++j) // columns
		{
			var p = /*iter.*/pixel(i,j,w,data);
			var ave_p = greyScalePixel(p);
			
			data[cur_i] = ave_p;
			data[cur_i+1] = ave_p;
			data[cur_i+2] = ave_p;
			// keep the alpha value
			
			// adjust the index
			cur_i += 4;
		}
	}
	return return_arr;
}