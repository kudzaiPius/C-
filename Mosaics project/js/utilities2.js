/*
 * @author Kudzai Pius Whande
 * Utilities second class for centroidal voronoi diagram progression
*/

/*
 * @param infile The input file string
 * @param outfile The output file string
 * @param side_length The side lengths for the image(width and height)
 * @param tile_num the number of tiles used to represent a mosaic
 * @param auto_edge boolean representing edge detection method]
 * @return context of current drawn image
 * assumptions : SQUARE NUMBER OF TILES
 * NOT YET TESTED INDIVIDUALLY, SANDBOXED IN mosaic.html
*/
function genMosaic(infile, outfile, side_length, tile_num, auto_edge)
{
	// 1 : CREATE CANVAS TO DRAW THE INPUT IMAGE
	var in_canvas = myCanvas;//document.createElement('canvas');
	in_canvas.width  = side_length;
	in_canvas.height = side_length;
	
	var in_ctx = in_canvas.getContext('2d');
	
	var w = side_length;
	var h = side_length;
	
	// 2 : CREATE THE INPUT IMAGE
	var image = open_sq(infile, side_length);
	
	// 3: DRAW IT ON THE CANVAS TO GET ACCESS TO THE PIXELS
	ctx.drawImage(image, 0, 0);
	var imageData = ctx.getImageData(0, 0, w, h);
	
	console.log("image data :");
	//console.log(edge_data);
				
	var img2d = imageData2d(imageData.data, w, h);
	
	// 4 : EXTRACT EDGE DATA FROM IMAGE
	var edge_data;
	
	if(auto_edge == true)
	{
		// calculate edges using the sobel filter
		var imgSobel = Sobel(imageData);
		edge_data = imageData2d( imgSobel.data, w, h );
	}
	else
	{
		// calculate eges by selecting egdes that match pre-determined color
		/************************* NEED THE COLOR AND DRAWN_EDGES VARIABLES TO BE IN FILE ************/
		edge_data = imageData2d( selective_edging(edge_color, imageData), w, h );
	}
	
	console.log("edge data :");
	console.log(edge_data);
	
	// 5 : USE EDGE DATA TO COMPUTE DIRECTION FIELD
	var img_rot = bvh2(edge_data);
	
	// 6 : set up background with tile grout color
	
	// clear the canvas before drawing tiles
	in_ctx.clearRect(0, 0, w, h);
	
	/*********************************** NEED THE GROUT ******************************/
	in_ctx.fillStyle = grout;
	//in_ctx.fillRect(0,0,w,h);
	
	// 7 : SET THE VARIABLES FOR TILE SIZE, TILE NUMBERS AND MOSAIC PARTICULARS
	//var tile_num = tile_num; // 50 x 50
	var tile_across = Math.abs( Math.sqrt(tile_num) );
	
	var abs_tile_w = Math.round(w/tile_across);
	var abs_tile_h = Math.round(h/tile_across);
	
	var tile_w = Math.round( (w/tile_across) * 0.80 );
	var tile_w_adj = ( (w/tile_across) - tile_w );
	
	var tile_h = Math.round( (h/tile_across) * 0.80);
	var tile_h_adj = ( (h/tile_across) - tile_h );
	
	// 8 : LOOP THROUGH THE TILE POSITIONS, PLACING TILES WITH THE RIGHT ORIENTATION AND CENTER COLOR
	
	for(var i=0; i<tile_across; i++)
	{
		for(var j=0; j<tile_across; j++)
		{
			in_ctx.save();
			
			var pxData = img2d[ (abs_tile_h * i) + Math./*ceil*/floor(abs_tile_h/2) ][ (abs_tile_w * j) + Math./*ceil*/floor(abs_tile_w/2) ];
			//[ (tile_h * i) + Math.round(tile_h/2) ][ (tile_w*j) + Math.round(tile_w/2) ];
			//if(pxData
			
			// get the right color
			ctx.fillStyle = rgbToHex(pxData[0],pxData[1],pxData[2]);
			
			// move origin to tile centre
			ctx.translate( ((abs_tile_w * j) + Math.round(abs_tile_w/2)) , ((abs_tile_h * i) + Math.round(abs_tile_h/2)) );
			//((tile_w*j) + Math.round(tile_w/2)) , ((tile_h*i) + Math.round(tile_h/2)) );
			
			if( (img_rot[i][j]) == NaN )
			{
				in_ctx.rotate(Math.PI/4);
			}
			else
			{
				in_ctx.rotate( (img_rot[i][j]) );
			}				
			
			// fill rectangle with the given color and orientation
			in_ctx.fillRect( /*((tile_w*j)+tile_w_adj), ((tile_h*i)+tile_h_adj)*/-abs_tile_w/2, -abs_tile_h/2, tile_w, tile_h);
			
			// reset rotation
			in_ctx.restore();
		}
	}
	//document.
	//return in_ctx;
	//return in_canvas;
}

/*
 * Create a square image and return it.
 * Assign the alt-name as filename less the extension.
*/
function open_sq(filename, s)
{
	var img = new Image();
	img.src = filename;
	img.width = s;
	img.height = s;
	img.alt = (filename.split("."))[0];
	
	return img;
}

/*
 * @param edge_color the color that represents user drawn edges
 * @param imgData 
 * @return pixel data for the image
 * Used in conjuction with user drawn edges
 * NEEDS A VARIABLE WITHIN RUNNING FILE : edge_color
*/
function selective_edging(edge_color, imgData)
{
	for(var i=0; i<imgData.data.length; )//(var dat in imgData)
	{
		if ( edge_color[0] == imgData.data[i] && edge_color[1] == imgData.data[i+1]
			&& edge_color[2] == imgData.data[i+2] )
		{
			// set pixel to an edge pixel (white)
			imgData.data[i] = 255;
			imgData.data[i+1] = 255;
			imgData.data[i+2] = 255;
			imgData.data[i+3] = 255;
		}
		else
		{
			// set pixel to non-edge pixel (black)
			imgData.data[i] = 0;
			imgData.data[i+1] = 0;
			imgData.data[i+2] = 0;
			imgData.data[i+3] = 255;
		}
		i+=4;
	}
	
	return imgData;
}